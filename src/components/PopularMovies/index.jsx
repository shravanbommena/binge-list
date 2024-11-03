import axios from "axios";
import { useEffect, useState } from "react";
import HomeSlider from "../HomeSlider";

const PopularMovies = () => {
  const [popularData, setPopularData] = useState({});

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
    setPopularData((prev) => ({ ...prev, ...response.data }));
  };

  useEffect(() => {
    getPopularData();
  }, []);

  return <HomeSlider data={popularData} title={"Popular Movies"} />;
};

export default PopularMovies;
