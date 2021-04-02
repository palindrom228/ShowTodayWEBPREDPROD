import { connect, useDispatch } from "react-redux"
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import '../assets/selectedDay.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus  } from "@fortawesome/free-solid-svg-icons";
import { addGame, openAddGame } from "../redux/actions";
const SelectedDay = ({selectedDay,games}) => {
    const dispatch = useDispatch()
    const [gamesToRender,setGamesToRender] = useState([])
    const init = () => {
        let newState = []
         games.map((game)=>{
             if(moment(game.date).format('D/M/Y')===moment(selectedDay).format('D/M/Y')){
                 console.log(game)
                 newState.push(game)
             }
         })
         setGamesToRender(newState)
    } 
    useEffect(()=>{
        init()
    },[selectedDay])
    return(
        <React.Fragment>
            <div className='selectedDayHead'>
                <div className='dateInSelectedDay'>
                    {moment(selectedDay).format('dddd D MMM')}
                </div>
                <div className='addGameInSelectedDay' onClick={()=>dispatch(openAddGame())}>
                    <div className='addIconBox'><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></div>
                </div>
            </div>
            {
                gamesToRender.map((game)=>{
                    return (
                        <div key={game._id} className={game.type === 1 ? 'gameInSelectedDay gameInSelectedDayInStudio':'gameInSelectedDay gameInSelectedDayOutDoor'}>
                            <div className='game-leftSide'>
                            <div className='gameCol'>P:23</div>
                            <div className='gameType'>$: 23000 Р</div>
                            </div>
                            <div className='game-rightSide'>
                                <div className='gameTime'>{moment(game.date).format('HH:mm')}</div>
                                <div className={game.prepay!=null? 'StatusGreen':'StatusYellow'}>Предоплата <FontAwesomeIcon icon={faCircle}/></div>
                            </div>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return{
        selectedDay: state.calendar.selectedDay,
        games: state.calendar.games
    }
}
export default connect(mapStateToProps,null)(SelectedDay)