const Home = () => {
    const flowerDesigns = [
        { id: 1, title: 'זרי פרחים', imageUrl: '62e1852731.jpg', description: 'באפשרותך לבחור זר יד / קשת  ועוד' },
        { id: 2, title: 'עיצובי פרחים', imageUrl: '355.jpg', description: 'באפשרותך להוסיף מתנה לעיצוב' },

    ];

    return (
        <div className="App">
            <header>
                <h1>ברוכים הבאים לעיצובי פרחים</h1>
            </header>
            <main>
                <section>
                    <h2>עיצובים פופולריים</h2>
                    {flowerDesigns.map(design => (
                        <div className="flower-design" key={design.id}>
                            <img src={`http://localhost:1234/imeges/${design.imageUrl}`} alt={design.title} />
                            <h3>{design.title}</h3>
                            <p>{design.description}</p>
                        </div>
                    ))}
                </section>
            </main>
            <footer>
                <p>© עיצובי פרחים</p>
            </footer>
        </div>
    );
}
export default Home;
