// src/routes.jsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout }       from "./pages/Layout.jsx";
import { Home }         from "./pages/Home.jsx";    // Ahora como named import
import { Single }       from "./pages/Single.jsx";
import { Demo }         from "./pages/Demo.jsx";
import DetailPerson     from "./components/DetailPerson.jsx";
import DetailPlanet     from "./components/DetailPlanet.jsx";
import DetailVehiculo   from "./components/DetailVehiculo.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Ruta index para Home */}
      <Route index element={<Home />} />

      <Route path="single/:theId"     element={<Single />} />
      <Route path="demo"              element={<Demo />} />
      <Route path="detalle/:id"       element={<DetailPerson />} />
      <Route path="detailPlanet/:id"  element={<DetailPlanet />} />
      <Route path="detailVehicle/:id" element={<DetailVehiculo />} />
    </Route>
  )
);
