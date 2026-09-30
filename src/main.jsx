import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Catalog from './Catalog.jsx'
import Cart from './Cart.jsx'
import { CartProvider, useCart } from './CartContext.jsx'
import './index.css'

function Profile() {
  return (
    <div className="container">
      <h1>Профиль</h1>
      <p className="subtitle">Здесь будет личный кабинет</p>
    </div>
  )
}

function Layout() {
  const { totalItems } = useCart()

  return (
    <div className="app">
      <header>
        <NavLink to="/" className="logo">Skat</NavLink>

        <nav className="nav">
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/cart" className="cart-link">
            Корзина
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
          <NavLink to="/profile">Профиль</NavLink>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:cat" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer__block">
          <h4>О нас</h4>
          <p>Skat — магазин музыкального оборудования для продюсеров, звукорежиссёров и музыкантов.</p>
        </div>

        <div className="footer__center">
          <span className="logo">Skat</span>
          <p>с 2026 года</p>
        </div>

        <div className="footer__block footer__block--right">
          <h4>Контакты</h4>
          <a href="mailto:hello@skat.ru">hello@skat.ru</a>
          <a href="tel:+79991234567">+7 (999) 123-45-67</a>
          <a href="https://t.me/skat" target="_blank" rel="noreferrer">Telegram</a>
          <a href="https://vk.com/skat" target="_blank" rel="noreferrer">VK</a>
        </div>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <Layout />
    </CartProvider>
  </BrowserRouter>
)