import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}&plot=full`
            );
            const data = await res.json();
            setMovie(data);
            console.log(data);

        };
        fetchMovie();
    }, [id]);

    if (!movie) return <p className="p-6 min-h-screen bg-gray-900 flex justify-center text-white text-xl items-center">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
                ← Back
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-auto rounded"
                />

                <div>
                    <h1 className="text-4xl font-bold text-center mb-3">{movie.Title}</h1>
                    <p className="opacity-80 text-center">{movie.Year} • {movie.Genre}</p>
                    <h2 className="mt-2"><span className="font-semibold">Director:</span>  {movie.Director}</h2>
                    <p className="mt-4">{movie.Plot}</p>
                    <p className="mt-2 text-sm text-gray-200"><span className="font-semibold">Actors:</span> {movie.Actors}</p>
                    <p className="mt-3 "><span className="font-semibold">Box Office:</span> {movie.BoxOffice}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {movie.Ratings && movie.Ratings.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Ratings</h3>
                                <ul className="mt-2 space-y-1">
                                    {movie.Ratings.map((r, idx) => (
                                        <li key={idx} className="text-sm text-gray-300">
                                            {r.Source}: <span className="font-semibold">{r.Value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
