import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField} from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import '../assets/input.css'
const Addres = ({prem, onSelect,reset }) => {
    useEffect(()=>{
        if(reset===true){
            setAddres('')
            setVaribales('')
        }
    },[reset])
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "7f32d051d5c68510e654447ad69ee919e0ae7243";
    const [addres, setAddres] = useState('')
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: addres ,count: 5, locations: [{'city': prem}], from_bound: { "value": "street" }, to_bound: {'value': "house"}})
    }
    const [varibales,setVaribales] = useState([])
    const handlechange = (e) => {
        if(e == null) {
            return 0
        }
        if(e.target.value ==null) {
            setAddres('')
            setVaribales([])
            return 0
        }
        setAddres(e.target.value)
        if(e.target.value.length < 3){
            setVaribales([])
        }
        if(e.target.value.length > 2){
        fetch(url, options)
            .then(response => response.text())
            .then(result => setVaribales(()=>{
                console.log(JSON.parse(result))
                var sug = JSON.parse(result).suggestions
                setVaribales(sug)
            }
            ))
            .catch(error => console.log("error", error));
        }
    }
    const handleSelect = (e, newValue) => {
        console.log(e,newValue)
        if(e.target.value ==null) {
            setAddres('')
            setVaribales([])
            let data = {
                target: {
                    name: 'address',
                    value: ''
                }
            }
            onSelect(data)
            return 0
        }
        if(newValue.hasOwnProperty('unstrictAddres')){
            let data = {
                target: {
                    name: 'address',
                    value: newValue.data.value
                }
            }
            onSelect(data)
            setAddres(newValue.data.value)
            return 0
        }
        let data = {
            target: {
                name: 'address',
                value: newValue.data.street +' '+ (newValue.data.house!=null?newValue.data.house:'')
            }
        }
        onSelect(data)
        setAddres(newValue.data.street +' '+ (newValue.data.house!=null?newValue.data.house:''))
    }
    return (
        <Autocomplete
                onInputChange={handlechange}
                id="AddresAutoComplete"
                inputValue={addres}
                options={varibales}
                getOptionLabel={(option)=>option.data.street +' '+ (option.data.house!=null?option.data.house:'')}
                filterOptions={(options, params) => {
                    options.push({
                        value: params,
                        data: {
                            street: `Ручной ввод: ${addres}`,
                            value: addres
                        },
                        unstrictAddres: true
                    });
                    return options
                }}
                onChange={handleSelect}
                style={{ width: 'auto' }}
                renderInput={(params) => <TextField {...params} label='Адрес' variant="outlined" />}
        />

    )

}
export default Addres