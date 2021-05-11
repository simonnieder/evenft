import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useWindowWidth } from "../hooks/useViewportWidth";
import { AccountContext } from "../AccountContext";
import { requestAccounts} from "../utils/metamask";
import Button from "./Button";
import MobileMenu from "./MobileMenu";
import NavbarLink from "./NavbarLink";
import CreateEventPopup from "./Popups/CreateEventPopup";
import Logo from "../img/logo.png";
import { RefreshContext } from "../context/RefreshContext";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [eventPopupOpen, setEventPopupOpen] = useState(false);
  const [account, setAccount] = useContext(AccountContext);
  const [setRefresh] = useContext(RefreshContext);
  const history = useHistory();

  
  useEffect(() => {
    return history.listen((location) => {
      setUrl(location.pathname);
    });
  }, [history]);

  const width = useWindowWidth();

  useEffect(() => {
    if (width >= 768) setOpen(false);
  }, [width]);

  return (
    <div className="p-4 flex discover justify-between border-b border-gray-500 side-padding z-50 relative">
      <div className="flex">
        <Link to="/" className="flex items-center mr-10 ">
          <img src={Logo} alt="logo" className="w-8 mr-3" />
            <span className="font-body text-2xl font-semibold text-white sm:text-3xl  ">
            eve-nft
          </span>
        </Link>
        <div className="pl-3 items-center hidden lg:flex">
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/shop">Shop</NavbarLink>
          <NavbarLink to="/marketplace">Marketplace</NavbarLink>
          <NavbarLink to="/profile">Profile</NavbarLink>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-x-3">
        {account ?
          <Button outlined onClick={() => setEventPopupOpen(true)}>
            Create Event
          </Button> :
          <Button primary onClick={() => requestAccounts(setAccount)}>Login</Button>
        }
      </div>


      {eventPopupOpen && (
        <CreateEventPopup
          setRefresh={()=> setRefresh((ref)=>!ref)}
          onClose={() => setEventPopupOpen(false)}
        ></CreateEventPopup>
      )}
      <MobileMenu setAccount={setAccount} open={open} setOpen={setOpen}></MobileMenu>
    </div>
  );
};

export default Navbar;
