/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { FcSearch } from "react-icons/fc";
import { ConfigContext } from "../context/context";

const apiStatusConstants = {
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};

const noImageFound =
  "https://img.freepik.com/free-vector/gradient-no-photo-sign-design_23-2149292668.jpg?t=st=1726573321~exp=1726576921~hmac=8c85ffb731c456ef4b59d55d4d37587178074b342f1496a1b4fa909442cde57f&w=826";

const Search = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.success);
  const [searchInput, setSearchInput] = useState("");
  const [popularData, setPopularData] = useState({});
  const config = useContext(ConfigContext);

  const [searchResults, setSearchResults] = useState({});
  const getSearchData = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/multi?query=${searchInput}&include_adult=false&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTIwYmEyMjRhZDQ3NTAyZTY4NGI0MzRiZGVmZTNmZiIsIm5iZiI6MTcyNTE4Njk3MC42MDY4NDcsInN1YiI6IjY1MDAwNDJlNmEyMjI3MDExYTdhODBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEiRl7DXprt0KH5d4IbL3EsQ3qpyNsA3e4A2x5PL4vU",
      },
    };
    const response = await axios.request(options);
    console.log(response.data);
    setSearchResults(response.data);
    setApiStatus(apiStatusConstants.success);
  };

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

  // get popular data effect hook
  useEffect(() => {
    getPopularData();
  }, []);

  // useEffect(() => {
  //   // console.log(search);

  //   getSearchData();
  // }, []);

  const handleSearchClick = () => {
    getSearchData();
  };

  const renderResults = () => (
    <div>
      <h2>
        Found {searchResults.total_results} results for {searchInput}
        {console.log(searchResults.total_results)}
      </h2>
      <ul className="flex flex-wrap gap-2  mx-auto  ">
        {searchResults.results.map((result) => {
          const posterPath = result.poster_path
            ? `${config.images.secure_base_url}${config.images.poster_sizes[3]}${result.poster_path}`
            : noImageFound;
          {
            /* console.log(result.original_title);
          console.log(result.original_name);
          console.log(result["original_title"] && ""); */
          }
          return (
            <li key={result.id} className="w-60">
              <Link to={`/movie/${result.id}`}>
                <img className="h-96 w-60 object-cover" src={posterPath} />
                {result.title
                  ? result.title
                  : result.original_title
                  ? result.original_title
                  : result.original_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderResults();
    }
  };

  const renderPopularContent = () => {
    return (
      <div>
        <h2>Popular</h2>
        <ul className="flex flex-wrap gap-2  mx-auto place-content-center">
          {"results" in popularData &&
            popularData.results.map((data) => {
              console.log(data.poster_path);
              const posterPath =
                data.poster_path !== undefined
                  ? `${config.images.secure_base_url}${config.images.poster_sizes[3]}${data.poster_path}`
                  : noImageFound;
              console.log(posterPath);
              return (
                <li key={data.id} className="max-w-64 grow-1">
                  <Link to={`/watch/${data.id}`}>
                    <img src={posterPath} />
                    <p>{data.title}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mx-auto pt-14 md:pt-20">
      <div className="flex justify-center items-center ">
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="w-36 shrink bg-slate-500"
        />
        <button type="button" onClick={handleSearchClick}>
          <FcSearch />
        </button>
      </div>
      {"results" in searchResults ? renderContent() : renderPopularContent()}
    </div>
  );
};

export default Search;
