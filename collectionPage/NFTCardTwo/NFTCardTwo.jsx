import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../components/componentsindex";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };

  console.log("NFTDATA", NFTData);

  return (
    <div className={Style.nftCardTwo}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
          <div className={Style.nftCardTwo_box} key={i + 1}>
            <div className={Style.nftCardTwo_box_like}>
              <div className={Style.nftCardTwo_box_like_box}>
                <div className={Style.nftCardTwo_box_like_box_box}>
                  <BsImage className={Style.nftCardTwo_box_like_box_box_icon} />
                  <p onClick={() => likeNFT()}>
                    {like ? <AiOutlineHeart /> : <AiFillHeart />}
                    {""}
                    <span>{likeInc + 1}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.nftCardTwo_box_img}>
              <Image
                src={el.image}
                alt="nft image"
                width={500}
                height={500}
                objectFit="cover"
                className={Style.nftCardTwo_box_img_img}
              />
            </div>

            <div className={Style.nftCardTwo_box_info}>
              <div className={Style.nftCardTwo_box_info_left}>
                <LikeProfile />
                <p>{el.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>

            <div className={Style.nftCardTwo_box_price}>
              <div className={Style.nftCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price} ETH</p>
              </div>
              <p className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer />
                <span>{i + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
