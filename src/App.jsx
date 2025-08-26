import { useState } from 'react'

function App() {
  // main logic

  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {

    if (!query.trim()) return;

    const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`);

    const data = await res.json()
    console.log(data);

    if (data.Search) {
      setMovies(data.Search)
    } else {
      setMovies([])
    }

  }


  return (
    <div className='min-h-screen bg-gray-900 text-white p-18'>
      <h1 className='text-3xl font-bold mb-12 text-center'>
        🎬Movie Explorer OMDb
      </h1>

      <div className='flex justify-center mb-16'>

        <input
          type="text"
          placeholder='Enter movie name...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchMovies();
            }
          }}
          className='px-4 py-2 w-150 rounded-l-md bg-blue-200 text-black outline-white-2'
        />
        <button
          className='rounded-r-md bg-blue-300 w-30 text-black hover:bg-blue-500'
          onClick={fetchMovies}
        >
          Search
        </button>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className='bg-gray-800 rounded-xl p-3 shadow hover:scale-105 transition'>

              <img src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              } alt={movie.Title}
                className='rounded-md mb-2'
              />
              <h2 className='text-lg font-semibold'>{movie.Title}</h2>
              <p className='text-sm text-gray-400'>{movie.Year}</p>

            </div>
          ))
        ) : (
          <p className='col-span-full text-center text-gray-400'>
            No movies found. Try searching something.
          </p>
        )}
      </div>
    </div>
  )

}

export default App
