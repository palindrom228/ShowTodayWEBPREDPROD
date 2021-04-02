import React, { useState, useEffect } from "react"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogContentText, DialogTitle, DialogContent } from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import moment from 'moment'

const PhoneMask = ({ suggestion, searchClient, createClient, disabled, selectClient, reset }) => {
    const [data, setData] = useState({
        realValue: '',
        maskedValue: '',
        initValue: '+7(___)-___-____',
        count: 3,
        name: ''
    })
    useEffect(() => {
        if (reset === true) {
            setData({
                realValue: '',
                maskedValue: '',
                initValue: '+7(___)-___-____',
                count: 3,
                name: ''
            })
        }
    }, [reset])
    const handlechange = (e) => {
        if (e === null) {
            return 0
        }
        if (e.type === 'change') {
            if (e.target.value.length < data.maskedValue.length) {
                if (data.count !== 3) {
                    let newVol = ''
                    for (let i = 0; i < data.realValue.length - 1; i++) {
                        newVol = newVol + data.realValue[i]
                    }
                    let newMaskedValue = ''
                    let newCount = data.count - 1
                    const arr = [11, 7, 6]
                    for (let i in arr) {
                        if (newCount === arr[i]) newCount--
                    }
                    for (let i = 0; i < newCount; i++) {
                        if (i == newCount) {
                            newMaskedValue = newMaskedValue + data.initValue[i]
                        } else {
                            newMaskedValue = newMaskedValue + data.maskedValue[i]
                        }
                    }

                    setData(prev => {
                        return ({ ...data, realValue: newVol, maskedValue: newMaskedValue, count: newCount })
                    }
                    )
                    console.log(newVol, '  ', newMaskedValue, '  ', newCount)
                    searchClient('7' + newVol)
                }
                return 0
            }
            if (typeof Number(e.target.value[e.target.value.length - 1]) === 'number' && isFinite(Number(e.target.value[e.target.value.length - 1]))) {
                if (data.count !== 16) {
                    let newVol = data.realValue + e.target.value[e.target.value.length - 1]
                    let newMaskedValue = ''
                    for (let i = 0; i <= data.count; i++) {
                        if (i == data.count) {
                            newMaskedValue = newMaskedValue + e.target.value[e.target.value.length - 1]
                        } else {
                            if (data.initValue[i] !== '_') {
                                newMaskedValue = newMaskedValue + data.initValue[i]
                            } else {
                                newMaskedValue = newMaskedValue + data.maskedValue[i]
                            }

                        }
                    }
                    let newCount = data.count + 1
                    const arr = [6, 7, 11]
                    for (let i in arr) {
                        if (newCount === arr[i]) newCount++
                    }
                    setData({ ...data, realValue: newVol, maskedValue: newMaskedValue, count: newCount }, console.log(data.realValue))
                    searchClient('7' + newVol)
                    console.log(suggestion)
                }
            }
        }
    }
    const handleSelect = (e, newValue) => {
        if (newValue !== null) {
            console.log(newValue)
            if (newValue.hasOwnProperty('newClient')) {
                setOnCreate(true)
            } else {
                let maskedPhone = newValue.phone.slice(1)
                let localeNew = ''
                let i = 0
                for (let key in data.initValue) {
                    if (data.initValue[key] === '_') {
                        localeNew = localeNew + maskedPhone[i]
                        i++
                    } else {
                        localeNew = localeNew + data.initValue[key]
                    }
                }
                selectClient(newValue)
                setData({ ...data, maskedValue: localeNew })
            }
        } else {
            setData({
                realValue: '',
                maskedValue: '',
                initValue: '+7(___)-___-____',
                count: 3,
                name: ''
            })
        }
    }
    const [onCreate, setOnCreate] = useState(false)
    const create = async () => {
        const newClientToServer = {
            phone: '7' + data.realValue,
            clientName: data.name,
            date: moment().valueOf()
        }
        const req = await createClient(newClientToServer)
        if (req) {
            setOnCreate(false)
        } else {
            alert('Что то пошло не так, попробуйте еще раз')
        }
    }
    return (
        <>
            <Autocomplete
                disabled={disabled}
                onInputChange={handlechange}
                id="PhoneMaskedInput"
                inputValue={data.maskedValue}
                options={suggestion}
                onDoubleClick={disabled ? () => {
                    let e = { name: '', _id: '', phone: '' }; selectClient(e); setData({
                        realValue: '',
                        maskedValue: '',
                        initValue: '+7(___)-___-____',
                        count: 3,
                        name: ''
                    })
                } : null}
                getOptionLabel={(option) => {
                    if (!option.hasOwnProperty('newClient')) {
                        let maskedPhone = option.phone.slice(1)
                        let newValue = ''
                        let i = 0
                        for (let key in data.initValue) {
                            if (data.initValue[key] === '_') {
                                newValue = newValue + maskedPhone[i]
                                i++
                            } else {
                                newValue = newValue + data.initValue[key]
                            }
                        }

                        return `${option.name}: ${newValue}`
                    }
                    else return option.phone
                }}
                onChange={handleSelect}
                filterOptions={(options, params) => {
                    options.push({
                        inputValue: params.inputValue,
                        phone: `Создать пользователя: ${params.inputValue}`,
                        newClient: true
                    });
                    return options
                }}
                style={{ width: 'auto' }}
                renderInput={(params) => <TextField {...params} label='Телефон клиента' variant="outlined" />}
            />
            <Dialog open={onCreate} onClose={() => setOnCreate(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Новый Клиент</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите данные:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Имя"
                        type="name"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Телефон"
                        type="phone"
                        value={data.maskedValue}
                        onChange={handlechange}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOnCreate(false)} color="primary">
                        Отменить
          </Button>
                    <Button onClick={create} color="primary">
                        Создать
          </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default PhoneMask