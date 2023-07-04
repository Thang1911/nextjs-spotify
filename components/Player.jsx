import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState,useEffect,useRef } from "react";

export default function Player({ currentSongId, setCurrentSongId, playing, setPlaying}) {
  const { data: session } = useSession();
  const [songInfo, setSongInfo] = useState(null);
  const audioRef = useRef(null);

  async function getSongInfo(trackId) {
    if (trackId) {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setSongInfo(data);
    }
  }
  async function getCurrentSong() {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing `,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }

  function handlePlay() {
    audioRef.current.play();
    setPlaying(true);
  }

  function handlePause() {
    audioRef.current.pause();
    setPlaying(false);
  }

  useEffect(() => {
    async function getSong() {
      if (session && session.accessToken) {
        if (!currentSongId) {
          const data = await getCurrentSong();
          setCurrentSongId(data?.item?.id);
          if(data.is_playing){
            setPlaying(true)
          }
          await getCurrentSong(data?.item?.id)
        } else {
          await getSongInfo(currentSongId);
        }
      }
    }
    getSong();
    audioRef.current.play();
  }, [currentSongId]);

  return (
    <div className="h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        {songInfo?.album.images[0].url && (
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo.album.images[0].url}
            alt=""
          />
        )}
        <div>
          <p className="text-white text-sm">{songInfo?.name}</p>
          <p className="text-neutral-400 text-xs">
            {songInfo?.artists[0]?.name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {playing ? (
          <PauseCircleIcon
            className="h-10 w-10"
            onClick={handlePause}
          />
        ) : (
          <PlayCircleIcon
            className="h-10 w-10"
            onClick={handlePlay}
          />
        )}
        <audio ref={audioRef} src={songInfo?.preview_url} />
      </div>
      <div></div>
    </div>
  );
}
