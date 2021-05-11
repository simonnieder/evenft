import Close from "../../img/close_popup_icon.svg";
import { useClickOutside } from "../../hooks/useClickOutside";
import { motion } from "framer-motion";
import { useEffect } from "react";
const Popup = ({ title, children, onClose }) => {
  let popup = useClickOutside(() => {
    onClose();
  });
  
  useEffect(()=>{
    const handlePress = (event)=>{
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handlePress);
    return ()=>{
      document.removeEventListener('keydown', handlePress);
    }
  },[onClose])
  
  return (
    <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-neutrals-800 bg-opacity-40 flex justify-center items-center backdrop-filter backdrop-blur-md">
      <motion.div
        initial={{ y: "30%", opacity: "0" }}
        exit={{ y: "30%", opacity: "0" }}
        animate={{ y: "0", opacity: "1" }}
        ref={popup}
        className="max-h-screen overflow-y-auto bg-neutrals-800 p-5 w-11/12 sm:w-10/12 text-white rounded-2xl max-w-lg  border border-neutrals-600"
      >
        <div className="flex justify-between items-center mb-5">
          <span className="text-3xl font-header">{title}</span>
          <img src={Close} alt="close-icon" className="cursor-pointer w-10 h-10" onClick={onClose}></img>
        </div>
        <div>{children}</div>
      </motion.div>
    </div>
  );
};
    
export default Popup;
