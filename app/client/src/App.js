import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Market from "./pages/Market/Market";
import Profile from "./pages/Profile/Profile";
import Shop from "./pages/Shop/Shop";
import Footer from "./components/Footer";
import EventDetail from "./pages/EventDetail/EventDetail";
import { AccountProvider } from "./AccountContext";
import {  AlertProvider } from "./AlertContext";
import Alertbox from "./components/Alertbox";
import { useState} from "react";
import PageTemplate from "./pages/PageTemplate/PageTemplate";
import LoginPopup from "./components/Popups/LoginPopup";
import { ContractProvider } from "./context/ContractContext";
import { RefreshProvider } from "./context/RefreshContext";
function App() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
    <div className="bg-neutrals-800">
      <AccountProvider>
        <AlertProvider>
        <ContractProvider>
          <RefreshProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar/>
              <Switch>
                <Route path="/profile" render={() => <PageTemplate openPopup={()=>setLoginOpen(true)}><Profile /></PageTemplate>}></Route>
                <Route path="/shop/:id" render={() => <EventDetail />}></Route>
                <Route path="/shop" render={() => <PageTemplate openPopup={()=>setLoginOpen(true)}><Shop /></PageTemplate>}></Route>
                <Route path="/marketplace" render={() => <PageTemplate openPopup={()=>setLoginOpen(true)}><Market /></PageTemplate>}></Route>
                <Route path="/" render={() => <Home />}></Route>
              </Switch>
              {loginOpen && <LoginPopup onClose={()=>setLoginOpen(false)}></LoginPopup>}
            </div>
            <Footer />            
            <Alertbox></Alertbox>
          </BrowserRouter>
          </RefreshProvider>
          </ContractProvider>
        </AlertProvider>
      </AccountProvider>
    </div>
  );
}

export default App;
