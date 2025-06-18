import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";



// Pages
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import Gallery from "./pages/Gallery.jsx";
import Services from "./pages/Services.jsx";
import ArtGallery from "./components/ArtGallery.jsx";

//tailwindcss
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="book" element={<Book />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="artgallery" element={<ArtGallery />} />

         
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
