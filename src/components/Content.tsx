import { 
  useEffect, 
  useState 
} from 'react';

import { api } from '../services/api';
import { useGenres } from '../hooks/useGenres';

import { MovieCard } from './MovieCard';

import '../styles/content.scss';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  const { genres, selectedGenreId } = useGenres();

  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="container">
    <header>
      <span className="category">Categoria:<span> {genres.length > 0 ? genres[selectedGenreId-1].title : 'Loading'}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
           <MovieCard key={movie.Title} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
    </div>
  ) 
}