import { useState } from "react";
import { Loader } from "./App";
import { ErrorMessage } from "./App";
import MovieDetails from "./MovieDetails";

export default function Main({
  movieData,
  tempWatchedData,
  onLoading,
  error,
  onIsSelected,
  selected,
  onHandleCloseDetails,
  onAddWatchedMovies,
  onSetWatchedMovies,
})
   
{
  return (
    <div className="main">
      <Box>
        {onLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!onLoading && !error && (
          <MoviesList movieData={movieData} onIsSelected={onIsSelected} />
        )}
      </Box>
      <Box>
        {selected ? (
          <MovieDetails
            onHandleCloseDetails={onHandleCloseDetails}
            onIsSelected={onIsSelected}
            onSelected={selected}
            key={selected}
            onAddWatchedMovies={onAddWatchedMovies}
            tempWatchedData={tempWatchedData}
          />
        ) : (
          <>
            <WatchedSummary watchedMovies={tempWatchedData} />
            <WatchedMovies watchedMovies={tempWatchedData} onIsSelected={onIsSelected} selected={selected} onSetWatchedMovies={onSetWatchedMovies} />
          </>
        )}
      </Box>
    </div>
  );
}




///// here is the content of box 1

function Box({ children }) {
  let [isopen, setIsopen] = useState(true);
  return (
    <div className="box">
      <span className="span" onClick={() => setIsopen((curr) => !curr)}>
        {isopen ? "-" : "+"}
      </span>
      <div className="box-child">{isopen ? children : ""}</div>
    </div>
  );
}

function MoviesList({ movieData, onIsSelected }) {
  return (
    <div className="movieList">
      {movieData.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onIsSelected={onIsSelected}>
          <>
            <h1>{movie.Title}</h1>
            <p>{`${"📄"} ${movie.Year}`}</p>
          </>{" "}
        </Movie>
      ))}
    </div>
  );
}

function Movie({ movie, children, onIsSelected }) {
  return (
    <div
      className="movie"
      onClick={() =>
        onIsSelected((curr) => (curr === movie.imdbID ? null : movie.imdbID))
      }
    >
      <img src={movie.Poster} alt={movie.Title} />
      <div>{children}</div>
    </div>
  );
}

//// here is the content of box 2

function average(data) {
  let sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
}

function WatchedSummary({ watchedMovies }) {
  let avgImdbRating = average(
    watchedMovies.map((watched) => watched.imdbRating)
  );
  let avgUserRating = average(
    watchedMovies.map((watched) => watched.userRating)
  );
  let avgRuntime = average(watchedMovies.map((watched) => watched.runtime));

  return (
    <div className="movie-summary" >
     
      <p>Movies you Watched</p>
      <div className="items">
        <p>🎦{watchedMovies.length <= 0 ? "0" : watchedMovies.length} Movies</p>
        <p>⭐ {watchedMovies.length <= 0 ? "0" : avgImdbRating.toFixed(2)}</p>
        <p>
          🌟 {watchedMovies.length <= 0 ? "0" : `${avgUserRating.toFixed(2)}`}
        </p>
        <p> ⏰{watchedMovies.length <= 0 ? "0" : `${avgRuntime.toFixed(1)} min`}</p>
      </div>
    </div>
  );
}

function HandleDeleteWatchedMovie(id,onSetWatchedMovies){
      onSetWatchedMovies((curr)=>curr.filter((curr)=>curr.imdbid!==id))
        //  setWatched(watched=> watched.filter((movie)=> movie.imdbID!==id))
}

function WatchedMovies({ watchedMovies,onIsSelected ,selected,onSetWatchedMovies}) {
  return (
    <div>
      {watchedMovies.map((watched) => (
        <Movie key={watched.imdbid} movie={watched} onIsSelected={onIsSelected}>
          <>
            <div className="watched-movies" style={{position:"relative"}}>
               <span style={{position:"absolute",top:"20px",right:"0px", fontSize:"30px"}} onClick={()=>{HandleDeleteWatchedMovie(watched.imdbid,onSetWatchedMovies)}}>❌</span>
              <div > 
                <img src={watched.poster} alt={watched.title}></img>
              </div>
              <div>
                <h1>{watched.title}</h1>
                <div className="items">
                  <p>⭐ {watched.imdbRating}</p>
                  <p>🌟 {watched.userRating}</p>
                  <p> ⏰{watched.runtime}</p>
                </div>
              </div>
            </div>
          </>
        </Movie>
      ))}
    </div>
  );
}
