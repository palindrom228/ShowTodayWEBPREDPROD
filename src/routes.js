import React, { useEffect,useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import Auth from './Pages/Auth'
import CreateCity from './Pages/Create'
import { login } from './redux/actions'
import { useHttp } from './hooks/http.hook'
import MainRouter from './mainRouter'

const useRoutes = ({isAuthenticated}) => {
    const dispatch = useDispatch()
    const {request,loading} = useHttp()
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token)reconnect(token)
        else setLoaded(true)
    },[])
    const reconnect = async(token) => {
        try {
            const data = await request('api/auth/reconnect','POST',{},
                {
                    Authorization: `Bearer ${token}`
                }
            )
            dispatch(login(data))
            setLoaded(true)
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
            setLoaded('true')
        }
    }
    if(!loaded){
        return(
            <div></div>
        )
    }
    if(isAuthenticated){
        return(
            <MainRouter></MainRouter>
        )
    }
    
        return(
            <Switch>
                <Route path='/auth' exact>
                    <Auth></Auth>
                </Route>
                <Route path='/Create' exact>
                    <CreateCity/>
                </Route>
                <Redirect to='/auth'/>
            </Switch>
        )
    
}
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps,null)(useRoutes)