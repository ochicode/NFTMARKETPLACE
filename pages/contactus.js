import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

// INTERNAL IMPORTS
import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "@/components/componentsindex";

const contactus = () => {
  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>Contact</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🗺️ ADDRESS</h3>
              <p>
                Photo booth tattooed raw denim, banh mi VHS leggings, portland
                typewriter
              </p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>✉️ EMAIL</h3>
              <p>no.example@example.com</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>☎️ PHONE</h3>
              <p>+123 456 7890</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🌍 SOCIALS</h3>
              <a href="#">
                <TiSocialFacebook />
              </a>
              <a href="#">
                <TiSocialLinkedin />
              </a>
              <a href="#">
                <TiSocialTwitter />
              </a>
              <a href="#">
                <TiSocialYoutube />
              </a>
              <a href="#">
                <TiSocialInstagram />
              </a>
            </div>
          </div>
          <div className={formStyle.contactus_box_box_right}>
            <form>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="full name"
                  className={formStyle.Form_box_input_userName}
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input
                    type="text"
                    placeholder="email"
                    className={formStyle.Form_box_input_email}
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="description">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  placeholder="your message"
                />
              </div>
              <Button
                btnName="Send Message"
                classStyle={formStyle.button}
                handleClick={() => {}}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;
