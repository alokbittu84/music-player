import React from "react";
import styles from "./Player.module.css";

function Player({
  playlist,
  currentTrackIndex,
  trackName,
  callNext,
  playTime,
  autoPlay
}) {
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("trackIndex", JSON.stringify(currentTrackIndex));
    localStorage.setItem(
      "audioPlayTime",
      JSON.stringify(document.getElementById("audio").currentTime)
    );
  });

  if (playTime > 0 && currentTrackIndex < 5) {
    const audioTag = document.getElementById("audio");
    audioTag.currentTime = JSON.parse(localStorage.getItem("audioPlayTime"));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Music player</h1>
      <p className={styles.trackName}>{trackName[currentTrackIndex]}</p>
      <audio
        id="audio"
        className={styles.audioPlayer}
        controls
        autoPlay={autoPlay}
        onEnded={callNext}
        src={playlist[currentTrackIndex]}
      >
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}

export default Player;
