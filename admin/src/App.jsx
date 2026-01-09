  import { Outlet } from "@tanstack/react-router";
  import Navbar from "./componenets/Navbar.jsx";

  const App = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  export default App;
