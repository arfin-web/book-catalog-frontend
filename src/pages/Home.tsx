const Home = () => {
    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://img.freepik.com/free-psd/decorative-objects-old-books-vases-black-wall-japanese-style_176382-57.jpg?w=1060&t=st=1689420685~exp=1689421285~hmac=e5c3650dc708a107151f3b1afa59efb8bdbae76165e26bbed7541398da4e655b)' }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Book <span className="text-primary-focus">Verse: Buzzing</span> with Literary <span className="text-primary-focus">Treasures</span></h1>
                        <p className="mb-5">Dive into a World of Literary Delights! Explore, Organize, and Share Your Favorite Books Effortlessly.</p>
                        <button className="btn btn-active btn-primary text-neutral-content font-bold">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home