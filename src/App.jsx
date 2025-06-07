import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; // or correct path

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
