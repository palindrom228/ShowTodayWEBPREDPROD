import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useEffect, useState} from 'react';
const InputCheckBox = ({value,onChange,label,name}) => {   
    const [intoValue,setIntoValue] = useState(value)
    const handleChange = () => {
        let e = {value: !intoValue,name}
        setIntoValue(!intoValue)
        onChange(e)
    }
    return(
        <div className='radio_block'>
                <div className={intoValue?'radio checkRadioShownRadio':'radio'} onClick={handleChange}>
                    <FontAwesomeIcon icon={faCheck} className={intoValue?'checkRadio checkRadioShown':'checkRadio'}></FontAwesomeIcon>
                </div>
                <p>{label}</p>
            </div>
    )
}
export default InputCheckBox