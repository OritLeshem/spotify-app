import { Link } from 'react-router-dom'

const genres = [
    {
        name: 'Pop',
        bgc: 'rgb(20, 138, 8)',
        imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768'
    },
    {
        name: 'Hip-Hop',
        bgc: 'rgb(188, 89, 0)',
        imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1'
    },
    {
        name: 'Rock',
        bgc: 'rgb(233, 20, 41)',
        imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e'
    },
    {
        name: 'Latin',
        bgc: 'rgb(225, 17, 140)',
        imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafa59f90c077c9f618fd0dde30'
    },
    {
        name: 'Workout',
        bgc: 'rgb(119, 119, 119)',
        imgUrl: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15'
    },
    {
        name: 'Mood',
        bgc: 'rgb(225, 17, 140)',
        imgUrl: 'https://i.scdn.co/image/ab67fb8200005caf271f9d895003c5f5561c1354'
    },
    {
        name: 'Sleep',
        bgc: 'rgb(30, 50, 100)',
        imgUrl: 'https://i.scdn.co/image/ab67706f00000002b70e0223f544b1faa2e95ed0'
    },
    {
        name: 'Party',
        bgc: 'rgb(83, 122, 161)',
        imgUrl: 'https://i.scdn.co/image/ab67fb8200005cafcbf80f8ea695536eace4fd2c'
    },
    {
        name: 'Focus',
        bgc: 'rgb(80, 55, 80)',
        imgUrl: 'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934'
    },
    {
        name: 'New releases',
        bgc: 'rgb(232, 17, 91)',
        imgUrl: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112'
    },

]

export function GenreList() {

    return <ul className='genre-list'>
        {genres.map(genre => <Link to={`/genre/${genre.name}`}><li key={genre.name} className='genre-preview' style={{ backgroundColor: genre.bgc }}>
            <img src={genre.imgUrl} alt='' />
            <h2>{genre.name}</h2>
        </li></Link>
        )}
    </ul>
}