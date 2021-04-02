import { connect, useDispatch } from "react-redux"
import React, {useState, useEffect} from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Checkbox, DialogActions, Button } from "@material-ui/core"
import { closeAddGame, setDataAddGame, resetAddGame } from "../redux/actions"
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import {useHttp} from '../hooks/http.hook'
import PhoneMask from "../features/PhoneMask"
import Addres from "../features/Addres"


const AddGame = ({ open, data, token,city,selectedDay }) => {
    const [localeData, setLocaleData] = useState({
        date: moment(selectedDay),
        time: moment(),
        duration: String(data.duration),
        clientId: '',
        clientName: '',
        clientPhone: '',
        wasBefore: false
    })
    const {request, loading} = useHttp()
    const [suggestion, setSuggestion] = useState([])
    const handleChange = (e) => {
        setLocaleData({...localeData, [e.target.name]: e.target.value})
    }
    useEffect(()=>{
        let getTimeArray = moment(localeData.time).format('HH:mm:ss').split(':')
        let TimeMilli = (getTimeArray[0] * 3600000) + (getTimeArray[1] * 60000)
        let e = {
            name: 'date',
            value: moment(localeData.date).valueOf() + TimeMilli
        }
        dispatch(setDataAddGame(e))
    },[localeData.date,localeData.time])
    useEffect(()=>{
        setLocaleData({...localeData, date: moment(selectedDay)})
    }, [selectedDay])
    const selectClient = (e) => {
        setLocaleData({...localeData,
            clientId: e._id,
            clientName: e.name,
            clientPhone: e.phone,
        })
        let data = {
            name: 'client',
            value: e._id
        }
        dispatch(setDataAddGame(data))
        setSuggestion([])
    }
    const searchClient = async(number) => {
        if(number.length > 4)
        {try {
                const req = await request('api/games/getclient', 'POST', {phone: number}, {
                    Authorization: `Bearer ${token}`
                })
                setSuggestion(req)
        } catch (error) {
            
        }}
    }
    const createClient = async(data) => {
        try {
            const req = await request('api/games/createclient','POST', data, {
                Authorization: `Bearer ${token}`
            })
            selectClient(req)
            return true
        } catch (error) {
            return false
        }
    }
    const dispatch = useDispatch()
    const handleClose = () => { dispatch(closeAddGame()) }
    const changeMainState = (e) => {
        dispatch(setDataAddGame(e.target))
    }
    const [reset, setReset] = useState(false)
    useEffect(()=>{
        if(reset===true){
            setLocaleData({
                date: moment(),
                time: moment(),
                duration: String(data.duration),
                clientId: '',
                clientName: '',
                clientPhone: '',
                wasBefore: false
            })
            setSuggestion([])
            dispatch(resetAddGame())
            setReset(false)
        }
    }, [reset])
    const sendData = async() => {
        try {
                const res = await request('api/games/creategame', 'POST', {...data, age: 1}, {
                    Authorization: `Bearer ${token}`
                })
                console.log(res)
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Создание игры</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите данные игры:
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        style={{marginRight: 10}}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Дата проведения игры"
                        format='DD/MM/YYYY'
                        value={moment(localeData.date,'DD/MM/YYYY')}
                        onChange={(date)=>{let e={target:{name: 'date', value: date}}; handleChange(e)}}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Выберите время"
                            value={localeData.time}
                            onChange={(date) => { let e = { target: { name: 'time', value: date } }; handleChange(e) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Продолжительность</FormLabel>
                        <RadioGroup row={true} aria-label="gender" name="duration" value={localeData.duration} onChange={(e)=>{handleChange(e); dispatch(setDataAddGame(e.target))}}>
                            <FormControlLabel value={'1'} control={<Radio></Radio>} label='1 час'/>
                            <FormControlLabel value={'1.5'} control={<Radio></Radio>} label='1.5 часа'/>
                            <FormControlLabel value={'2'} control={<Radio></Radio>} label='2 часа'/>
                        </RadioGroup>
                    </FormControl>
                    <PhoneMask reset={reset} suggestion={suggestion} searchClient={searchClient} createClient={createClient} selectClient={selectClient} disabled={localeData.clientId.length > 0}></PhoneMask>
                    <div style={{paddingTop: 10, paddingBottom: 10}}>
                        <TextField onChange={changeMainState}  style={{marginRight: 10}} type='Number' name="col" inputProps={{ step: 1, min: 6 }} label="Количество" variant="outlined" />
                        <TextField onChange={changeMainState}  style={{marginRight: 10}} type='Number' name="summ" inputProps={{ step: 100, min: 0 }} label="Сумма" variant="outlined" />
                        <TextField onChange={changeMainState}  style={{marginRight: 10, marginTop: 10}} type='Number' name="prepay" inputProps={{ step: 100, min: 0 }} label="Предоплата" variant="outlined" />
                    </div>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                  checked={data.type}
                                  onChange={(e) =>{data={target:{name: 'type', value: e.target.checked}}; changeMainState(data)}}
                                  name="type"
                                  color="primary"
                                />
                              }
                              label="Выезд"
                        />
                    </FormControl>
                    {data.type?<Addres prem={city} reset={reset} onSelect={changeMainState}></Addres>:''}
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                  checked={localeData.wasBefore}
                                  onChange={()=>{setLocaleData({...localeData, wasBefore: !localeData.wasBefore}); let data = {target: {name: 'evening', value: 0}}; changeMainState(data)}}
                                  name="type"
                                  color="primary"
                                />
                              }
                              label="Были до этого?"
                        />
                        {localeData.wasBefore?<TextField onChange={changeMainState} type='Number' name='evening' value={data.evening} inputProps={{ step: 1 }} label="Сколько раз" variant="outlined"/>:''}
                    </FormControl>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                  checked={data.child}
                                  onChange={(e) =>{data={target:{name: 'child', value: e.target.checked}}; changeMainState(data)}}
                                  name="child"
                                  color="primary"
                                />
                              }
                              label="Дети"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setReset(true)} color="primary">
            Сбросить
          </Button>
                <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
          <Button onClick={sendData} color="primary">
            Создать
          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        selectedDay: state.calendar.selectedDay,
        open: state.addGame.open,
        data: state.addGame.data,
        token: state.auth.token,
        city: state.auth.city
    }
}
export default connect(mapStateToProps, null)(AddGame)