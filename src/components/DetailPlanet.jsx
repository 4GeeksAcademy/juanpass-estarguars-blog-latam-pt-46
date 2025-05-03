// src/components/DetailPlanet.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { fetchDetallePlaneta } from '../store.js';

const DetailPlanet = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchDetallePlaneta(dispatch, id);
  }, [dispatch, id]);

  const planeta = store.detalle_planeta;
  const imgUrl = `https://placehold.co/400x400`;

  return (
    <div className="container mt-5">
      {planeta ? (
        <>
          <h1 className="mb-4">{planeta.name}</h1>
          <img
            src={imgUrl}
            alt={planeta.name}
            className="img-fluid mb-4"
            onError={e => { e.target.src = '/fallback-planet.jpg'; }}
          />
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Climate:</strong> {planeta.climate}
            </li>
            <li className="list-group-item">
              <strong>Population:</strong> {planeta.population}
            </li>
            <li className="list-group-item">
              <strong>Terrain:</strong> {planeta.terrain}
            </li>
            <li className="list-group-item">
              <strong>Gravity:</strong> {planeta.gravity}
            </li>
            <li className="list-group-item">
              <strong>Orbital Period:</strong> {planeta.orbital_period}
            </li>
            {/* Puedes añadir más propiedades aquí */}
          </ul>
        </>
      ) : (
        <p>Cargando datos del planeta…</p>
      )}
    </div>
  );
};

export default DetailPlanet;
