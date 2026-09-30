import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container">
        <section className="hero">
          <h1>Корзина пуста 🛒</h1>
          <p className="subtitle">Добавьте товары из каталога</p>
        </section>
        <Link to="/catalog" className="btn">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>Корзина</h1>
        <p className="subtitle">Товаров: {cart.length}</p>
      </section>

      <div className="cart-list">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item__img">
              <img src={item.img} alt={item.name} />
            </div>

            <div className="cart-item__info">
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString()} ₽</p>
            </div>

            <div className="cart-item__qty">
              <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
            </div>

            <p className="cart-item__sum">
              {(item.price * item.qty).toLocaleString()} ₽
            </p>

            <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <button className="price-tab" onClick={clearCart}>Очистить корзину</button>

        <div className="cart-total">
          <span>Итого:</span>
          <b>{totalPrice.toLocaleString()} ₽</b>
          <button className="btn" onClick={() => alert('Заказ оформлен!')}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}