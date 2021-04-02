import {useState, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import {toggle} from '../features/toggle'
import { logout } from '../redux/actions'

export const useHttp = () => {
    const dispatch = useDispatch()
    const {addnote} = toggle()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try{
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
           const response = await fetch(url, {method, body, headers})
           const data = await response.json()

           if(!response.ok){
               throw new Error(data.message || 'Что-то пошло не так')
           }

           setLoading(false)
           return data
        } catch(e){
            if(e.hasOwnProperty('auth')){
                if(e.auth === false){
                    dispatch(logout())
                }
            }
            console.log(e.message)
            setLoading(false)
            addnote(e.message)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])
    return{loading, request, error, clearError}
}