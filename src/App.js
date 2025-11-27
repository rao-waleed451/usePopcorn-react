import Navbar from "./Navbar.js";
import Main  from "./Main.js";
import { useEffect, useState } from "react";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";


// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
  // {
  //   imdbID: "tt1375666",
  //   Title: "Inception",
  //   Year: "2010",
  //   Poster:
  //     "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //   runtime: 148,
  //   imdbRating: 8.8,
  //   userRating: 10,
  // },
  // {
  //   imdbID: "tt0088763",
  //   Title: "Back to the Future",
  //   Year: "1985",
  //   Poster:
  //     "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  //   runtime: 116,
  //   imdbRating: 8.5,
  //   userRating: 9,
  // },
// ];







const key = "96acaafe";

function App() {
  
  let [query,setQuery]=useState("");
  
  let [isSelected,setIsSelected]=useState(null);
  let [watchedMovies,setWatchedMovies]=useLocalStorageState([],"watched")

  function HandleAddWatchMovies(movie){
      setWatchedMovies((curr)=>[...curr,movie])
  }
 

  function HandleCloseDetails(){
    setIsSelected(null)
  
}


 let [movies,error,isLoading]= useMovies(key,query)


  
  return (
    <div className="app">
        <Navbar movieData={movies} onQuery={setQuery} query={query} />
        <Main  movieData={movies}  tempWatchedData={watchedMovies} onLoading={isLoading} error={error} onIsSelected={setIsSelected} selected={isSelected} onHandleCloseDetails={HandleCloseDetails} onAddWatchedMovies={HandleAddWatchMovies} onSetWatchedMovies={setWatchedMovies} />
    </div>
  );
}


function ErrorMessage({message}){
     return (
      <div className="Error">
        <p>💥</p>{message}
      </div>
     )
}





export {ErrorMessage}


function Loader(){
  return(
    <div className="loader">
      Loader...
    </div>
  )
}

export {Loader}







export default App;
