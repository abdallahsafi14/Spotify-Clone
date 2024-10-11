import Logo from "../assets/Spotify-Black-Logo.wine.png";
import styled from "styled-components";

export default function Login() {
  const handleClick = () => {
    const clientId = "d67b3c9da67d417890d69a1d4191892e";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      " user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <img src={Logo} alt="spotify " />
        <button onClick={handleClick}>Connect Spotify</button>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 50vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background: black;
    color: #49f585;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
