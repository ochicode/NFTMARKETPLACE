import React, { useEffect, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/uploadNFT.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const uploadNFT = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            You can set preferred display name, description and profile picture
            which will be shown to the users.
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: .jpg, .png, .mp4, .wav, .obj, .glb max size:
            100mb
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
        </div>
      </div>
    </div>
  );
};

export default uploadNFT;
