### YouTube to MP3
This app can convert any YouTube video to an MP3 file. Copy the YouTube URL into the app and click Search.

------------



#### How does it work?
Once you input the **YouTube URL**, a backend `NodeJS` server will take the **video ID** from the provided URL and convert it into an MP3 file using `FFmpeg` framework.
The server files can be found [HERE](https://github.com/iustinionita/youtube-mp3-server "HERE").

A `Socket.io` server will give you **live updates** about the conversion progress and will update the **File History** section from the website with the latest files. You can **download** or **play** any of these files by using the provided buttons.

#### Features I've considered while building the project
- `Progress live update`: This will give you the percentage progress of your conversion.

- `Files History`: Lists all the files from the server.

- `Play button`: Listen to the MP3 files directly from the server. This feature is not available on mobile devices.