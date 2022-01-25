import fastify from 'fastify';
import pino from 'pino';
import dotenv from 'dotenv';
import ServerUtils from './utils/server-utils';

/**
 * Initialization of server
 */
async function initializeServer() {
  try {
    dotenv.config();
    const portNumber: number = parseInt(process.env.PORT || '') || 5000;
    const host: string = process.env.HOST || '0.0.0.0';

    const server: any = fastify({
      pluginTimeout: 30000,
      logger: pino({
        level: 'debug',
        messageKey: 'message',
      }),
    });

    server.register(require('fastify-healthcheck'));
    await server
        .register(require('fastify-kafka'), {
          producer: {
            'metadata.broker.list': '127.0.0.1:9092',
            'fetch.wait.max.ms': 10,
            'fetch.error.backoff.ms': 50,
            'dr_cb': true,
          } },
        );

    await server.register(require('fastify-basic-auth'), { validate });

    /**
     * Validation basic auth.
     * @param {string} username
     * @param {string} password
     * @param {any} req
     * @param {any} reply
     * @param {any} done
     */
    function validate(username: string, password: string, req: any, reply: any, done: any) {
      if (username === process.env.USER_AUTH || 'test' && password === process.env.PASSWORD_AUTH || 'test') {
        done();
      } else {
        done(new Error('unauthorized'));
      }
    }

    await server.addHook('preHandler', (req: any, reply: any, done: any) => {
      if (req.body) {
        req.log.info({ body: req.body });
      }
      done();
    });

    server.after(() => {
      server.addHook('preHandler', server.basicAuth);
      ServerUtils.registerRoutes(server);
    });
    server.listen(portNumber, host, (err: any, address: any) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      server.log.debug(`Server listening at ${address}`);
    });
  } catch (e) {
    console.error(e);
  }
}

initializeServer();
