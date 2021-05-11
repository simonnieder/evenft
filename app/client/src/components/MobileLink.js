import React from 'react'
import { Link } from 'react-router-dom'

const MobileLink = ({to, children, onClick }) => {
    return (
        <Link to={to} className={`${window.location.pathname === to ? "text-white bg-neutrals-700" : "text-neutrals-500 "}  rounded-lg p-3 font-header font-semibold text-2xl transition transition-colors hover:text-white hover:bg-neutrals-7000`} onClick={onClick}>
        {children}
    </Link>
    )
}

export default MobileLink
