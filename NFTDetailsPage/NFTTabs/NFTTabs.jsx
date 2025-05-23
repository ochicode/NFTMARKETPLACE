import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import images from "../../img";

const NFTTabs = ({ dataTab, icon }) => {
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((el, i) => (
        <div className={Style.NFTTabs_box} key={i + 1}>
          <Image
            src={el}
            alt="profile image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_image}
          />
          <div className={Style.NFTTabs_box_info}>
            <span>
              Offer by $770 <span>Shoaib Bhai</span>
              {icon}
            </span>
            <small>Jun 14 - 4:12PM</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
