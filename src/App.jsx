import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
// import Watch from "./components/Watch";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieDetailsSection from "./components/MovieDetailsSection";
import {
  ConfigContext,
  FavouriteListContext,
  WatchlistContext,
} from "./context/context";
import TVDetailsSection from "./components/TVDetailsSection";

function App() {
  const [config, setConfig] = useState({
    images: {
      base_url: "http://image.tmdb.org/t/p/",
      secure_base_url: "https://image.tmdb.org/t/p/",
      backdrop_sizes: ["w300", "w780", "w1280", "original"],
      logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
      poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
      profile_sizes: ["w45", "w185", "h632", "original"],
      still_sizes: ["w92", "w185", "w300", "original"],
    },
  });

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });
  const [favouriteList, setFavouriteList] = useState(() => {
    const savedFavouriteList = localStorage.getItem("favourite");
    return savedFavouriteList ? JSON.parse(savedFavouriteList) : [];
  });

  const getTmdbConfig = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/configuration",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE4Njk3MC42MDY4NDcsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEiRl7DXprt0KH5d4IbL3EsQ3qpyNsA3e4A2x5PL4vU",
      },
    };

    const response = await axios.request(options);
    // console.log(response.data);
    setConfig(response.data);
  };
  useEffect(() => {
    getTmdbConfig();
  }, []);

  //Add and Remove from Watchlist
  const handleWatchlist = (isItInWatchlist, itemDetails) => {
    if (isItInWatchlist) {
      const localCopy = watchlist.filter(
        (details) => details.id !== itemDetails
      );
      localStorage.setItem("watchlist", JSON.stringify(localCopy));
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((details) => details.id !== itemDetails.id)
      );
    } else {
      const movie = {
        id: itemDetails.id,
        name: itemDetails.title
          ? itemDetails.title
          : itemDetails.original_title
          ? itemDetails.original_title
          : itemDetails.original_name,
        backdropPath: itemDetails.backdrop_path,
      };
      const localCopy = [...watchlist, movie];
      localStorage.setItem("watchlist", JSON.stringify(localCopy));

      setWatchlist((prev) => {
        return [...prev, movie];
      });
    }
  };

  //Add and Remove Favourite
  const handleFavourite = (isItInFavouriteList, itemDetails) => {
    if (isItInFavouriteList) {
      const localCopy = favouriteList.filter(
        (details) => details.id !== itemDetails
      );
      localStorage.setItem("favourite", JSON.stringify(localCopy));
      setFavouriteList((prevFavouriteList) =>
        prevFavouriteList.filter((details) => details.id !== itemDetails.id)
      );
    } else {
      const movie = {
        id: itemDetails.id,
        name: itemDetails.title
          ? itemDetails.title
          : itemDetails.original_title
          ? itemDetails.original_title
          : itemDetails.original_name,
        backdropPath: itemDetails.backdrop_path,
      };
      const localCopy = [...favouriteList, movie];
      localStorage.setItem("favourite", JSON.stringify(localCopy));

      setFavouriteList((prev) => {
        return [...prev, movie];
      });
    }
  };

  // console.log("context");
  // console.log(config);

  return (
    <ConfigContext.Provider value={config}>
      <WatchlistContext.Provider value={{ watchlist, handleWatchlist }}>
        <FavouriteListContext.Provider
          value={{ favouriteList, handleFavourite }}
        >
          <div className="bg-slate-800 min-h-screen text-white relative">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />
              <Route path="/movie/:id" exact component={MovieDetailsSection} />
              <Route path="/tv/:id" exact component={TVDetailsSection} />
            </Switch>
          </div>
        </FavouriteListContext.Provider>
      </WatchlistContext.Provider>
    </ConfigContext.Provider>
  );
}

export default App;
