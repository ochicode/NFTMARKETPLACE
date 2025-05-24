import React, { useContext, useEffect, useState } from "react";

// INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  BigNFTSlider,
  Category,
  Filter,
  HeroSection,
  Service,
  Subscribe,
  Title,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  Video,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

// IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // GET TOP CREATORS
  const creators = getTopCreators(nfts);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item.reverse());
      setNftsCopy(item);
    });
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="Audio Collections"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <AudioLive />
      <FollowerTab TopCreator={creators} />
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life"
      />
      <Filter />
      <NFTCard NFTData={nfts} />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories"
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
