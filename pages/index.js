import React from "react";

// INTERNAL IMPORT
import Style from '../styles/index.module.css'
import { BigNFTSlider, HeroSection, Service, Subscribe, Title } from "@/components/componentsindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title heading='Browse by category' paragraph='Explore the NFTs in the most featured categories' />

      <Subscribe />
    </div>
  )
}

export default Home;