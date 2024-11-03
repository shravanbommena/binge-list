/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ConfigContext } from "../../context/context";

const noImageFound =
  "https://img.freepik.com/free-vector/gradient-no-photo-sign-design_23-2149292668.jpg?t=st=1726573321~exp=1726576921~hmac=8c85ffb731c456ef4b59d55d4d37587178074b342f1496a1b4fa909442cde57f&w=826";

const HomeSlider = (props) => {
  const { title, data } = props;
  const config = useContext(ConfigContext);

  // console.log(config);
  console.log(data.results);

  // const linkPath =
  //   data.media_type === "tv" ? `/tv/${data.id}` : `/movie/${data.id}`;

  // console.log(linkPath);

  return (
    <div className="container mx-auto py-4 px-1">
      <h2 className="text-2xl text-white font-bold ">{title}</h2>
      <ul className="container h-[350px] my-4 flex gap-2 overflow-x-auto">
        {data.results === undefined && (
          <div className="w-full h-full animate-pulse"></div>
        )}
        {"results" in data &&
          data.results.map((data) => {
            const posterPath =
              data.poster_path !== undefined
                ? `${config.images.secure_base_url}${config.images.poster_sizes[3]}${data.poster_path}`
                : noImageFound;

            return (
              <li key={data.id} className="group min-w-56 overflow-hidden">
                <Link
                  to={
                    data.media_type === "tv"
                      ? `/tv/${data.id}`
                      : `/movie/${data.id}`
                  }
                  className="relative"
                >
                  <img
                    src={posterPath}
                    className="group-hover:scale-105 group-hover:opacity-75 object-cover rounded-md "
                  />
                  <div className="absolute bottom-0 opacity-0 group-hover:block group-hover:opacity-100 group-hover:backdrop-blur-sm h-10 w-full ">
                    <p className="text-white text-lg text-center">
                      {data.title}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default HomeSlider;
