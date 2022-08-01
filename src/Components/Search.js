import { useContext, useEffect, useRef } from "react";
import SocketContext from "./SocketContext";
import { useTransition, animated } from "react-spring";
import loader from '../Media/loader.svg';
import logo from '../Media/logo.svg';

export default function Search() {
  const {
    socket,
    youtubeData,
    getFileBlob,
    progress,
    animation,
    setAnimation,
  } = useContext(SocketContext);
  const searchInput = useRef();
  const transitionFade = useTransition(animation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {duration: 700}
  });
  const transitionSlide = useTransition(animation, {
    from: { transform: "translateX(50%)", opacity: 0 },
    enter: { transform: "translateX(0%)", opacity: 1 },
    leave: { transform: "translateX(50%)", opacity: 0 },
  });
  const transitionSlide2 = useTransition(animation, {
    from: { transform: "translateY(50%)", opacity: 0 },
    enter: { transform: "translateY(0%)", opacity: 1 },
    leave: { transform: "translateY(50%)", opacity: 0 },
    config: {duration: 700}
  });

  useEffect(() => {
    socket.emit("getFiles");
  }, [socket]);

  function getId(link) {
    const start = link.search("v=") + 2;
    function getEnd() {
      if (link.includes("&")) {
        return link.search("&");
      } else {
        return link.length;
      }
    }
    const id = link.slice(start, getEnd());
    return id;
  }

  return (
    <div className="search">
        <img src={logo} alt="logo" id="logo" />
        <img src={loader} alt="loader" id="loader" style={(progress > 0 && progress < 100) ? {opacity: "1"} : {opacity: "0"}}/>
      <div className="search--wrapper">
        <input
          type="text"
          placeholder="Youtube URL"
          id="search--input"
          ref={searchInput}
          autoComplete="off"
        />
        <button
          id="search--button"
          onClick={() => {
            setAnimation(false);
            socket.emit(
              "getFile",
              searchInput.current.value !== ""
                ? getId(searchInput.current.value)
                : console.log("No YouTube link provided")
            );
            searchInput.current.value = "";
          }}
        >
          {progress && progress !== 0 && progress !== 100
            ? `${progress}%`
            : "Search"}
        </button>
      </div>
      <div className="youtubeData--wrapper">
        {youtubeData && (
          <div className="youtubeData">
            {transitionFade(
              (style, image) =>
                image && (
                  <animated.img
                    style={style}
                    src={youtubeData.thumbnail}
                    alt="thumbnail"
                  />
                )
            )}
            <div>
              {transitionSlide(
                (style, title) =>
                  title && (
                    <animated.h3 style={style}>
                      {youtubeData.videoTitle}
                    </animated.h3>
                  )
              )}
              {transitionSlide2(
                (style, downloadButton) =>
                  downloadButton && (
                    <animated.button
                      style={style}
                      className="button"
                      onClick={() => {
                        getFileBlob(`${youtubeData.videoTitle}`, "download");
                      }}
                    >
                      Download
                    </animated.button>
                  )
              )}
            </div>
          </div>
        )}
      </div>
      <audio controls id="audioPlayer"></audio>
      {/* <button onClick={() => setAnimate(!animate)}>test</button> */}
      {/* {transition(
        (style, item) =>
          item && (
            <animated.p style={style}>
              {youtubeData && youtubeData.videoTitle}
            </animated.p>
          )
      )} */}
    </div>
  );
}
