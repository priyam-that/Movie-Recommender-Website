import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import style from "../Styles/Watchmovie.module.css";

const MovieWatch = ({ movieTitle }) => {
  const [movieId, setMovieId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState("Autoembed");

  const API_KEY = "1131ab6f7e96fcc1c729699cbf8b22cc";

  // All API links based on movie ID
  const serverLinks = (e) => ({
    "4K": `https://player.videasy.net/movie/${e}`,
    "Braflix Multi": `https://www.rgshows.me/player/movies/api1/index.html?id=${e}`,
    Braflix: `https://www.rgshows.me/player/movies/api2/index.html?id=${e}`,
    "Multi server": `https://www.rgshows.me/player/movies/api4/index.html?id=${e}`,
    Vidsrc: `https://vidsrc.cc/v2/embed/movie/${e}`,
    "HD US": `https://vidsrc.in/embed/movie/${e}`,
    "HD IN": `https://api.vidsrc.win/hindi.html?id=${e}`,
    Autoembed: `https://tom.autoembed.cc/movie/${e}`,
    "2embed": `https://www.2embed.cc/embed/${e}`,
  });

  useEffect(() => {
    const fetchMovieId = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            movieTitle
          )}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setMovieId(data.results[0].id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie ID:", error);
        setLoading(false);
      }
    };

    if (movieTitle) {
      fetchMovieId();
    }
  }, [movieTitle]);

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  if (loading) {
    return (
      <div className={style.spinnerWrapper}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  const servers = movieId ? serverLinks(movieId) : {};

  return (
    <div className={style.container}>
      <div className={style.centerButton}>
        <button
          onClick={togglePlayer}
          className={style.watchButton}
          disabled={!movieId}
        >
          {movieId ? "Watch Movie" : "Movie Not Found"}
        </button>
      </div>

      {showPlayer && movieId && (
        <div className={style.modalOverlay}>
          <div className={style.videoWrapper}>
            <button onClick={togglePlayer} className={style.closeButton}>
              <X size={30} />
            </button>

            <div className={style.serverSelector}>
              <label htmlFor="server" className={style.label}>
                Select Server:{" "}
              </label>
              <select
                id="server"
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                className={style.dropdown}
              >
                {Object.keys(servers).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <iframe
              src={servers[selectedServer]}
              width="100%"
              height="80%"
              allowFullScreen
              title="Movie Stream"
              className={style.iframe}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieWatch;
