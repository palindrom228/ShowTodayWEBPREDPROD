
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHttp } from "../hooks/http.hook"
import {login} from '../redux/actions';
const Auth = () => {
    const {request,loading} = useHttp()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handlechange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const authentication = async() => {
        try {
                const res = await request('api/auth/login','POST', data)
                console.log(res)
                dispatch(login(res))
        } catch (e) {
            console.log(e)
        }
    }
    return(
        <div className='authBox'>
            <div className="authForm">
                <h1>Show Today App</h1>
                <p>Вход</p>
            <div className="input_block">
                    <input type="text" className='input_form' onChange={handlechange} value={data.email} placeholder=' ' id='email' name='email' />
                    <label htmlFor='email'>Логин</label>
                </div>
                <div className="input_block">
                    <input type="text" className='input_form' onChange={handlechange} value={data.password} placeholder=' ' id='password' name='password' />
                    <label htmlFor='password'>Пароль</label>
                </div>
                <input  type="button" className='input_button' name='button' onClick={authentication} value='Войти' disabled={loading?'disabled':''}/>
            </div>
        </div>
    )
}
export default Auth