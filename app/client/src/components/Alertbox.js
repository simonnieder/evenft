import { useContext } from 'react'
import {AnimatePresence} from "framer-motion"
import { AlertContext } from '../AlertContext'
import Alert from "./Alert"
const AlertBox = ({closeIn = 5000}) => {
    const [state, dispatch] = useContext(AlertContext); 
    return (
        <div className="fixed left-10 bottom-10 -translate-x-1/2 top flex flex-col items-start space-y-2">
            <AnimatePresence>
                {state.alerts?.length > 0 && state.alerts.map((alert)=>{
                    return <Alert key={alert.id} closeIn={closeIn} alert={alert} onClose={(id)=>dispatch({type: "REMOVE_ALERT", payload: id})}>{alert.text}</Alert>
                })}
            </AnimatePresence>
 
        </div>
    )
}

export default AlertBox
