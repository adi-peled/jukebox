import React from 'react'
import BoxList from '../../cmps/BoxList/BoxList'
function Home() {

    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop', 'Classical']
    return (
        <section className="home">
            home page img hero here
            <h2>  Top Genres</h2>
            {genres.map(genre => {
                return <div key={genre} className="genre">
                    <h3>{genre}</h3>
                    <BoxList genre={genre} />
                </div>
            })}

        </section>
    )
}

export default Home
