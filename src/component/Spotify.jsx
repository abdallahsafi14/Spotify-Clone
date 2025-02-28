import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import Sidebar from "./sidebar";
import { reducerCases } from "../utils/Constant";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();

  const [navbackground, setnavbackground] = useState(false);
  const [headerbackground, setheaderbackground] = useState(false);

  const bodyScrolled = () => {
    if (bodyRef.current.scrollTop >= 30) {
      setnavbackground(true);
      setheaderbackground(true);
    } else {
      setnavbackground(false);
      setheaderbackground(false);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };

        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navbackground} />
          <div className="body__content">
            <Body headerbackground={headerbackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgb(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
