import { create } from './server';
import { sequelize } from './db';

const connect = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (e) {
    console.log('Init sequelize error', e);
    return false;
  }
};

const sync = async () => {
  try {
    await sequelize.sync();
    return true;
  } catch {
    console.log('Sync sequelize error', e);
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
  })
  .catch((e) => {
    console.log('Run server error', e);
  });
