import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "../styles/reselltoken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "@/components/componentsindex";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    // setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    try {
      if (!price || price <= 0) {
        alert("Please enter a valid price");
        return;
      }

      // Convert price to string to ensure proper formatting
      const formattedPrice = price.toString();
      await createSale(tokenURI, formattedPrice, true, id);
      router.push("/author");
    } catch (error) {
      console.log("error reselling nft", error);
    }
  };

  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell your Token, Set Price</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            min={0.000000000000000001}
            placeholder="resell price"
            className={formStyle.Form_box_input_userName}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div>

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="Resell NFT" handleClick={resell} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
