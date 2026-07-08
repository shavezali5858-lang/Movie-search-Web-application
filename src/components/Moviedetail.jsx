import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import  axios  from 'axios';
import { useNavigate} from "react-router-dom"


const Moviedetail = () => {


   const navigate=useNavigate()

const {id}=useParams();
const [movie, setmovie] = useState(null)

useEffect(()=>{
const moviedetails = async () => {
    const response=await axios.get( `https://api.themoviedb.org/3/movie/${id}?api_key=b0d62027482f5f758e7425314442a778`)
setmovie(response.data)



}
moviedetails();

},[id])
if (!movie) {
  return <h1>Loading...</h1>;
}

  







  return (
  <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black text-white p-10">
      
      <button
        onClick={() => navigate("/")}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg mb-10"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-80 rounded-xl shadow-xl"
        />

        <div>
          <h1 className="text-5xl font-bold mb-4">
            {movie.title}
          </h1>

          <p className="text-gray-400 italic mb-6">
            {movie.tagline}
          </p>

          <div className="flex flex-wrap gap-6 mb-6">
            <p>⭐ Rating: {movie.vote_average?.toFixed(1)}</p>
            <p>📅 Release: {movie.release_date}</p>
            <p>⏱️ Runtime: {movie.runtime} min</p>
            <p>💰 Budget: ${movie.budget.toLocaleString()}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-3">
            Overview
          </h2>

          <p className="text-gray-300 leading-8 mb-8">
            {movie.overview}
          </p>

          <h2 className="text-2xl font-semibold mb-3">
            Genres
          </h2>

          <div className="flex gap-3 flex-wrap">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-red-600 px-4 py-2 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>










 
  
  )
}

export default Moviedetail
