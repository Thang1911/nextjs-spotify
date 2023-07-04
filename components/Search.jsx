import {
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import FeaturePlaylist from "./FeaturePlaylist";
import SearchResult from "./SearchResult";

function Search({ setView, setGlobalPlaylistId, setCurrentSongId, setPlaying, setGlobalArtistId }) {
  const { data: session } = useSession();
  const [searchData, setSearchData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  },[inputRef])

  async function updateSearchresults(query) {
    const response = await fetch(
      "https://api.spotify.com/v1/search?" +
        new URLSearchParams({
          q: query,
          type: ["artist", "playlist", "track"],
        }),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    setSearchData(data);
  }

  return (
    <div className="flex-grow h-screen">
      <header className="text-white sticky top-0 h-20 z-10 text-4xl flex items-center px-8">
        <MagnifyingGlassCircleIcon className="absolute top-7 left-10 text-neutral-800 h-6 w-6" />
        <input
          value={searchValue}
          onChange={async (e) => {
            setSearchValue(e.target.value);
            await updateSearchresults(e.target.value);
          }}
          ref={inputRef}
          className="rounded-full bg-white w-96 pl-12 text-neutral-900 text-base py-2 font-normal outline-0"
          type="text"
        />
      </header>
      <div
        onClick={() => signOut()}
        className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
      >
        <img
          className="rounded-full w-7 h-7"
          src={session?.user.image}
          alt="profile pic"
        />
        <p className="text-sm">Logout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <div>
        {searchData === null ? (
          <FeaturePlaylist
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />
        ) : (
          <SearchResult
            setView={setView}
            playlists={searchData?.playlists.items}
            songs={searchData?.tracks.items}
            artists={searchData?.artists.items}
            setGlobalPlaylistId={setGlobalPlaylistId}
            setGlobalArtistId={setGlobalArtistId}
            setCurrentSongId={setCurrentSongId}
            setPlaying={setPlaying}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
