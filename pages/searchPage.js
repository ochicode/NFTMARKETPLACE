import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Filter } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item.reverse());
      setNftsCopy(item);
    });
  }, []);

  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
  ];

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTs.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTs);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
