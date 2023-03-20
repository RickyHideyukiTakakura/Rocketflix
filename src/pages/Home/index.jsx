import React, { useState } from 'react'

import './styles.css'

import { CardMovie } from '../../components/CardMovie'
import shuffleIcon from '../../assets/shuffle.svg'
import posterImg from '../../assets/code.svg'

export function Home() {
  const [movie, setMovie] = useState()

  const [loading, setLoading] = useState(false)

  function getMovie() {
    const randomMovie = Math.floor(Math.random() * 1000)
    const API_KEY = 'api_key=939e096e7e9b8a049aab66733f4d9f7f'
    const BASE_URL = 'https://api.themoviedb.org/3/movie/'
    const IMG_URL = 'https://image.tmdb.org/t/p/w500'

    function manageErrors(response) {
      if (!response.ok) {
        if (response.status == 404) {
          setLoading(false)
          setMovie({
            image: posterImg,
            title: '',
            description: 'Ops, hoje não é dia de assistir filme. Bora codar! 🚀'
          })
        }
        return
      }
      return response
    }

    setLoading(true)

    fetch(`${BASE_URL}${randomMovie}?${API_KEY}`)
      .then(manageErrors)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        setMovie({
          image: IMG_URL + data.poster_path,
          title: data.original_title,
          description: data.overview
        })
      })
      .catch(error => console.log(error))
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
      <button onClick={getMovie} type="button">
        <img src={shuffleIcon} alt="" />
        Encontrar filme
      </button>
      <p>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje
      </p>
    </div>
  )
}
