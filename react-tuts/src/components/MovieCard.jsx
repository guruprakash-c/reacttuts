import React from 'react'

const MovieCard = ({ movie : 
    { title, original_title, original_language, vote_average, poster_path, release_date, adult } 
}) => {
    return (
        <div className="movie-card">
            <img src={ poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'no-movie.webp' } alt={title} title={`${title} (${original_title})`} />
            <h3 className="mt-4">{title}</h3>
            <div className="content">
                <div className="rating">
                    <img 
                        src="star.svg"  
                        alt="Star rating" />
                    <p>{ vote_average ? vote_average.toFixed(1) : 'N/A' }</p>
                </div>
                <span>&middot;</span>
                <p className="lang">{original_language}</p>
                <span>&middot;</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A' }</p>
                { 
                    adult &&  <p className='text-red-500'><span>&middot;</span> { adult ? '🔞' : '' }</p>

                }
                
                
            </div>
        </div>
    )
}

export default MovieCard
