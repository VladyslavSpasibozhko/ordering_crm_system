import { create } from './server';
import { db } from './db';
import { envs } from './services/envs';

const server = create();
server.listen(envs.APP_PORT);
db.init();

server.on('listening', () => {
  console.log(`Server running on ${envs.APP_PORT} port!`);
});

server.on('error', (err) => {
  console.log(err);
});
