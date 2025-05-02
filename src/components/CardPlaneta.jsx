import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CardPlaneta = ({ id, nombre }) => {
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const imgUrl = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;

  const isFav = store.favoritos.some(
    f => f.uid === id && f.type === "planetas"
  );

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${id}`)
      .then(r => r.json())
      .then(d => setDetails(d.result.properties))
      .catch(console.error);
  }, [id]);

  return (
    <div className="flex-shrink-0 me-3 mb-4" style={{ minWidth: "18rem" }}>
      <div className="card h-100">
        <img
          src={imgUrl}
          alt={nombre}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nombre}</h5>
          {details ? (
            <ul className="card-text">
              <li><strong>Climate:</strong> {details.climate}</li>
              <li><strong>Population:</strong> {details.population}</li>
              <li><strong>Terrain:</strong> {details.terrain}</li>
            </ul>
          ) : (
            <p className="card-text">Cargando datos…</p>
          )}
          <div className="mt-auto d-flex justify-content-between">
            <Link to={`/detailPlanet/${id}`} className="btn btn-sm btn-outline-primary">
              Ver detalle
            </Link>
            <button
              className={`btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() =>
                dispatch({
                  type: isFav ? "remove_favorite" : "add_favorite",
                  payload: {
                    uid: id,
                    type: "planetas",
                    name: nombre,
                    url: `https://www.swapi.tech/api/planets/${id}`
                  }
                })
              }
            >
              {isFav ? "★" : "☆"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
