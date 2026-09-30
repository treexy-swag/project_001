import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from './CartContext'

const products = [
  { id: 1, name: 'Audio-Technica AT2020', cat: 'microphone', img: 'https://n.cdn.cdek.shopping/images/shopping/F4G4A5bBKzYlrqf8.jpg?v=1', price: 10999 },
  { id: 2, name: 'Neumann TLM 103', cat: 'microphone', img: 'https://avatars.mds.yandex.net/i?id=246f327322dbf1a1393cf43c6a1066f3_l-3696566-images-thumbs&n=13&w=345&h=230', price: 110999 },
  { id: 3, name: 'AKG P120', cat: 'microphone', img: 'https://avatars.mds.yandex.net/i?id=1f7ce0c712650ddd460fd4bdc034661013615e20-10115282-images-thumbs&n=13&w=230&h=230', price: 12999 },
  { id: 4, name: 'Audient iD4 MKII', cat: 'audio-interface', img: 'https://pop-music.ru/upload/iblock/7e8/7e871b114218677643be78e5e823cf48.png', price: 12899 },
  { id: 5, name: 'Arturia MiniFuse 1', cat: 'audio-interface', img: 'https://avatars.mds.yandex.net/get-mpic/20890764/pic823d79a0f38a8158f7388b1cb24292ad/orig', price: 10499 },
  { id: 6, name: 'Universal Audio Apollo Twin X', cat: 'audio-interface', img: 'https://avatars.mds.yandex.net/get-goods_pic/13813957/hat8dfb53e5ed3cdb5b052e5bd07ab1ef2c/orig', price: 90999 },
  { id: 7, name: 'Beyerdynamic DT 770 PRO', cat: 'headphones', img: 'https://cdn1.ozone.ru/s3/multimedia-i/6257345586.jpg', price: 14999 },
  { id: 8, name: 'AKG K52', cat: 'headphones', img: 'https://avatars.mds.yandex.net/get-mpic/5129282/2a000001916afb9052c34c0f62281bb8f888/orig', price: 5999 },
  { id: 9, name: 'Audio-Technica ATH-M40X', cat: 'headphones', img: 'https://c.dns-shop.ru/thumb/st4/fit/300/300/c2a42434d64d7ee39772e0c4fa502f77/f08b8f282ce27d052677910799056f2dd28ff24d8c28b870f2628ea24a303381.jpg.webp', price: 12999 },
  { id: 10, name: 'FL Studio License', cat: 'daw', img: 'https://i.playerok.com/5ESoGICrQqOfkeMco8zntUKdzfNKOe0T5IvR5aNg-UE/rs:fill:0:1000:0/g:no/quality:99/czM6Ly9wbGF5ZXJvay8vaW1hZ2VzLzFmMThhY2VlLTE2YTEtNmQ0MC1hNGExLTRmZmI0ZTllODgxYS5wbmc.jpg', price: 500 },
  { id: 11, name: 'Ableton License', cat: 'daw', img: 'https://avatars.mds.yandex.net/get-mpic/19658723/2a0000019d4867eec0a76a0596be330bc9fa/orig', price: 700 },
  { id: 12, name: 'Logic Pro License', cat: 'daw', img: 'https://avatars.mds.yandex.net/i?id=3003b74ca76cfce338904f5ace0b36fe36a8b33b-4372511-images-thumbs&n=13', price: 400 },
]

const catNames = {
  headphones: 'Наушники',
  microphone: 'Микрофоны',
  'audio-interface': 'Аудиокарты',
  daw: 'Лицензии DAW',
}

const priceRanges = [
  { id: 'all',  label: 'Все цены',          min: 0,     max: Infinity },
  { id: 'low',  label: 'до 15 000 ₽',       min: 0,     max: 15000 },
  { id: 'mid',  label: '15 000 – 30 000 ₽', min: 15000, max: 30000 },
  { id: 'high', label: '30 000 – 60 000 ₽', min: 30000, max: 60000 },
  { id: 'top',  label: 'от 60 000 ₽',       min: 60000, max: Infinity },
]

export default function Catalog() {
  const { cat } = useParams()
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [rangeId, setRangeId] = useState('all')

  const range = priceRanges.find(r => r.id === rangeId)

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const matchCat = cat ? p.cat === cat : true
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      (catNames[p.cat] || '').toLowerCase().includes(q)
    const matchPrice = p.price >= range.min && p.price <= range.max
    return matchCat && matchSearch && matchPrice
  })

  return (
    <div className="container">
      <section className="hero">
        <h1>{cat ? catNames[cat] : 'Каталог'}</h1>
        <p className="subtitle">Найдено товаров: {filtered.length}</p>
      </section>

      <input
        type="text"
        className="search"
        placeholder="Поиск: микрофоны, наушники, AKG..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="price-tabs">
        {priceRanges.map(r => (
          <button
            key={r.id}
            className={r.id === rangeId ? 'price-tab active' : 'price-tab'}
            onClick={() => setRangeId(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {cat && <Link to="/catalog" className="reset">← Сбросить категорию</Link>}

      {filtered.length === 0 ? (
        <p className="empty">Ничего не найдено 😔</p>
      ) : (
        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div className="card__img">
                <img src={p.img} alt={p.name} />
              </div>
              <h3>{p.name}</h3>
              <p className="price">{p.price.toLocaleString()} ₽</p>
              <button className="btn" onClick={() => addToCart(p)}>
                В корзину
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}