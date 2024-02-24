import styles from "./Uploader.module.css";

function Uploader({ handlefile }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Section</h1>
      <input className={styles.input}
        type="file"
        accept="audio/*"
        onChange={(e) => handlefile(e)}
        multiple
      />
    </div>
  );
}

export default Uploader;
