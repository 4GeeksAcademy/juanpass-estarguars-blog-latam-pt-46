// src/components/DetailVehiculo.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailVehiculo = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.swapi.tech/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setVehicle(data.result.properties))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando vehículo...</span>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mt-5 text-center">
        <p>No se encontró el vehículo.</p>
      </div>
    );
  }

  const imgUrl = `https://placehold.co/400x400`;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{vehicle.name}</h1>
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <img
          src={imgUrl}
          alt={vehicle.name}
          className="img-fluid"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/placeholder-vehicle.jpg";
          }}
        />
      </div>

      <hr className="my-4" />

      <div className="row text-center">
        <div className="col">
          <h6>Name</h6>
          <p>{vehicle.name}</p>
        </div>
        <div className="col">
          <h6>Model</h6>
          <p>{vehicle.model}</p>
        </div>
        <div className="col">
          <h6>Manufacturer</h6>
          <p>{vehicle.manufacturer}</p>
        </div>
        <div className="col">
          <h6>Passengers</h6>
          <p>{vehicle.passengers}</p>
        </div>
        <div className="col">
          <h6>Crew</h6>
          <p>{vehicle.crew}</p>
        </div>
        <div className="col">
          <h6>Vehicle Class</h6>
          <p>{vehicle.vehicle_class}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailVehiculo;
