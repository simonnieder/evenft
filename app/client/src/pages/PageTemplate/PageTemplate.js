import { useContext } from "react";
import { useHistory } from "react-router";
import { AccountContext } from "../../AccountContext";
const PageTemplate = ({children, openPopup}) => {
    const [account] = useContext(AccountContext);
    const history = useHistory();
    if(!account) {
        history.push("/");
        openPopup();
        return <div></div>
    }
    return (
        <>
            {children}
        </>
    )
    
}

export default PageTemplate
