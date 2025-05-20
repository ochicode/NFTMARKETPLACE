import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  itemName,
  website,
  description,
  royalties,
  fileSize,
  category,
  image,
  properties,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 1024 * 1024 * 5,
  });

  return (
    <div className={Style.Dropzone}>
      <div className={Style.Dropzone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.Dropzone_box_input}>
          <p>{title}</p>
          <div className={Style.Dropzone_box_input_img}>
            <Image
              src={image}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.Dropzone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.Dropzone_box_aside}>
          <div className={Style.Dropzone_box_aside_box}>
            <Image
              src={images.nft_image_1}
              alt="nft image"
              width={200}
              height={200}
            />

            <div className={Style.Dropzone_box_aside_box_preview}>
              <div className={Style.Dropzone_box_aside_box_preview_one}>
                <p>
                  <samp>NFT Name:</samp>
                  {itemName || ""}
                </p>
                <p>
                  <samp>Website:</samp>
                  {website || ""}
                </p>
              </div>

              <div className={Style.Dropzone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span>
                  {description || ""}
                </p>
              </div>

              <div className={Style.Dropzone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties:</span>
                  {royalties || ""}
                </p>
                <p>
                  <span>File Size:</span>
                  {fileSize || ""}
                </p>
                <p>
                  <span>Properties:</span>
                  {properties || ""}
                </p>
                <p>
                  <span>Category:</span>
                  {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
