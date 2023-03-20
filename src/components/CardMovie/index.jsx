import React from 'react'
import './styles.css'

export function CardMovie({ image, title, description }) {
  return (
    <div className="card">
      <img src={image} alt="" />
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  )
}
