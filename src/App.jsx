import { Link } from 'react-router-dom'

const categories = [
  { slug: 'headphones', name: 'Наушники', sub: 'от 5 999 ₽' },
  { slug: 'microphone', name: 'Микрофоны', sub: 'от 10 999 ₽' },
  { slug: 'audio-interface', name: 'Аудиокарты', sub: 'от 10 499 ₽' },
  { slug: 'daw', name: 'Лицензии DAW', sub: 'от 400 ₽' },
]

export default function App() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Приветствуем вас в интернет-магазине Skat!</h1>
        <p className="subtitle">Студийная гарнитура по низким ценам</p>
      </section>

      <section>
        <h2 className="section-title">Категории</h2>
        <div className="categories">
          {categories.map(c => (
            <Link key={c.slug} to={`/catalog/${c.slug}`} className="category">
              <h3>{c.name}</h3>
              <p>{c.sub}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}