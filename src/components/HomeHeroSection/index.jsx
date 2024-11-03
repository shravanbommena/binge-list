import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ConfigContext } from "../../context/context";

const HomeHeroSection = () => {
  // const { history } = props;
  const config = useContext(ConfigContext);
  const [popular, setPopular] = useState([]);
  const [currentHeroSlideNo, setCurrentHeroSlideNo] = useState(0);

  const handlePreviousSlideButton = () => {
    const newSlideNo = currentHeroSlideNo === 0 ? 19 : currentHeroSlideNo - 1;
    setCurrentHeroSlideNo(newSlideNo);
  };

  const handleNextSlideButton = () => {
    const newSlideNo = currentHeroSlideNo === 19 ? 0 : currentHeroSlideNo + 1;
    setCurrentHeroSlideNo(newSlideNo);
  };

  // const handleMoreDetailsButton = () => {
  //   // console.log(history);

  //   history.push(`/movies/${popular.results[currentHeroSlideNo].id}`);
  // };

  const getPopularData = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE4Njk3MC42MDY4NDcsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEiRl7DXprt0KH5d4IbL3EsQ3qpyNsA3e4A2x5PL4vU",
      },
    };

    const response = await axios.request(options);
    setPopular(response.data);
    // console.log("popular", response.data);
  };

  useEffect(() => {
    getPopularData();
  }, []);

  return (
    <div className="h-screen max-w-screen max-h-screen bg-fixed">
      {/* previous and next buttons for hero section */}
      <div className="absolute top-0 h-screen  w-full flex justify-between z-50">
        <button
          type="button"
          className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          onClick={handlePreviousSlideButton}
        >
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 z-50"
          onClick={handleNextSlideButton}
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </button>
      </div>
      {/* loads hero section images with their details */}
      {/* {popular.results === undefined && (
        <div className="absoulte top-0 h-screen w-full animate-pulse"></div>
      )} */}
      {popular.results && (
        <div className="relative h-screen">
          <img
            src={`${config.images.secure_base_url}${config.images.backdrop_sizes[3]}${popular.results[currentHeroSlideNo].backdrop_path}`}
            className="w-full h-screen max-h-screen 
             object-cover"
          />
          <div className="absolute top-0 w-full h-full bg-slate-900 opacity-30"></div>
          <div className="absolute top-0 flex items-end h-full w-full  z-20">
            <div className="mx-5 md:mx-10 mb-5 md:mb-10 z-20 border border-slate-700 backdrop-blur-sm  p-2 md:p-4 rounded-lg max-w-xl relative">
              <h2 className="text-lg md:text-3xl mb-1 md:mb-2">
                {popular.results[currentHeroSlideNo].title
                  ? popular.results[currentHeroSlideNo].title
                  : popular.results[currentHeroSlideNo].original_title}
              </h2>
              <p className="text-slate-200 md:text-slate-300 text-sm md:text-base">
                {popular.results[currentHeroSlideNo].overview}
              </p>
              {/* <button
                type="button"
                className="mt-2 h-10 w-36 bg-slate-800/70 rounded cursor-pointer relative z-[60]"
                onClick={handleMoreDetailsButton}
              >
                More Details
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeHeroSection;
