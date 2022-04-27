import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CrossSectionProvider from './contexts/CrossSectionContext';
import GeometryProvider from './contexts/GeometryContext';
import MaterialsProvider from './contexts/MaterialsContext';
import ReducerProvider from './contexts/ReducerContext';
import CrossSection from './pages/CrossSection';
import Geometry from './pages/Geometry';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Results from './pages/Results';


function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar /> 
        <GeometryProvider>
        <MaterialsProvider>
        <CrossSectionProvider>
        <ReducerProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/geometry" element={<Geometry />}></Route>
            <Route path="/materials" element={<Materials />}></Route>
            <Route path="/cross-section" element={<CrossSection />}></Route>
            <Route path="/results" element={<Results />}></Route>
          </Routes>
        </ReducerProvider>
        </CrossSectionProvider>
        </MaterialsProvider>
        </GeometryProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
