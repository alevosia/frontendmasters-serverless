const fetch = require('node-fetch')

const HASURA_API_URL = process.env.HASURA_API_URL
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET

async function query({ query, variables = {} }) {
    const result = await fetch(HASURA_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Hasura-Admin-Secret': HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({ query, variables }),
    }).then((response) => response.json())

    // TODO show helpful info there's an error

    return result.data
}

exports.query = query
