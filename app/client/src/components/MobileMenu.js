import { useClickOutside } from '../hooks/useClickOutside';
import MobileLink from './MobileLink'
import Icon from "../img/menu_icon.svg";
import CloseIcon from "../img/close_menu_icon.svg"
import Button from './Button';
import { requestAccounts} from "../utils/metamask";
const MobileMenu = ({open, setOpen, setAccount}) => {
    let ref = useClickOutside(() => {
        setOpen(false);
      });
    return (    
        <div ref={ref} className="lg:hidden">
            <img
                src={open ? CloseIcon : Icon}
                className=" cursor-pointer w-12 h-12"
                onClick={open ? () => setOpen(false): () => setOpen(true) }
                alt="Icon"
            ></img>
            {open &&
                <div  className="absolute left-0 bottom-0 right-0 transform translate-y-full bg-neutrals-800 flex flex-col justify-center space-y-2 z-40 p-5 border-b border-t border-gray-500 ">
                    <MobileLink to="/" onClick={()=>setOpen(false)}>Home</MobileLink>
                    <MobileLink to="/shop" onClick={()=>setOpen(false)}>Shop</MobileLink>
                    <MobileLink to="/marketplace" onClick={()=>setOpen(false)}>Marketplace</MobileLink>
                    <MobileLink to="/profile" onClick={()=>setOpen(false)}>Profile</MobileLink>
                    <Button onClick={()=>{
                        requestAccounts(setAccount);
                        setOpen(false);
                    }} primary full>Login</Button>
                </div>
            }
        </div>
        
    )
}

export default MobileMenu
