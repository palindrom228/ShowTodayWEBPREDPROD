import { NavLink, Redirect, Route, Switch } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faBriefcase,  faHome, faUserCircle, faUserSecret } from "@fortawesome/free-solid-svg-icons"
import logo from './assets/logo.png';
import { connect, useDispatch } from "react-redux";
import { resetAddGame, toggleNav } from "./redux/actions";
import CalendarPage from "./Pages/CalendarPage";
import AddGame from "./Pages/AddGame";

const MainRouter = ({state,navigation,addGame}) => {
    const dispatch = useDispatch()
    return(
        <div className='content'>
            <div className='header'>
                <div className='leftSide'>
                    <div className='iconBox bar'><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></div>
                    <div className='iconBox logo'><img src={logo} alt="" /></div>
                    <div className='nameTag'><h1>{state.city}</h1></div>
                </div>
                <div className="rightSide">
                    <div className="iconBox bell"><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></div>
                    <div className="iconBox user"><FontAwesomeIcon icon={faUserCircle} /></div>
                </div>
            </div>
            <div className={navigation.isClosed?"navigation":"navigation closed"}>
                <div className="navigationHead">
                    <div className='iconBox bar' onClick={()=>dispatch(toggleNav())}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></div>
                </div>
                <div className="navigationBody">
                    <ul>
                        <NavLink activeClassName='selected' to="/calendarPage"><li className='navItem'><div className="iconBox"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></div> <p>Главная</p></li></NavLink>
                        <NavLink activeClassName='selected' to="/leadsPage"><li className='navItem'><div className="iconBox"><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon></div><p>Лиды</p></li></NavLink>
                        <NavLink activeClassName='selected' to="/workersPage"><li className='navItem'><div className="iconBox"><FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon></div><p>Работники</p></li></NavLink>
                        <NavLink activeClassName='selected' to="/DealsPage"><li className='navItem'><div className="iconBox"><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon></div><p>Дела</p></li></NavLink>
                    </ul>
                </div>
            </div>
            <div className={navigation.isClosed?'cover on':'cover'} onClick={()=>dispatch(toggleNav())}></div>
            <div className="contentBody">
                <Switch>
                    <Route path='/calendarPage'>
                        <CalendarPage></CalendarPage>
                    </Route>
                    <Route path='/leadsPage'>
                        <div>Лиды</div>
                    </Route>
                    <Route path='/workersPage'>
                        <div>Работники</div>
                    </Route>
                    <Route path='/DealsPage'>
                        <div>Дела</div>
                    </Route>
                    <Redirect to='/calendarPage'></Redirect>
                </Switch>
            </div>
            <AddGame></AddGame>
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        state: state.auth,
        navigation: state.navigation,
        addGame: state.addGame
    }
}
export default connect(mapStateToProps,null)(MainRouter)