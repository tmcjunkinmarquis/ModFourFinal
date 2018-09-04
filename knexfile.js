module.exports = {  
  test: {
    client: 'pg',
    connection: 'postgres://localhost/bucketlist_test',
    migrations: {
      directory: '/db/migrations'
    },
    seeds: {
      directory: '/db/seeds/test'
    },
    useNullAsDefault: true
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/bucketlist',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: '/db/migrations'
    },
    seeds: {
      directory: '/db/seeds/production'
    }
  }

};
