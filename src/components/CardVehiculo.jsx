import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CardVehiculo = ({ id, nombre }) => {
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const imgUrl = `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;

  const isFav = store.favoritos.some(
    f => f.uid === id && f.type === "vehiculos"
  );

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/vehicles/${id}`)
      .then(r => r.json())
      .then(d => setDetails(d.result.properties))
      .catch(console.error);
  }, [id]);

  return (
    <div className="flex-shrink-0 me-3 mb-4" style={{ width: "300px" }}>
      <div className="card h-100">
        <img
          src={imgUrl}
          alt={nombre}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/200x200";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nombre}</h5>
          {details ? (
            <ul className="card-text" style={{ fontSize: "0.875rem" }}>
              <li><strong>Model:</strong> {details.model}</li>
              <li><strong>Manufacturer:</strong> {details.manufacturer}</li>
              <li><strong>Passengers:</strong> {details.passengers}</li>
            </ul>
          ) : (
            <p className="card-text" style={{ fontSize: "0.875rem" }}>Cargando datos…</p>
          )}
          <div className="mt-auto d-flex justify-content-between">
            <Link to={`/detailVehicle/${id}`} className="btn btn-sm btn-outline-primary">
              Ver detalle
            </Link>
            <button
              className={`btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() =>
                dispatch({
                  type: isFav ? "remove_favorite" : "add_favorite",
                  payload: {
                    uid: id,
                    type: "vehiculos",
                    name: nombre,
                    url: `https://www.swapi.tech/api/vehicles/${id}`
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
