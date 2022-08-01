import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';

const SocketContext = createContext();
const socket = io("http://youtube-mp3.ddns.net:2000");

export function SocketProvider({ children }) {

    const [socketConnection, setSocketConnection] = useState(false);
    const [serverFiles, setServerFiles] = useState();
    const [youtubeData, setYoutubeData] = useState();
    const [currentPlay, setCurrentPlay] = useState();
    const [progress, setProgress] = useState();
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setSocketConnection(true);
        })
        socket.on("getFiles", files => {
            setServerFiles(files)
        })
        socket.on("data", data => {
            setYoutubeData(data);
            setAnimation(true)
            // console.log(data)
        })
        socket.on("processProgress", processProgress => {
            setProgress(processProgress)
        })
    }, [])

    function getFileBlob(file, action = 'download' || 'play') {
        fetch(`http://youtube-mp3.ddns.net:2000/music/${file}`)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                const downloadURL = URL.createObjectURL(blob, { type: "audio/mp3" });
                if (action === "download") {
                    downloadFileFromBlob(downloadURL, file);
                } else if (action === "play") {
                    playFromBlob(downloadURL, file)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function downloadFileFromBlob(downloadURL, file) {
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        downloadLink.setAttribute("download", `${file}.mp3`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.parentNode.removeChild(downloadLink);
    }

    function playFromBlob(downloadURL, file) {
        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.src = downloadURL;
        if(file === currentPlay) {
            audioPlayer.pause();
            setCurrentPlay(undefined)
        } else {
            audioPlayer.play();
        }
    }



    return (
        <SocketContext.Provider value={{ socket, socketConnection, serverFiles, youtubeData, setYoutubeData, getFileBlob, setCurrentPlay, currentPlay, progress, animation, setAnimation }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;