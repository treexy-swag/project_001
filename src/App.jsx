const categories = [
  { id: 1, name: 'Наушники', sub: 'от 5 999 ₽', img: '' },
  { id: 2, name: 'Микрофоны', sub: 'от 10 999 ₽', img: '' },
  { id: 3, name: 'Аудиокарты', sub: 'от 10 499 ₽', img: '' },
  { id: 4, name: 'Лицензии DAW', sub: 'от 400 ₽', img: '' },
 
  
]

export default function App() {
  return (
    <div className="container">
      <h1>Приветствуем вас в нашем интернет магазине Skat!</h1>
      <h2>Здесь вы можете приобрести студийную гарнитуру по низким ценам</h2>
      <p1></p1>
      <div className="categories">
        {categories.map(c => (
          <div key={c.id} className="category">
            <div className="category__text">
              <h3>{c.name}</h3>
              <p>{c.sub}</p>
            </div>
            <div className="category__img">
              {c.img ? <img src={c.img} alt={c.name} /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}