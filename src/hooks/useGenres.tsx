import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresProviderProps {
  children: ReactNode,
}

interface GenresContextData {
  genres: Genre[];
  selectedGenreId: number;
  setSelectedGenreId: (id:number) => void;
}

const GenresContext = createContext<GenresContextData>(
  {} as GenresContextData
);

export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<Genre[]>('/genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <GenresContext.Provider value={{ genres, selectedGenreId, setSelectedGenreId }}>
      {children}
    </GenresContext.Provider>
  )
}

export function useGenres() {
  const context = useContext(GenresContext);
  return context;
}