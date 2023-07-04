import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
function Artist(globalArtistId, setGlobalArtistId) {
  const { data: session } = useSession();
  const [artists, setArtists] = useState(null);
  const url = `https://spotify23.p.rapidapi.com/artists/?ids=${globalArtistId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "473b9ea4cfmsh411bbada2d3e88ep1579b6jsnd4e6539546fc",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  useEffect(() => {
    if (session && session.accessToken) {
      async function f() {
        const response = await fetch(url, options);
        const data = await response.json();
        setArtists(data);
        console.log(data);
      }
      f();
    }
  }, [session, globalArtistId]);
  return <div></div>;
}

export default Artist;
