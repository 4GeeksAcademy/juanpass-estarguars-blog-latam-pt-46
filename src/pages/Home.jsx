import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {
  fetchPersonajes,
  fetchPlanetas,
  fetchVehiculos,
} from "../store.js";
import { CardPersonaje } from "../components/CardPersonaje.jsx";
import { CardPlaneta }    from "../components/CardPlaneta.jsx";
import { CardVehiculo }   from "../components/CardVehiculo.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchPersonajes(dispatch);
    fetchPlanetas(dispatch);
    fetchVehiculos(dispatch);
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Personajes</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
        {store.personajes.map((p) => (
          <CardPersonaje key={p.uid} id={p.uid} nombre={p.name} />
        ))}
      </div>

      <h2 className="mt-5">Planetas</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
        {store.planetas.map((p) => (
          <CardPlaneta key={p.uid} id={p.uid} nombre={p.name} />
        ))}
      </div>

      <h2 className="mt-5">Vehículos</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
        {store.vehiculos.map((v) => (
          <CardVehiculo key={v.uid} id={v.uid} nombre={v.name} />
        ))}
      </div>
    </div>
  );
};
