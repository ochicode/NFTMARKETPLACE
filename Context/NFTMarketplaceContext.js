import React, { useState, useContext, useEffect } from "react";
import web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";

// INTERNAL IMPORT
import { NFTMarketplaceABI, NFTMarketplaceAddress } from "./constants";

const titleData = "Discover, collect, and sell NFTs 🖼️";
export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  return (
    <NFTMarketplaceContext.Provider value={{ titleData }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
