import React from "react";
import styles from "./Playlist.module.css";
function Playlist({ trackName, currentTrackIndex, clickHandle }) {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Playlist</h1>
      <ul className={styles.listContainer}>
        {trackName.map((track, index) => (
          <li
            key={index}
            style={
              index === currentTrackIndex ? { color: "rgb(191, 111, 271)" } : {}
            }
            className={styles.playlistItem}
            onClick={() => clickHandle(index)}
          >
            <strong>{index + 1}{index>4 && <span>u</span>}.</strong>&nbsp;&nbsp; &nbsp;{track} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;


