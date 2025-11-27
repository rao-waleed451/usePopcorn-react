import { useEffect, useState } from "react";
import { Loader } from "./App";
import StarComponent from "./StarComponent";
import { useKey } from "./useKey";
export default function MovieDetails({
  onHandleCloseDetails,
  onIsSelected,
  onSelected,
  onAddWatchedMovies,
  tempWatchedData,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const isWatched = tempWatchedData.some((curr) => curr.imdbid === onSelected);
  const watchedUserRating = tempWatchedData.find(
    (movie) => movie.imdbid === onSelected
  )?.userRating;
  const [userRating, setUserRating] = useState(watchedUserRating || "");
  //  const isWatched=watched.map(movie=>movie.imdbID).includes(selectedId);
  const {
    Poster: poster,
    Title: title,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const key = "96acaafe";

  function HandleAdd() {
    let newWatchedMovie = {
      imdbid: onSelected,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ")[0]),
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
    };

    onHandleCloseDetails();
    onAddWatchedMovies(newWatchedMovie);
  }
    
  useKey("Escape",onHandleCloseDetails)
  useEffect(
    function () {
      async function WatchedMoviesDetail() {
        setLoading(true);
        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${onSelected}`
        );

        let data = await res.json();
        setLoading(false);
        setMovie(data);
      }
      WatchedMoviesDetail();
    },
    [onSelected]
  );

  useEffect(() => {
    if (!title) {
      return;
    }
    document.title = title;

    return function () {
      return (document.title = "usePopcorn");
    };
  }, [title]);

  return (
    <div className="movie-details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <span className="left-arrow" onClick={() => onHandleCloseDetails()}>
            ⬅
          </span>
          <div className="first">
            <div className="first-image">
              <img src={poster} alt={title}></img>
            </div>
            <div className="first-details">
              <h1>{title}</h1>
              <p>
                {released} * {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐ {imdbRating} IMDB rating</p>
            </div>
          </div>
          <div className="second">
            <div className="second-stars">
              {isWatched ? (
                <p>you rated this movie {watchedUserRating} stars</p>
              ) : (
                <>
                  {" "}
                  <StarComponent
                    size={30}
                    gap={5}
                    maxRating={10}
                    setUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      onClick={() => {
                        HandleAdd();
                      }}
                    >
                      Add to List
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="second-details">
              <p>{plot}</p>
              <p>{`Starring ${actors}`}</p>
              <p>{`Director ${director}`}</p>
              {userRating ? (
                <p>{`user rated ${watchedUserRating}`}</p>
              ) : (
                "user not rated yet"
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
