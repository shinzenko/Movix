import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import logo from "../../../Assets/movix-logo.svg"
import ContentWrapper from "../ContentWrapper/ContentWrapper";

export const Header = () => {
  const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0,0);
    },[location])

    const controlNavBar = () => {
        if(window.scrollY > 200){
          if(window.scrollY > lastScrollY && !mobileMenu){
            setShow("hide")
          }
          else{
            setShow("show")
          }
        }
        else{
          setShow("top")
        }
        setLastScrollY(window.scrollY) 
    }

    useEffect(() => {
      window.addEventListener("scroll",controlNavBar)
      return () => {
        window.removeEventListener("scroll",controlNavBar)
      }
    },[lastScrollY])

    const searchQueryHandler = (e) => {
      if (e.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
        setTimeout(() => {
          setShowSearch(false);
        },1000)
      }
    }

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
      setMobileMenu(true)
      setShowSearch(false)
    }

    const navigationHandler = (type) => {
      if(type === "Movie") navigate("/explore/movie")
      else navigate("/explore/tv")
      setMobileMenu(false)
    }
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
          <ContentWrapper>
            <div className="logo" >
              <img src={logo} alt="" onClick={() => navigate('/')}/>
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={() => navigationHandler("Movie")}>Movies</li>
              <li className="menuItem" onClick={() => navigationHandler("Tv-Show")}>TV Shows</li>
              <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)}/> : <SlMenu onClick={openMobileMenu}/>}
            </div>
          </ContentWrapper>
          {showSearch && (<div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
            <input type="text" placeholder='Search for Movies or TV shows....' onKeyUp={searchQueryHandler} onChange={(e)=> setQuery(e.target.value)}/>
          </div>
          <VscChromeClose onClick={() => setShowSearch(false)}/> 
            </ContentWrapper>
          </div>)}
        </header>
    );
}
