const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway_tracking_system', 'root', 'Gehu@7037', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: console.log // helps debug database queries
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;