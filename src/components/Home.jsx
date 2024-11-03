// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import { useSelector } from "react-redux";
// import Slider from "react-slick";
// import Popular from "./Popular";
import HomeHeroSection from "./HomeHeroSection";
import PopularMovies from "./PopularMovies";
import TopRatedTV from "./TopRatedTV";
import TrendingMovies from "./TrendingMovies";
import TrendingTv from "./TrendingTv";

// let settings = {
//   infinite: true,
//   speed: 500,
//   autoplay: true,
//   autoplaySpeed: 1500,
//   pauseOnHover: true,
//   slidesToShow: 6,
//   arrows: false,

//   initialSlide: 1,
//   adaptiveHeight: true,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 6,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 1000,
//       settings: {
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };
//previously considered using below, but too much work
// {/* <Slider
//   {...settings}
//   style={{ height: 300 }}
//   className=" flex justify-center items-center"
// >
//   {trending.results.map((trendingMovie) => {
//     {
//       /* console.log(
//               `${config.secure_base_url}${config.images.poster_sizes[5]}${trendingMovie.poster_path}`
//             ); */
//     }
//     return (
//       <li
//         key={trendingMovie.id}
//         style={{ width: 200, height: 300 }}
//         className="group"
//       >
//         <Link to={`/watch/${trendingMovie.id}`} className="relative">
//           <img
//             src={`${config.images.secure_base_url}${config.images.poster_sizes[3]}${trendingMovie.poster_path}`}
//             className="group-hover:scale-105 group-hover:opacity-75  object-cover w-[160px] md:w-[230px] "
//           />
//           <div className="absolute bottom-0 opacity-0 group-hover:block group-hover:opacity-100 group-hover:backdrop-blur-sm h-10 w-full ">
//             <p className="text-white text-lg text-center">
//               {trendingMovie.title}
//             </p>
//           </div>
//         </Link>
//       </li>
//     );
//   })}
// </Slider>; */}

//useful in controlling scrollbar css in chrome as firefox shows it good
// {    [&::-webkit-scrollbar]:w-2
//          [&::-webkit-scrollbar-track]:rounded-full
//   [&::-webkit-scrollbar-track]:bg-gray-100
//   [&::-webkit-scrollbar-thumb]:bg-gray-300
//   dark:[&::-webkit-scrollbar-track]:bg-neutral-700
//   dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500}

//previously used this to get config, but later used redux to create a store
// for this and for accessing it everywhere and called api in App.jsx
// const getConfig = async () => {
//   const options = {
//     method: "GET",
//     url: "https://api.themoviedb.org/3/configuration",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE2NjQwNy41NDkzNzYsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qc0sMCzGJ7GJ6V7Dm88-rKU9PlKF72NnSEifMra4R_s",
//     },
//   };

//   const response = await axios.request(options);
//   console.log(response.data);
//   setConfig(response.data);
// };

const Home = () => {
  return (
    <>
      <HomeHeroSection />
      <TrendingMovies />
      <PopularMovies />
      <TrendingTv />
      <TopRatedTV />
    </>
  );
};

export default Home;
