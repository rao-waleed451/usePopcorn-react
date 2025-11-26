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
  return (
    <div className="search">
      <input value={query} placeholder="Search movies..." onChange={(e)=> onQuery(e.target.value)}></input>
    </div>
  )
}

function Results({movieData}){
  return(
    <div className="results">
      <p>Found {movieData.length<=0?"__":movieData.length} Results</p>
    </div>
  )
}
