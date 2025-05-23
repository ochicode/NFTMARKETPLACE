import React, { useState, useContext, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { Router } from "next/router";

// Pinata configuration
const PINATA_API_KEY = "c82259af6d22dfae2fd0";
const PINATA_SECRET_API_KEY =
  "3d05dcf66800211417aba4934992e8a482c9f272fda0865d9ec35c451c78bd48";
const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MjJlYWU3ZC1jODdkLTRlMWYtYTUxNy05MzUzNTA0NTQwNmUiLCJlbWFpbCI6ImJlbmFyZDUxOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzgyMjU5YWY2ZDIyZGZhZTJmZDAiLCJzY29wZWRLZXlTZWNyZXQiOiIzZDA1ZGNmNjY4MDAyMTE0MTdhYmE0OTM0OTkyZThhNDgyYzlmMjcyZmRhMDg2NWQ5ZWMzNWM0NTFjNzhiZDQ4IiwiZXhwIjoxNzc5NTQ2NDkyfQ.DYYQYSzzaFMPEPzWtLQmlg9wYokY3dFPc4jnq-BOH_U";

// INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

// FETCHING SMART CONTRACT ABI AND ADDRESS
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

// CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs 🖼️";

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // USESTATE
  const [currentAccount, setCurrentAccount] = useState("");
  const router = Router;

  // CHECK IF WALLET IS CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account found");
      }
    } catch (error) {
      console.log("Something wrong while connecting to wallet", error);
    }
  };

  // CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error while connecting to wallet", error);
    }
  };

  // UPLOAD TO PINATA IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const metadata = JSON.stringify({
        name: file.name,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );

      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      return url;
    } catch (error) {
      console.log("Error uploading to Pinata IPFS", error);
    }
  };

  // CREATE NFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return console.log("Data is Missing");

    const data = JSON.stringify({ name, description, image });

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;

      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      console.log("Error while creating NFT", error);
    }
  };

  // CREATE SALE FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.reSellToken(url, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();

      console.log(transaction);
    } catch (error) {
      console.log("Error while creating sale", error);
    }
  };

  // FETCH NFTS FUNCTION
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItem();
      console.log("nft data", data);

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: Number(tokenId),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching NFTs", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  // FETCH MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemListed()
          : await contract.fetchMyNft();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching listed NFTs", error);
    }
  };

  // BUY NFT FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
    } catch (error) {
      console.log("Error while buying NFTs", error);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        connectWallet,
        uploadToIPFS,
        createSale,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        checkIfWalletConnected,
        currentAccount,
        titleData,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
