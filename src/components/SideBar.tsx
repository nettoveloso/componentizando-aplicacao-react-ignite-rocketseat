import { useGenres } from '../hooks/useGenres';
import '../styles/sidebar.scss';

import { Button } from './Button';
export function SideBar() {
  const { genres, selectedGenreId, setSelectedGenreId } = useGenres();

  function handleClickButton( genreId:number ) {
    setSelectedGenreId(genreId);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  ) 
}