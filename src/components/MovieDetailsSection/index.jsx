/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa6";
import {
  MdBookmarkBorder,
  MdBookmark,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import Recommendations from "../Recommendations";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { IoStar } from "react-icons/io5";
import {
  ConfigContext,
  WatchlistContext,
  FavouriteListContext,
} from "../../context/context";

//Todo
// - add cast section
// - add keywords section

//Testing
// - previously icon size was h-8

// transient props for styled components
// use $bgimage here and in jsx <BgDiv $bgimage=''></BgDiv>
//otherwise you will get a log in console "styled-components.js?v=fb1a9cc1:1203 styled-components: it looks like an unknown prop "bgimage" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)"

const BgDiv = styled.div`
  background-image: url(${(props) => props.$bgimage});
  background-size: cover;
`;

const noImageFound =
  "https://img.freepik.com/free-vector/gradient-no-photo-sign-design_23-2149292668.jpg?t=st=1726573321~exp=1726576921~hmac=8c85ffb731c456ef4b59d55d4d37587178074b342f1496a1b4fa909442cde57f&w=826";

const MovieDetailsSection = (props) => {
  const movieId = props.match.params.id;
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideos, setMovieVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imdbData, setImdbData] = useState({});
  const config = useContext(ConfigContext);
  const { watchlist, handleWatchlist } = useContext(WatchlistContext);
  const { favouriteList, handleFavourite } = useContext(FavouriteListContext);

  const getImdbMovieRating = async (id) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=ede06c98`
    );
    console.log("imdb");

    console.log(response.data);
    setImdbData(response.data);
  };

  const getMovieDetails = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE4Njk3MC42MDY4NDcsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEiRl7DXprt0KH5d4IbL3EsQ3qpyNsA3e4A2x5PL4vU",
      },
    };
    const response = await axios.request(options);

    console.log("movie details");

    console.log(response.data);
    setMovieDetails(response.data);
    getImdbMovieRating(response.data.imdb_id);
  };
  const getMovieVideos = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE4Njk3MC42MDY4NDcsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEiRl7DXprt0KH5d4IbL3EsQ3qpyNsA3e4A2x5PL4vU",
      },
    };
    const response = await axios.request(options);
    console.log("videos");
    console.log(response.data);

    setMovieVideos(response.data.results);
  };

  const isItInWatchlist = watchlist.some(
    (details) => details.id === movieDetails.id
  );

  const handleWatchlistButton = () => {
    handleWatchlist(isItInWatchlist, movieDetails);
  };

  const isItInFavouriteList = favouriteList.some(
    (details) => details.id === movieDetails.id
  );

  const handleFavouriteButton = () => {
    handleFavourite(isItInFavouriteList, movieDetails);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
  }, [location]);

  const posterPath =
    movieDetails.poster_path !== undefined
      ? `${config.images.secure_base_url}${config.images.poster_sizes[3]}${movieDetails.poster_path}`
      : noImageFound;

  // console.log(posterPath);

  const officialTrailerDetails = movieVideos.find((video) => {
    return video.name.includes("Official Trailer");
  });

  // console.log(officialTrailerDetails);
  const genresText =
    movieDetails.genres &&
    movieDetails.genres.reduce(
      (previous, current, index) => {
        if (index === 0) {
          return previous + current.name;
        }
        return previous + " , " + current.name;
      },

      ""
    );
  // console.log(genresText);

  return (
    <>
      {showModal && (
        <div className="absolute top-0 z-20 pt-14 md:pt-20 h-screen w-screen bg-slate-700/70 flex flex-col justify-center items-center">
          <div className="w-full max-w-3xl bg-slate-950/70">
            <div className="w-full max-w-3xl flex justify-between px-6 py-3">
              <h4>Trailer</h4>
              <button
                className="bg-transparent text-lg"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                x
              </button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${officialTrailerDetails.key}`}
              className="w-full max-w-3xl aspect-video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      {/* Main details with bg image */}
      <div className="pt-14 md:pt-20 min-h-screen">
        {"id" in movieDetails && (
          <BgDiv
            $bgimage={
              `${config.images.secure_base_url}${config.images.backdrop_sizes[3]}${movieDetails.backdrop_path}` ||
              ""
            }
            className="min-h-[80vh] w-screen bg-center relative"
          >
            <div className="absolute top-0 w-full h-full bg-slate-950 opacity-40"></div>
            {/* details */}
            <div className="w-full h-full container mx-auto flex flex-col md:flex-row backdrop-blur-sm py-9">
              <div className="h-full min-h-[80vh] flex justify-center md:flex-col md:justify-start pt-4">
                <img
                  src={posterPath}
                  className="h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-4 space-y-1">
                <div className="flex space-x-2">
                  {/* title */}

                  <h3 className=" text-slate-100 text-2xl font-bold">
                    {movieDetails.title
                      ? movieDetails.title
                      : movieDetails.original_title
                      ? movieDetails.original_title
                      : movieDetails.original_name}
                  </h3>
                  <h3 className=" text-slate-400 text-2xl font-semibold">
                    ({movieDetails.release_date.split("-")[0]})
                  </h3>
                </div>

                {/* IMDB Rating */}
                <div className="my-1 space-x-1 text-lg  font-medium flex items-center">
                  <IoStar className="text-yellow-500 text-xl " />
                  <span>{imdbData.imdbRating || "N/A"}</span>
                  <span>/</span>
                  <span>10</span>
                </div>
                {/* Overview */}
                <div className="flex flex-col max-w-lg ">
                  <h4 className="font-bold">Overview:</h4>
                  <p>{movieDetails.overview}</p>
                </div>
                <div className="flex">
                  <h4 className="font-bold mr-2">Genres :</h4>
                  <p>{genresText}</p>
                </div>
                <div className="flex space-x-1">
                  <h4 className="font-bold">Release Date :</h4>

                  <p>{movieDetails.release_date}</p>
                </div>
                <div className="flex space-x-2">
                  <div className="flex space-x-2">
                    <button
                      className="size-12 rounded-full bg-slate-800/70 flex justify-center items-center"
                      onClick={handleWatchlistButton}
                    >
                      {isItInWatchlist ? (
                        <MdBookmark className="text-2xl" />
                      ) : (
                        <MdBookmarkBorder className="text-2xl" />
                      )}
                    </button>
                    <button
                      className="size-12 rounded-full bg-slate-800/70 flex justify-center items-center"
                      onClick={handleFavouriteButton}
                    >
                      {isItInFavouriteList ? (
                        <MdFavorite className="text-2xl text-red-500" />
                      ) : (
                        <MdFavoriteBorder className="text-2xl" />
                      )}
                    </button>
                  </div>
                  {officialTrailerDetails && (
                    <div>
                      <button
                        className="bg-slate-800/70 flex justify-center items-center h-12 w-36 text-lg font-bold rounded-md"
                        onClick={() => {
                          <div className="pt-14 md:pt-20 h-screen bg-slate-700/10 flex justify-center items-center"></div>;
                          setShowModal(true);
                        }}
                      >
                        <FaPlay className="mr-2" />
                        Play Trailer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </BgDiv>
        )}
      </div>
      <div>
        {"id" in movieDetails && <Recommendations id={movieDetails.id} />}
      </div>
    </>
  );
};

export default MovieDetailsSection;
