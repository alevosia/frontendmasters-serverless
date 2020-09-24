const movies = require('../data/movies.json')

exports.handler = async ({ queryStringParameters }) => {
    if (!queryStringParameters || !queryStringParameters.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Id parameter is required.' }),
        }
    }

    const { id } = queryStringParameters
    const movie = movies.find((m) => m.id === id)

    if (!movie) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Movie does not exist.' }),
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(movie),
    }
}
