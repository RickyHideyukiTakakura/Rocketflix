import './styles.css';
import React, { useState } from 'react';
import { CardMovie } from '../../components/CardMovie';
import { getMovie } from '../../services/movieService';
import shuffleIcon from '../../assets/shuffle.svg';
import posterImg from '../../assets/code.svg';

export function Home() {
  const [movie, setMovie] = useState();

  const [loading, setLoading] = useState(false);

  async function handleNewMovieClick() {
    const randomMovie = Math.floor(Math.random() * 1000);
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    setLoading(true);

    try {
      const response = await getMovie(randomMovie);
      setMovie({
        image: IMG_URL + response.data.poster_path,
        title: response.data.original_title,
        description: response.data.overview
      });
    } catch (err) {
      setMovie({
        image: posterImg,
        title: '',
        description: 'Ops, hoje não é dia de assistir filme. Bora codar! 🚀'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <img className="logo" src={shuffleIcon} alt="" />
      <h1>Não sabe o que assistir?</h1>

      {loading ? (
        <h1>carregando</h1>
      ) : (
        movie && (
          <div className="card">
            <CardMovie
              image={movie.image}
              title={movie.title}
              description={movie.description}
            />
          </div>
        )
      )}
      <button onClick={handleNewMovieClick} type="button">
        <img src={shuffleIcon} alt="" />
        Encontrar filme
      </button>
      <p>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje
      </p>
    </div>
  );
}
