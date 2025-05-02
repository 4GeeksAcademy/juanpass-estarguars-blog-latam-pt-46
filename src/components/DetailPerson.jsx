// src/components/DetailPerson.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.swapi.tech/api/people/${id}`)
      .then(res => res.json())
      .then(data => {
        setPerson(data.result.properties);
      })
      .catch(err => console.error("Error fetching person:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container mt-5 text-center">
        <p>No se encontró el personaje.</p>
      </div>
    );
  }

  const imgUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Imagen a la izquierda */}
        <div className="col-md-6">
          <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
            <img
              src={imgUrl}
              alt={person.name}
              className="img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/placeholder-character.jpg";
              }}
            />
          </div>
        </div>
        {/* Nombre y descripción a la derecha */}
        <div className="col-md-6">
          <h1>{person.name}</h1>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Fila de propiedades */}
      <div className="row text-danger text-center">
        <div className="col">
          <h6>Name</h6>
          <p>{person.name}</p>
        </div>
        <div className="col">
          <h6>Birth Year</h6>
          <p>{person.birth_year}</p>
        </div>
        <div className="col">
          <h6>Gender</h6>
          <p>{person.gender}</p>
        </div>
        <div className="col">
          <h6>Height</h6>
          <p>{person.height} cm</p>
        </div>
        <div className="col">
          <h6>Skin Color</h6>
          <p>{person.skin_color}</p>
        </div>
        <div className="col">
          <h6>Eye Color</h6>
          <p>{person.eye_color}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPerson;
