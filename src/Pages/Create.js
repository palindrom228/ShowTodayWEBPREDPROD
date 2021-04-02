import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import City from '../features/City';
import '../assets/input.css'
import logo from '../assets/logo.svg';
import toggle from '../features/toggle'
const CreateCity = () => {
    const {addnote} = toggle()
    const history = useHistory()
    const {request} = useHttp()
    const [data, setData] = useState({
        email: '',
        password: '',
        type: 2,
        city: '',
        name: ''
    })
    const handlechange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const login = async() => { 
        try {
            const res = await request('api/auth/createcity','POST', data)
            addnote(res.message)
        
        } catch (e) {
            console.log(e)
        } 
    }
    const handler = (e) => {
        setData({...data, city: e})
    }
    return(
        <div className='container'>
            <div className="form">
                <h1>Форма добавления аккаунта города</h1>
                <div className="input_block">
                    <input type="text" className='input_form' onChange={handlechange} value={data.email} placeholder=' ' id='email' name='email' />
                    <label htmlFor='email'>Логин</label>
                </div>
                <div className="input_block">
                    <input type="password" className='input_form' onChange={handlechange} value={data.password} placeholder=' ' id='password' name='password' />
                    <label htmlFor='password'>Пароль</label>
                </div>
                <div className="input_block">
                    <input type="text" className='input_form' onChange={handlechange} value={data.name} placeholder=' ' id='name' name='name' />
                    <label htmlFor='name'>Имя</label>
                </div>
                <City handler={handler}></City>
                    <input  type="button" className='input_button' name='button' onClick={login} value='Создать' />
            </div>
        </div>
    )
}
export default CreateCity