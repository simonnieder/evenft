import React from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";
const Button = ({ onClick, primary, full, children, disabled, loading, outlined }) => {
  var scale = 0.95;
  return (
    <motion.button
      whileTap={{ scale: scale }}
      onClick={onClick}
      type="submit"
      className=
      {
        `flex items-center justify-center whitespace-nowrap px-8 font-header font-bold text-neutrals-100 rounded-full box-border focus:outline-none transition transition-color duration-300 ease-out
        ${full && "w-full"}
        ${primary
          ? (outlined ? `border-2 border-primary-blue text-primary-blue outlined-button hover:bg-primary-blue hover:text-neutrals-100 hover:border-transparent` : `bg-primary-blue py-2 hover:bg-primary-lightblue` )
          : (outlined ? `border-2 border-neutrals-500 outlined-button hover:bg-neutrals-300 hover:text-neutrals-800 hover:border-transparent` : `bg-neutrals-100 hover:bg-neutrals-300 py-2 text-neutrals-800`)
        }
        ${disabled &&  `pointer-events-none opacity-40`}
        `

      }
    >

      {loading ? <Loader></Loader> : children}
    </motion.button>
  );
};

export default Button;
