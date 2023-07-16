import { create } from './server';
import { sequelize } from './db';

const connect = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const sync = async () => {
  try {
    await sequelize.sync();
    return true;
  } catch {
    return false;
  }
};

connect()
  .then(sync)
  .then((success) => {
    if (success) {
      const server = create();
      server.listen(8080, () => {
        console.log('Server running on 8080 port!');
      });
    }
  });
