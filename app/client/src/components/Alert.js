import React, { useEffect } from 'react'
import { motion} from "framer-motion"

const Alert = ({alert, onClose, closeIn = 3000}) => {;
    useEffect(()=>{
        setTimeout(()=>{
            onClose(alert.id);
        },closeIn)  
    },[closeIn, onClose, alert])
    
    return (
        <motion.div exit={{x: "-150%"}} initial={{x: "-100%"}} animate={{x: "0"}} className={`max-w-md px-5 flex items-center justify-between text-center  bg-neutrals-800 p-3 rounded-2xl z-50 border-2 ${alert.error && "border-primary-red"} ${!alert.error && "border-primary-green" }`}>
            <span className="font-body font-medium text-neutrals-200 text-md">{alert.message}</span>
        </motion.div>
    )
}

export default Alert