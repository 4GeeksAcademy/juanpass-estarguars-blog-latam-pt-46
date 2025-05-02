import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CardPersonaje = ({ id, nombre }) => {
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const isFav = store.favoritos.some(
    f => f.uid === id && f.type === "personajes"
  );

  useEffect(() => {
    fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
      .then(r => r.json())
      .then(d => setImgUrl(d.image))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${id}`)
      .then(r => r.json())
      .then(d => setDetails(d.result.properties))
      .catch(console.error);
  }, [id]);

  return (
    <div className="flex-shrink-0 me-3 mb-4" style={{ minWidth: "18rem" }}>
      <div className="card h-100">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={nombre}
            className="card-img-top"
            style={{ height: "200px", objectFit: "contain" }}
            onError={e => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
            }}
          />
        ) : (
          <div
            className="bg-light d-flex align-items-center justify-content-center"
            style={{ height: "200px" }}
          >
            Cargando imagen…
          </div>
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nombre}</h5>
          {details ? (
            <ul className="card-text">
              <li><strong>Height:</strong> {details.height} cm</li>
              <li><strong>Mass:</strong> {details.mass} kg</li>
              <li><strong>Gender:</strong> {details.gender}</li>
            </ul>
          ) : (
            <p className="card-text">Cargando datos…</p>
          )}
          <div className="mt-auto d-flex justify-content-between">
            <Link to={`/detalle/${id}`} className="btn btn-sm btn-outline-primary">
              Ver detalle
            </Link>
            <button
              className={`btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() =>
                dispatch({
                  type: isFav ? "remove_favorite" : "add_favorite",
                  payload: {
                    uid: id,
                    type: "personajes",
                    name: nombre,
                    url: `https://www.swapi.tech/api/people/${id}`
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
