import Button from "../Button"
import Popup from "./Popup"
import LoginIcon from "../../img/login_icon.svg"
import {requestAccounts} from "../../utils/metamask";
import { useContext } from "react";
import {AccountContext} from "../../AccountContext"
const LoginPopup = ({onClose}) => {
    const [account,setAccount] = useContext(AccountContext);
    return (
        <Popup title="Login" onClose={onClose}>
            <div className="flex flex-col items-center space-y-4 pb-4 w-full">
                <img alt="login-icon" src={LoginIcon} className="w-16"></img>
                <p className="font-body font-lg text-center sm:px-10">You need to connect your wallet before buying or selling tickets.</p>
            </div>
            <div>
            </div>
            <div className="space-y-2">
                    <Button full primary onClick={()=>requestAccounts((account)=>{
                        setAccount(account);
                        onClose();
                    })}>Login</Button>
                    <Button full outlined onClick={onClose}>Cancel</Button>
                </div>
        </Popup>
    )
}

export default LoginPopup
