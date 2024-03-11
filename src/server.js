const Hapi = require('@hapi/hapi');
const { routes } = require('./routes');

const bootstrap = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
    routes: {
      cors: {
        origin: ['http://notesapp-v1.dicodingacademy.com'],
      },
    },
  });

  server.route(routes);

  await server.start();

  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.info.uri}`);
};

bootstrap();
