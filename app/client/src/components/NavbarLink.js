import { Link } from 'react-router-dom'

const NavbarLink = ({to, children}) => {
    return (
        <Link to={to}
        className={`cursor-pointer select-none text-neutrals-500 font-header font-semibold mx-3
        ${window.location.pathname === to && "navbar-link-active"}
        `}>
        {children}
    </Link>
    )
}

export default NavbarLink
