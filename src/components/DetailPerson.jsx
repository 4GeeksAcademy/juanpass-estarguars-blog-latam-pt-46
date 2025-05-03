// src/components/DetailPerson.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchPerson = async () => {
      try {
        // Obtener datos del personaje desde SWAPI
        const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
        const data = await res.json();
        setPerson(data.result.properties);

        // Obtener la imagen desde la API de Akabab
        const imageRes = await fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`);
        const imageData = await imageRes.json();
        setImageUrl(imageData.image);
      } catch (err) {
        console.error("Error fetching person or image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
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

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Imagen */}
        <div className="col-md-6">
          <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
            <img
              src={imageUrl || "/placeholder-character.jpg"}
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

        {/* Nombre y descripción */}
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

      {/* Propiedades */}
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
