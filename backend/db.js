import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('employee', 'root', 'Dilpreet@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // Optional: Logs SQL queries to the console
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the function to test the connection
testConnection();

export default sequelize;
