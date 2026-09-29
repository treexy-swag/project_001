import { useState } from 'react'

const products = [
  { id: 1, name: 'Audio-Technica AT2020', img: 'https://n.cdn.cdek.shopping/images/shopping/F4G4A5bBKzYlrqf8.jpg?v=1', price: 10999 },
  { id: 2, name: 'Neumann TLM 103', img: 'https://avatars.mds.yandex.net/i?id=246f327322dbf1a1393cf43c6a1066f3_l-3696566-images-thumbs&n=13&n=13&w=345&h=230', price: 110999 },
  { id: 3, name: 'AKG P120', img: 'https://avatars.mds.yandex.net/i?id=1f7ce0c712650ddd460fd4bdc034661013615e20-10115282-images-thumbs&n=13&n=13&w=230&h=230', price: 12999 },
  { id: 4, name: 'Audient iD4 MKII', img: 'https://pop-music.ru/upload/iblock/7e8/7e871b114218677643be78e5e823cf48.png', price: 12899 },
  { id: 5, name: 'Arturia MiniFuse 1', img: 'https://avatars.mds.yandex.net/get-mpic/20890764/pic823d79a0f38a8158f7388b1cb24292ad/orig', price: 10499 },
  { id: 6, name: 'Universal Audio Apollo Twin X', img: 'https://avatars.mds.yandex.net/get-goods_pic/13813957/hat8dfb53e5ed3cdb5b052e5bd07ab1ef2c/orig', price: 90999 },
  { id: 7, name: 'Beyerdynamic DT 770 PRO', img: 'https://cdn1.ozone.ru/s3/multimedia-i/6257345586.jpg', price: 14999 },
  { id: 8, name: 'AKG K52', img: 'https://avatars.mds.yandex.net/get-mpic/5129282/2a000001916afb9052c34c0f62281bb8f888/orig', price: 5999 },
  { id: 9, name: 'Audio-Technica ATH-M40X', img: 'https://c.dns-shop.ru/thumb/st4/fit/300/300/c2a42434d64d7ee39772e0c4fa502f77/f08b8f282ce27d052677910799056f2dd28ff24d8c28b870f2628ea24a303381.jpg.webp', price: 12999 },
  { id: 10, name: 'FL Studio License', img: 'https://i.playerok.com/5ESoGICrQqOfkeMco8zntUKdzfNKOe0T5IvR5aNg-UE/wm:0.8:soea:5:2:0.2/rs:fill:0:1000:0/g:no/quality:99/czM6Ly9wbGF5ZXJvay8vaW1hZ2VzLzFmMThhY2VlLTE2YTEtNmQ0MC1hNGExLTRmZmI0ZTllODgxYS5wbmc.jpg', price: 500 },
  { id: 11, name: 'Ableton License', img: 'https://avatars.mds.yandex.net/get-mpic/19658723/2a0000019d4867eec0a76a0596be330bc9fa/orig', price: 700 },
  { id: 12, name: 'Logic Pro License', img: 'https://avatars.mds.yandex.net/i?id=3003b74ca76cfce338904f5ace0b36fe36a8b33b-4372511-images-thumbs&n=13', price: 400 },
  
]

const priceRanges = [
  {id:'all', label:'Все цены', min: 0, max: Infinity},
   { id: 'low',    label: 'до 15 000 ₽',  min: 0,     max: 15000 },
  { id: 'mid',    label: '15 000 – 30 000 ₽', min: 15000, max: 30000 },
  { id: 'high',   label: '30 000 – 60 000 ₽', min: 30000, max: 60000 },
  { id: 'top',    label: 'от 60 000 ₽',  min: 60000, max: Infinity },
]

export default function Catalog() {
  const [search, setSearch] = useState('')
  const [rangeId, setRangeId] = useState('all')

  const range = priceRanges.find(r => r.id === rangeId)

  const filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase())
    const matchPrice = p.price >= range.min && p.price <= range.max
    return matchName && matchPrice
  })

  return (
    <div className="container">
      <h1>Каталог</h1>

      {/* Поиск */}
      <input
        type="text"
        className="search"
        placeholder="Поиск по названию..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Фильтр по цене */}
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

      {/* Товары */}
      {filtered.length === 0 ? (
        <p className="empty">Ничего не найдено 😔</p>
      ) : (
        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">{p.price.toLocaleString()} ₽</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}