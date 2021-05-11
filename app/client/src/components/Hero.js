import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import Img from "../img/hero_img_blockchain.svg";
const Hero = () => {
  const history = useHistory();
  return (
    <div className="h-full py-10 side-padding flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-evenly flex-1">
      <div className="flex flex-col items-center lg:items-start md:w-1/2 space-y-3 sm:space-y-5">
        <h1 className="text-neutrals-100 font-header font-medium text-4xl sm:text-5xl xl:text-7xl flex flex-col text-center lg:text-left whitespace-nowrap">
          <span>The modern way</span> <span>to buy tickets.</span>
        </h1>
        <p className="text-neutrals-400 sm:text-lg xl:text-xl font-body sm:flex sm:flex-col text-center lg:text-left sm:whitespace-nowrap">
          <span>
            With <strong>eve-nft</strong> you can buy and trade event tickets
          </span>
          <span>
            {" "}safely using the Ethereum blockchain.
          </span>
        </p>
        <Button
          primary
          onClick={() => history.push("/shop")}
          className="text-primary-blue font-medium font-body text-2xl transition hover:underline"
        >
          Visit Shop &rarr;
        </Button>
      </div>
      <img src={Img} alt="blockchain" className="w-full sm:w-10/12 lg:w-6/12 xl:6/12 max-w-6xl" />
    </div>
  );
};

export default Hero;
