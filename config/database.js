const path = require('path');
const fs = require('fs');

module.exports = ({ env }) => {
  return {
    connection: {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false) && {
          ca: fs.readFileSync(path.join(__dirname, env('DATABASE_SSL_CA_PATH'))),  // Load the CA certificate
          rejectUnauthorized: true,
        },
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 60000,
    },
  };
};
