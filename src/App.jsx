import React, { useState, useEffect } from "react";
import Player from "./components/Player";
import Uploader from "./components/Uploader";
import Playlist from "./components/Playlist";
import myaudio1 from "./assets/Jasmine Sandlas.mp3";
import myaudio2 from "./assets/Nishan.mp3";
import myaudio3 from "./assets/Saiyaan dheere dheere.mp3";
import myaudio4 from "./assets/sports gadiya.mp3";
import myaudio5 from "./assets/Urvassi -ikka.mp3";

function App() {
  const [playlist, setPlaylist] = useState([
    myaudio1,
    myaudio2,
    myaudio3,
    myaudio4,
    myaudio5,
  ]);
  const [trackName, setTrackName] = useState([
    "Jasmine Sandlas.mp3",
    "Nishan.mp3",
    "Saiyaan dheere dheere.mp3",
    "sports gadiya.mp3",
    "Urvassi -ikka.mp3",
  ]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [autoPlay , setAutoPlay] = useState(false)

  const handleFile = (e) => {
    //storing data bcz of state update side effect due to upload ----
    localStorage.setItem("trackIndex", JSON.stringify(currentTrackIndex));
    localStorage.setItem(
      "audioPlayTime",
      JSON.stringify(document.getElementById("audio").currentTime)
    );

    // file reader api ----
    const files = Array.from(e.target.files);
    const readers = files.map((file) => new FileReader());
    const promises = readers.map(
      (reader, i) =>
        new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(files[i]);
        })
    );
    Promise.all(promises).then((dataURLs) => {
      setPlaylist([...playlist, ...dataURLs]);
    });

    // done ---
    const songName = files.map((file) => file.name);
    setTrackName([...trackName, ...songName]);
  };

  const clickHandle = (index) => {
    setCurrentTrackIndex(index);
    setAutoPlay(true);
  };

  const callNext = () => {
    setCurrentTrackIndex(
      (prevTrackIndex) => (prevTrackIndex + 1) % playlist.length
    );
    setAutoPlay(true);
  };

  useEffect(() => {
    if (
      localStorage.getItem("trackIndex") &&
      localStorage.getItem("audioPlayTime")
    ) {
      const savedIndex = JSON.parse(localStorage.getItem("trackIndex"));
      setCurrentTrackIndex(savedIndex);
      const playTimes = JSON.parse(localStorage.getItem("audioPlayTime"));
      setPlayTime(playTimes);
    }
  }, []);

  return (
    <div className="container">
          <Player
        playTime={playTime}
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        trackName={trackName}
        callNext={callNext}
        autoPlay={autoPlay}
      />
      <Uploader handlefile={handleFile} />
      <Playlist trackName={trackName} clickHandle={clickHandle} currentTrackIndex={currentTrackIndex} />
  
    </div>
  );
}

export default App;
