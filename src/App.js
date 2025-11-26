import Navbar from "./Navbar.js";
import Main  from "./Main.js";
import { useEffect, useState } from "react";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
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
];







const key = "96acaafe";

function App() {
  let [movies,setMovies]=useState([]);
  let [query,setQuery]=useState("");
  let [error,setError]=useState("");
  let [isLoading,setIsLoading]=useState(false);
  let [isSelected,setIsSelected]=useState(null);
  let [watchedMovies,setWatchedMovies]=useState([])

  function HandleAddWatchMovies(movie){
      setWatchedMovies((curr)=>[...curr,movie])
  }

  function HandleCloseDetails(){
    setIsSelected(null)
  
}

useEffect(function (){
  const controller=new AbortController();
  async function fetchMovies() {


    
   


      try{
        setIsLoading(true)
        setError("")
         const apiUrl = `https://www.omdbapi.com/?apikey=${key}&s=${query}`;
          // Wrap it with CORS proxy
    const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
    
    // Use the proxied URL
    let res = await fetch(proxiedUrl, { signal: controller.signal });
        //  let res=await fetch( `https://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal});
         if(res.status===500){
          throw new Error("cors error")
         }
       if(!res.ok){
           throw new Error("unable to fetch movies")
       }
       let data= await res.json();
       setIsLoading(false)
       
       if(data.Response==="False"){
            throw new Error("Movie not found")
       }
       setMovies(data.Search)
      }catch(err){
            setError(err.message); 
      }finally{
         setIsLoading(false)
      }

  }
  if(query.length<3){
    setMovies([]);
    setError("");
    return
  }
  HandleCloseDetails()
  fetchMovies()
 
 
},[query])



  
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
