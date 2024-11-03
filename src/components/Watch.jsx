const Watch = (props) => {
  const movieId = props.match.params.id;
  // src={`https://vidsrc.rip/embed/movie/${movieId}`}
  return (
    <div className="container max-w-screen-xl mx-auto">
      <iframe
        src={`https://player.autoembed.cc/embed/movie/${movieId}`}
        className="w-full aspect-video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Watch;
