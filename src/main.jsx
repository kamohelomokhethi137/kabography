import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App.jsx";
import ScrollToTop from "./data/ScrollToTop.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";

// Lazy load pages
// const Home = lazy(() => import("./pages/Home.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Book = lazy(() => import("./pages/Book.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin" />
            <p className="mt-4 text-lg font-medium tracking-wide"></p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="book" element={<Book />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shop" element={<Shop />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl font-semibold">
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
