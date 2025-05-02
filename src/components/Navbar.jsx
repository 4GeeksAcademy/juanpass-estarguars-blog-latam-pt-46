// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/star-wars-logo-png-transparent.png"
            alt="Star Wars Logo"
            className="navbar-brand"
            style={{ height: "150px", objectFit: "contain" }}
          />
        </Link>

        <div className="dropdown ms-auto">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="favDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favoritos{" "}
            <span className="badge bg-danger">{store.favoritos.length}</span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="favDropdown"
          >
            {store.favoritos.length === 0 ? (
              <li className="dropdown-item text-muted">
                No hay favoritos
              </li>
            ) : (
              store.favoritos.map((item) => {
                const to =
                  item.type === "personajes"
                    ? `/detalle/${item.uid}`
                    : item.type === "planetas"
                    ? `/detailPlanet/${item.uid}`
                    : `/detailVehicle/${item.uid}`;
                return (
                  <li
                    key={`${item.type}-${item.uid}`}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <Link className="dropdown-item" to={to}>
                      {item.name}
                    </Link>
                    <button
                      className="btn btn-sm btn-link text-danger"
                      onClick={() =>
                        dispatch({
                          type: "remove_favorite",
                          payload: { uid: item.uid, type: item.type },
                        })
                      }
                    >
                      &times;
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
