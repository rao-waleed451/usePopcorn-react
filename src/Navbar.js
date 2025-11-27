import { useEffect, useRef } from "react"
import { useKey } from "./useKey"
export default function Navbar({movieData,onQuery,query}){
     return (
      <div className="navbar">
         <Logo />
         <Search onQuery={onQuery} query={query} />
         <Results movieData={movieData}/>
      </div>
     )
}

function Logo(){
  return (
    <div className="logo">
      <span>🍿</span> <h1>usePopcorn</h1>
    </div>
  )
}


function Search({onQuery,query}){
  let inputEl=useRef(null)
  useKey("Enter",function(){
    if(inputEl.current===document.activeElement){
          return
       } 
       onQuery("")
  })
  // useEffect(function(){
  //   function callback(e){
  //      if(inputEl.current===document.activeElement){
  //         return
  //      } 
  //     if(e.code==="Enter"){
  //        onQuery("")
  //     }
  //   }
  //   document.addEventListener("keydown",callback)

  //   return ()=> document.removeEventListener("keydown",callback)
  // },[query,onQuery])
  return (
    <div className="search">
      <input ref={inputEl} value={query} placeholder="Search movies..." onChange={(e)=> onQuery(e.target.value)}></input>
    </div>
  )
}

function Results({movieData}){
  return(
    <div className="results">
      <p>Found {movieData?.length||0} Results</p>
    </div>
  )
}
