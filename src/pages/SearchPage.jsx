import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("lastSearch");
        if (saved) {
            const { query, movies } = JSON.parse(saved);
            setQuery(query);
            setMovies(movies);
        }
    }, []);

    const fetchMovies = async () => {
        if (!query.trim()) return;
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`
        );
        const data = await res.json();
        const results = data.Search || [];
        setMovies(results)

        localStorage.setItem("lastSearch", JSON.stringify({ query, movies: results }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-12">
            <h1 className="text-3xl font-bold mb-12 text-center">🎬 Movie Explorer</h1>

            <div className="flex justify-center mb-18">
                <input
                    type="text"
                    placeholder="Enter movie name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
                    className="px-4 py-2 w-150 rounded-l-md bg-blue-200 text-black"
                />
                <button
                    className="rounded-r-md bg-violet-500 w-30 hover:bg-violet-700"
                    onClick={fetchMovies}
                >
                    Search
                </button>
            </div>
            <p className="text-sm text-gray-500 text-center mb-4">Your movies will appear below!</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Link
                            key={movie.imdbID}
                            to={`/movie/${movie.imdbID}`}
                            className="bg-gray-800 rounded-xl p-3 shadow hover:scale-105 transition block"
                        >
                            <img
                                src={
                                    movie.Poster !== "N/A"
                                        ? movie.Poster
                                        : "https://via.placeholder.com/300x450?text=No+Image"
                                }
                                alt={movie.Title}
                                className="rounded-md mb-2"
                            />
                            <h2 className="text-lg font-semibold">{movie.Title}</h2>
                            <p className="text-sm text-gray-400">{movie.Year}</p>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">
                        No movies found. Try searching something.
                    </p>
                )}
            </div>
        </div>
    );
}
