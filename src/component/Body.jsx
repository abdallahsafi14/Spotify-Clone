import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constant";
import { IoTimeOutline } from "react-icons/io5";

export default function Body({ headerbackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    try {
      const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      };
      getInitialPlaylist();
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, [token, dispatch, selectedPlaylistId]);
  const msToMinutesAndSecond = (ms) => {
    const minutes = Math.floor(ms / 60_000);
    const seconds = ((ms % 60_000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: ` Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAY, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };
  return (
    <Container headerbackground={headerbackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selectedPlayList" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col flex justify-center text-lg">
                <span className="clock">
                  <IoTimeOutline />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map((track, index) => {
                const {
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                } = track;
                return (
                  <div
                    className="row"
                    key={id}
                    onClick={() =>
                      playTrack(
                        id,
                        name,
                        artists,
                        image,
                        context_uri,
                        track_number
                      )
                    }
                  >
                    <div className="col">
                      <span>{index + 1}</span>
                    </div>
                    <div className="col detail">
                      <img src={image} alt="track" />
                      <div className="info">
                        <span className="name">{name}</span>
                        <span className="">{artists}</span>
                      </div>
                    </div>
                    <div className="col">
                      <span>{album}</span>
                    </div>
                    <div className="col flex justify-center">
                      <span>{msToMinutesAndSecond(duration)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.4fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerbackground }) =>
        headerbackground ? "#000000" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2.1fr 0.4fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          gap: 1rem;
          img {
            height: 40px;
          }
          .detail {
            display: flex;
            .info {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
    }
  }
  .clock {
    display: block;
    width: fit-content;
    svg {
      width: 25px;
    }
  }
`;
