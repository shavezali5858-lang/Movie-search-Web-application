import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [value, setvalue] = useState('')
  const [data, setdata] = useState([])
  const [issearching, setissearching] = useState(false)

  const Trendingmovie = async () => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=b0d62027482f5f758e7425314442a778'
    )

    setdata(response.data.results)
    setissearching(false)
  }

  useEffect(() => {
    Trendingmovie()
  }, [])

  const getdata = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=b0d62027482f5f758e7425314442a778&query=${value}`
    )

    console.log(response.data.results)
    setdata(response.data.results)

    setvalue('')
    setissearching(true)
  }

  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gradient-to-b from-black via-red-950 to-black text-white px-4 sm:px-6 lg:px-10'>

      {/* HEADER */}
      <div className='min-h-25 bg-zinc-900 p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8'>

        <h1 className='font-bold text-red-600 text-2xl sm:text-3xl font-serif text-center lg:text-left'>
          MOVIEHUB
        </h1>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 w-full lg:w-auto'>

          <input
            type="text"
            placeholder='search any movie'
            className='w-full sm:w-80 md:w-100 lg:w-120 h-10 bg-zinc-800 text-white border border-zinc-700 rounded-xl px-3 py-2'
            value={value}
            onChange={(e) => {
              setvalue(e.target.value)
            }}
          />

          <button
            className='bg-red-600 hover:bg-red-700 w-full sm:w-32 h-10 px-3 py-2 rounded-xl'
            onClick={getdata}
          >
            SEARCH
          </button>

        </div>
      </div>


      {/* HEADING */}
      <h1 className='text-white font-bold mt-8 sm:mt-10 text-xl sm:text-2xl'>
        {issearching ? "Search Results" : "Trending Movies"}
      </h1>


      {/* MOVIE GRID */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 sm:mt-16 mb-10'>

        {data.map(function (movie) {

          return (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movie/${movie.id}`)
              }}
              className='shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-black/20 rounded-xl overflow-hidden'
            >

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-full h-80 sm:h-96 object-contain'
              />

              {/* MOVIE INFO */}
              <div className='p-4 flex flex-col sm:flex-row sm:justify-between gap-2'>
                <h3 className='font-semibold text-gray-400'>
                  Ratings: {movie.vote_average.toFixed(1)}
                </h3>

                <h2 className='font-semibold text-gray-400'>
                  Language: {movie.original_language}
                </h2>
              </div>

              <div className='p-4'>
                <h1 className='font-bold text-xl sm:text-2xl'>
                  {movie.title}
                </h1>

                <h2 className='font-bold text-gray-500 mt-2'>
                  {movie.release_date}
                </h2>

                <p className='mt-2 text-gray-300'>
                  {movie.overview.slice(0, 130)}
                </p>
              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Home