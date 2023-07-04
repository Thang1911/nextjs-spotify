import { PlayIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function Song({ song, track, setCurrentSongId, setPlaying }) {
  const [hover, setHover] = useState(false);
  function millisecondsToMinuteSecond(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div
      onClick={() => {
        setPlaying(true);
        setCurrentSongId(track.id);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        {hover ? (
          <PlayIcon className="text-white w-5 h-5" />
        ) : (
          <p className="w-5">{song + 1}</p>
        )}
        <img className="h-10 w-10" src={track.album.images[0].url} alt="" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white text-base">
            {track.name}
          </p>
          <p className="w-36 truncate">
            {track.artists.map((artist, i) => {
              return (
                <>
                  <span className="hover:underline">{artist.name}</span>
                  <span>{i != track.artists.lenght - 1 ? ", " : null}</span>
                </>
              );
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 truncate hidden md:inline">{track.album.name}</p>
        <p>{millisecondsToMinuteSecond(track.duration_ms)}</p>
      </div>
    </div>
  );
}
