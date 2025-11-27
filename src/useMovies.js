import { useEffect,useState } from "react";

export function useMovies(key,query){
let [movies,setMovies]=useState([])
  let [error,setError]=useState("");
  let [isLoading,setIsLoading]=useState(false);
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
//   HandleCloseDetails()
  fetchMovies()
 
 
},[query,key])


return [movies,error,isLoading]
}