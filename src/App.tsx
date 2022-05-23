import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ColumnDataProvider from './contexts/ColumnDataContext';
import CrossSection from './pages/CrossSection';
import Discretization from './pages/Discretization';
import Geometry from './pages/Geometry';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Results from './pages/Results';


function App() {
  return (
    <>
      <BrowserRouter>
        <ColumnDataProvider>
        <Sidebar /> 
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/geometry" element={<Geometry />}></Route>
            <Route path="/materials" element={<Materials />}></Route>
            <Route path="/cross-section" element={<CrossSection />}></Route>
            <Route path="/discretization" element={<Discretization />}></Route>
            <Route path="/results" element={<Results />}></Route>
          </Routes>
        </ColumnDataProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
