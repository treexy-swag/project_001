import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Catalog from './Catalog.jsx'
import './index.css'

function Profile() {
  return <h1>Profile</h1>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <header>
      <NavLink to="/" className="logo">Skat</NavLink>

      <nav className="nav">
        <NavLink to="/catalog">Каталог</NavLink>
        <NavLink to="/profile">Профиль</NavLink>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
)