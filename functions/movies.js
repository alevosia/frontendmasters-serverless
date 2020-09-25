if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const fetch = require('node-fetch')
const { URL } = require('url')
const { query } = require('./util/hasura')

const OMDB_API_KEY = process.env.OMDB_API_KEY

exports.handler = async () => {
    const { movies } = await query({
        query: `
            query AllMovies {
                movies {
                    id
                    poster
                    tagline
                    title
                }
            }
        
        `,
    })

    // add data from omdb
    const api = new URL('https://www.omdbapi.com/')

    api.searchParams.set('apikey', OMDB_API_KEY)

    const promises = movies.map((movie) => {
        // use the movie's IMDb to look up details
        api.searchParams.set('i', movie.id)

        return fetch(api)
            .then((response) => response.json())
            .then((data) => {
                const scores = data.Ratings

                return {
                    ...movie,
                    scores,
                }
            })
    })

    const moviesWithRatings = await Promise.all(promises)

    return {
        statusCode: 200,
        body: JSON.stringify(moviesWithRatings),
    }
}
