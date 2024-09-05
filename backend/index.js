// server.js
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './db.js';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: true }); // Sync all models, force true to drop tables if they already exist
    console.log('Database connected and synced.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
