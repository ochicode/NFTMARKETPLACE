import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import images from "../img";
import { Brand } from "@/components/componentsindex";

const aboutus = () => {
  const founderArray = [
    {
      name: "John Doe",
      position: "Founder",
      images: images.founder1,
    },
    {
      name: "Orla Dwyer",
      position: "Co-founder and Chief Executive",
      images: images.founder2,
    },
    {
      name: "Daniel Jame",
      position: "Co-founder and Chief Executive",
      images: images.founder3,
    },
    {
      name: "Benard O'Brien",
      position: "Chief Operating Officer",
      images: images.founder4,
    },
  ];
  const factsArray = [
    {
      title: "10 million",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
    {
      title: "100,000",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
    {
      title: "220+",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
  ];

  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 About Us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero} alt="about" />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>💪 Founders</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img} key={i}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={350}
                  height={350}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>🚀 Fast Facts</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info} key={i}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;
