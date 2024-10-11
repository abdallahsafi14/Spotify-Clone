import React from "react";
import styled from "styled-components";
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled,MdSearch} from 'react-icons/md';
import {FaSpotify} from 'react-icons/fa'
import PlayLists from "./PlayLists";

export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo flex items-center p-2">
          <span className="text-3xl mr-1"><FaSpotify/></span>
          <span className=" text-2xl">Spotify</span>
        </div>
        <ul>
          <li>
            <MdHomeFilled/>
            <span>Home</span>
          </li>
          <li>
            <MdSearch/>
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <PlayLists/>
    </Container>
  );
}
const Container = styled.div`
  background-color: black !important;
  color:#b3b3b3;
  display: flex;
  flex-direction:column;
  height:100%;
  width:100%;
  .top__links{
    display:flex;
    flex-direction:column;
    .logo{
      text-align:center;
      margin:1rem 0;
      img{
        max-inline-size:80%;
        block-size:auto;
      }
    }
    ul{
      list-style: none;
      display:flex;
      flex-direction:column;
      gap:1rem;
      padding:1rem;
      li{
        display: flex;
        gap:1rem;
        cursor:pointer;
      transition:.3s ease-in-out  ;  
      &:hover{
        color:white;
      }
      }
    }
  }
`;
