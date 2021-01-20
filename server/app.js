const express = require('express');
const app = express();
const {sequelize } = require('./models');
const taskRouter = require('./routes/tasks.router');
const cors = require('cors');

const port = 3001;

(async function sync() {
  await sequelize.authenticate();
  await sequelize.sync();

  start();
})();

function start() {
  app.use(cors());
  app.use(express.json());

  app.use('/api/task', taskRouter)

  app.listen(port, () => {
    console.log("Server started")
  });
}
