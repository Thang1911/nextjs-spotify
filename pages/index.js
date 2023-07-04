import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Playlist from "@/components/Playlist";
import Search from "@/components/Search";
import Library from "@/components/Library";
import Artist from "@/components/Artist";
import Player from "./../components/Player";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [view, setView] = useState("search");
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null);
  const [globalArtistId, setGlobalArtistId] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="flex w-full">
          <Sidebar
            view={view}
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />
          {view === "playlist" && (
            <Playlist
              globalPlaylistId={globalPlaylistId}
              setCurrentSongId={setCurrentSongId}
              setPlaying={setPlaying}
            />
          )}
          {view === "search" && (
            <Search
              setView={setView}
              setGlobalPlaylistId={setGlobalPlaylistId}
              setCurrentSongId={setCurrentSongId}
              setPlaying={setPlaying}
              setGlobalArtistId={setGlobalArtistId}
            />
          )}
          {view === "library" && (
            <Library
              setView={setView}
              setGlobalPlaylistId={setGlobalPlaylistId}
            />
          )}
          {view === "artist" && (
            <Artist
              setView={setView}
              globalArtistId={globalArtistId}
              setGlobalArtistId={setGlobalArtistId}
              setCurrentSongId={setCurrentSongId}
            />
          )}
        </div>
        <div className="sticky bottom-0 z-20 w-full">
          <Player
            currentSongId={currentSongId}
            setCurrentSongId={setCurrentSongId}
            playing={playing}
            setPlaying={setPlaying}
          />
        </div>
      </main>
    </>
  );
}
