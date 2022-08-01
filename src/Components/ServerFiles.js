import { useContext, useState } from "react";
import SocketContext from "./SocketContext";

export default function ServerFiles() {
  const [filesNumber, setFilesNumber] = useState(5);
  const { serverFiles, getFileBlob, setCurrentPlay, currentPlay } =
    useContext(SocketContext);
  return (
    <div className="serverFiles">
        <h3>Files History</h3>
      {serverFiles && (
        <div>
          {serverFiles.slice(0, filesNumber).map((file) => {
            return (
              <div className="file" key={serverFiles.indexOf(file)}>
                <p className="file--title">{file.slice(0, -4)}</p>
                <div className="file--buttons">
                  <button
                    className="button"
                    onClick={() => getFileBlob(file.slice(0, -4), "download")}
                  >
                    Download
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      getFileBlob(file.slice(0, -4), "play");
                      setCurrentPlay(file.slice(0, -4));
                    }}
                  >
                    {file === currentPlay + ".mp3" ? "Stop" : "Play"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {(serverFiles && filesNumber < serverFiles.length) && <button className="button" id="load--more" onClick={() => setFilesNumber(filesNumber + 5)}>Load more</button>}
      {/* <p onClick={() => console.log(serverFiles.length)}>test</p> */}
    </div>
  );
}
