import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

import { useNavigate } from "react-router-dom";


const Home = () => {

 const [value, setvalue] = useState('')
      const [data, setdata] = useState([])
      const [issearching, setissearching] = useState(false)


const Trendingmovie= async()=>{
  const response= await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b0d62027482f5f758e7425314442a778')
setdata(response.data.results)
setissearching(false);

}
useEffect(()=>{
  Trendingmovie()
},[]);






      const getdata= async () =>{
        const response= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b0d62027482f5f758e7425314442a778&query=${value}`)
        console.log(response.data.results)
        setdata(response.data.results)
      
        setvalue('')
        setissearching(true)
      }
     

   const navigate= useNavigate()










  return (
     <div className='min-h-screen bg-gradient-to-b from-black via-red-950 to-black text-white'>

            <div className='h-25 bg-zinc-900 p-4 flex items-centre justify-between mb-8'>
               <h1 className='font-bold text-red-600 mt-10 ml-10  text-3xl font-serif '>MOVIEHUB</h1>

              <div className='flex justify-between items-centre mb-10 '>
             
            <input type="text"
             placeholder='search any movie' 
             className='w-120 h-10 bg-zinc-800 text-white border-zinc-700 rounded-xl ml-10 mt-10 px-3 py-2'
             value={value}
             onChange={(e)=>{
              setvalue(e.target.value)
             }}
            
            
            />
      
            
            <button className='bg-red-600 hover:bg-red-700 w-40 h-10 px-3 py-2 rounded-xl ml-15 mt-10' onClick={getdata}>SEARCH</button>
            </div>
          </div>


          <h1 className='text-white font-bold ml-10 mt-10 text-2xl'>
            {issearching ? "Search Results" : "Trending Movies"}
            </h1>

      <div className='grid grid-cols-4 gap-6 rounded-2xl mt-20 ml-15 '>
      {data.map(function(movie){
       return( 
       <div key={movie.id}
       onClick={()=>{
        navigate(`/movie/${movie.id}`)
       }}
        className=' shadow-lg transition-all duration-300 hover:-translate-y-2'>
        <img  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
        className='w-full h-80 object-contain'
         />
      <div className='p-5 flex gap-5 mb-3'>
        <h3 className='font-semibold text-gray-500  '> ratings: {movie.vote_average.toFixed(1)}</h3>
        <h2 className='font-semibold text-gray-500'> Language: {movie.original_language}</h2>
       
        </div>
      
        <div className='p-3 mb-5'>
          <h1 className='font-bold text-2xl'>{movie.title}</h1>
          <h2 className='font-bold text-grey-500 '>{movie.release_date}</h2>
          <h2>{movie.overview.slice(0,130)}</h2>
         </div>
        
          </div>
       )
      })}
      </div>
      
      
          </div>
    
  )
}

export default Home

