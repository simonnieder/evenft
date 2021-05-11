import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../img/logo.png"
const Footer = () => {
    return (
        <div className="divide-y divide-neutrals-500 side-padding border-t border-neutrals-500">
            <div className=" flex flex-col sm:flex-row justify-between items-start py-8">
                <div className="flex items-center mb-5 sm:mb-0">
                    <img src={Logo} alt="logo" className="w-8 mr-3" />
                    <span className="font-body text-3xl font-semibold text-white">eve-nft</span>
                </div>
                <div className="flex flex-col gap-y-3">
                    <h3 className="text-neutrals-300 font-body font-medium mx-3 text-lg">Pages</h3>
                    <Link to="/" className="text-neutrals-500 font-header font-bold mx-3">
                    Home
                    </Link>
                    <Link to="/shop" className="text-neutrals-500 font-header font-bold mx-3">
                        Shop
                    </Link>
                    <Link to="/marketplace" className="text-neutrals-500 font-header font-bold mx-3">
                        Marketplace
                    </Link>
                    <Link to="/profile" className="text-neutrals-500 font-header font-bold mx-3">
                        Profile
                    </Link>
                </div>
            </div>

            <div className="py-5 flex items-center">
                <span className="font-body text-sm text-neutrals-500  ">Copyright &copy; 2021 EVE-NFT. All rights reserved</span>
            </div>


        </div>
    )
}

export default Footer
