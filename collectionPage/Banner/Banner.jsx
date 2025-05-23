import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image
          src={bannerImage}
          alt="background"
          objectFit="cover"
          width="auto"
          height="auto"
        />
      </div>
    </div>
  );
};

export default Banner;
