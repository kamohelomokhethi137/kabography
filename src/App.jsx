import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; 


function App() {
  return (
    <>
      <Navbar />
      <Outlet /> // This will render the matched child route component
      {/* The Outlet component is used to render the child routes */}
      {/* This allows for nested routing, where the Navbar remains visible across different pages */}
      <div className="min-h-screen bg-gray-100 pt-16">
        {/* Main content area, padding top to avoid overlap with Navbar */}
        <Outlet />
      </div>
      {/* The Outlet component is used to render the child routes */}
      {/* This allows for nested routing, where the Navbar remains visible across different pages */}
     
    </>
  );
}

export default App;
