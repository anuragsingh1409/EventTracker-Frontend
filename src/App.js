import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import Search from "./components/Search";
import Favourites from "./components/favourites";

function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route  path = "/" element={<Search/>}/>
    <Route   path = "/favourites" element={<Favourites/>}/>
    </Routes>
    </Router>
    {/* <ConnectionExample></ConnectionExample> */}
    </>
  );
}

export default App;
