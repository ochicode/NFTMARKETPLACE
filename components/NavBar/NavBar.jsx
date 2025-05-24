import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { DiJqueryLogo } from "react-icons/di";

// INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, Sidebar } from "./index";
import { Button } from "../componentsindex";
import images from "../../img";

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const NavBar = () => {
  // USESTATE COMPONENTS
  const [discover, setDiscover] = useState(false);
  const [help, sethelp] = useState(false);
  const [notification, setnotification] = useState(false);
  const [profile, setprofile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      sethelp(false);
      setnotification(false);
      setprofile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      sethelp(true);
      setnotification(false);
      setprofile(false);
    } else {
      setDiscover(false);
      sethelp(false);
      setnotification(true);
      setprofile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setnotification(true);
      setDiscover(false);
      sethelp(false);
      setprofile(false);
    } else {
      setnotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setprofile(true);
      setnotification(false);
      setDiscover(false);
      sethelp(false);
    } else {
      setprofile(false);
    }
  };

  const openSidebar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  // SMART CONTRACT SECTION
  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <DiJqueryLogo onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          {/* DISCOVER MENU */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div>

          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSidebar()}
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR COMPONENT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <Sidebar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
