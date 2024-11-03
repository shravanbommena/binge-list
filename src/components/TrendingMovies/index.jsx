import axios from "axios";
import { useEffect, useState } from "react";
import HomeSlider from "../HomeSlider";

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);

  const getTrendingMovies = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE2NjQwNy41NDkzNzYsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qc0sMCzGJ7GJ6V7Dm88-rKU9PlKF72NnSEifMra4R_s",
      },
    };

    const response = await axios.request(options);
    // console.log(response.data);
    setTrending(response.data);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return <HomeSlider data={trending} title={"Trending Movies"} />;
};

export default TrendingMovies;
