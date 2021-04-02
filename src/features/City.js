import React, { useState } from 'react'
import '../assets/input.css'
const City = ({ handler }) => {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "7f32d051d5c68510e654447ad69ee919e0ae7243";
    const [City, setCity] = useState('')
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: City ,count: 5, from_bound: {value: 'City'}, to_bound: { value: "City" },})
    }
    const [varibales,setVaribales] = useState([])
    const handlechange = (e) => {
        setCity(e.target.value)
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
        if(e.target.value.length < City.length){
            setCity('')
            handler('')
        }
    }
    const select = (e) => {
        setCity(e.currentTarget.getAttribute('name'))
        handler(e.currentTarget.getAttribute('name'))
        setVaribales([])
    }
    return (
        <div className='auto_complete_box'>
        <div className="input_block" >
            <input type="text" autoComplete='off' className='input_form' value={City} onChange={handlechange} placeholder=' ' id='City' name='City' />
            <label htmlFor='City'>Город</label>
        </div>
        <div className='autocomplete-dropdown-container' >
            <ul>
            {
               Array.isArray(varibales) ? varibales.map((City)=>{
                    return<li className='auto_complete_item' key={City.unrestricted_value} name={City.data.city} onClick={select}>{City.value}</li>
                }): ''
            }
            </ul>
        </div>
        </div>
    )

}
export default City