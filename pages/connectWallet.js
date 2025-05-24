import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

// INTERNAL IMPORTS
import Style from "../styles/connectWallet.module.css";
import images from "../img";

// SMART CONTRACT IMPORTS
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const connectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(1);

  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext);

  const providerArray = [
    {
      provider: images.provider1,
      name: "Metamask",
    },
    {
      provider: images.provider2,
      name: "WalletConnect",
    },
    {
      provider: images.provider3,
      name: "Coinbase",
    },
    {
      provider: images.provider4,
      name: "Fortmatic",
    },
  ];

  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p className={Style.connectWallet_box_para}>
          Choose your preferred wallet to connect to the platform. We support
          Metamask, WalletConnect, WalletLink, Fortmatic, and more.
        </p>

        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((el, i) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                activeBtn === i + 1 ? Style.active : ""
              }`}
              key={i + 1}
              onClick={() => {
                setActiveBtn(i + 1);
                connectWallet(el.name);
              }}
            >
              <Image
                src={el.provider}
                alt="provider image"
                width={50}
                height={50}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connectWallet;
