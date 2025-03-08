import React, { useState, useEffect } from 'react'
import Search from "./components/Search";
import BrandLogo from "./components/BrandLogo";
import PreLoader from './components/PreLoader';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  let [hasInclAdult, refineHasInclAdult] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  const fetchMovies = async (query = '', filter = '') =>{
    // debugger;
    setIsLoading(true);
    setErrorMessage('');
    try{
      let endPoint = '';

      if(query && hasInclAdult){
        hasInclAdult = (hasInclAdult == 'on') ? true : false;
        endPoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=${hasInclAdult}`;
      }else if(query && !hasInclAdult){
        endPoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
      }else{
        endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      }
      
      const response = await fetch(endPoint, API_OPTIONS);
      if(!response.ok){
        throw new Error('Error in fetching movies');
      }

      const data = await response.json();
      //console.log(data);
      if(data.response === 'false'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results || []);
    }catch(error){
      console.error(`Error in fetching movies: ${error}`);
      setErrorMessage('Error in fetching movies');
    }finally{
      setIsLoading(false);
    }
  }

  useDebounce( () => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(()=>{
    fetchMovies(debounceSearchTerm, hasInclAdult);
  },[debounceSearchTerm, hasInclAdult]);

  let brandImg = 'mr-logo.svg';
  let brandWidth = 200;
  let brandHeight = 50;
  if(screen.width > 300 && screen.width < 900){
    brandWidth = 80;
    brandHeight = 80;
    brandImg = 'mr-icon.svg';
  }

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <BrandLogo widthVal={brandWidth} heightVal={brandHeight} brandLogo={brandImg} altText="Movieraves" titleText="Movieraves"/>

          <img src="./hero.webp" alt="Movieraves banner" />
          <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          
          <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            includeAdult={hasInclAdult} 
            refineHasInclAdult={refineHasInclAdult} 
          />
        </header>
        
        <main className='all-movies'>
          <h2 className='mt-[50px]'>
            {
              searchTerm ? `Search results for: " ${searchTerm} " ` : 'All Movies'
            }
          </h2>
          { isLoading ? (
            <PreLoader/>
          ) : errorMessage ? (
            <p className='text-red-500'>{ errorMessage }</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </main>
      </div>
    </main>
  )
}

export default App
