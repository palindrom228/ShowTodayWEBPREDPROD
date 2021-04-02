import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useEffect, useState} from 'react';
const Input = ({value,onChange,label,stateValue,name}) => {   
    const [intoValue,setIntoValue] = useState(false)
    useEffect(()=>{
        setIntoValue(stateValue===value?true:false)
    },[stateValue])
    return(
        <div className='radio_block'>
                <div className={intoValue?'radio checkRadioShownRadio':'radio'} onClick={()=>{let e = {value,name};onChange(e)}}>
                    <FontAwesomeIcon icon={faCheck} className={intoValue?'checkRadio checkRadioShown':'checkRadio'}></FontAwesomeIcon>
                </div>
                <p>{label}</p>
            </div>
    )
}
export default Input