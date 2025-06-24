import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";

import App from "./App.jsx";
import ScrollToTop from "./data/ScrollToTop.jsx";
import "./index.css"; 

import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import Gallery from "./pages/Gallery.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import ArtGallery from "./components/ArtGallery.jsx";

// Optional: Lazy-load components
// const Home = lazy(() => import('./pages/Home.jsx'));
// const Gallery = lazy(() => import('./pages/Gallery.jsx'));
// const Book = lazy(() => import('./pages/Book.jsx'));
// const Services = lazy(() => import('./pages/Services.jsx'));
// const Contact = lazy(() => import('./pages/Contact.jsx'));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
      
            <Route index element={<Navigate to="/home" replace />} />

            {/* Main pages */}
            <Route path="home" element={<Home />} />
            <Route path="book" element={<Book />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="artgallery" element={<ArtGallery />} />

            {/* Fallback 404 */}
            <Route
              path="*"
              element={
                <div className="text-center text-white py-20 text-xl font-semibold">
                  404 - Page Not Found
                </div>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
