/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable new-cap */

import { FastifyInstance } from 'fastify';
import BaseIndex from '../modules/base/base-index';
import BaseModel from '../modules/base/base-model';
import BaseSchema from '../modules/base/base-schema';
import BaseService from '../modules/base/base-service';
import WebhookIndex from '../modules/webhook/webhook-index';
import Webhook from '../modules/webhook/webhook-model';
import WebhookSchema from '../modules/webhook/webhook-schema';
import WebhookService from '../modules/webhook/webhook-service';

/**
 * Server utils for routing
 */
export default class ServerUtils {
  static defaultPrefix = '/partium';

  static routesConfigurations: Array<{
    schema: typeof BaseSchema;
    index: typeof BaseIndex;
    routes_path: string;
    model: typeof BaseModel;
    service: typeof BaseService;
    prefix?: string | null;
  }> =
    [
      {
        schema: WebhookSchema,
        index: WebhookIndex,
        routes_path: '',
        model: Webhook,
        service: WebhookService,
      },
    ];

  /**
   *
   * @param {FastifyInstance} fastifyInstance
   */
  static registerRoutes(fastifyInstance: FastifyInstance): void {
    ServerUtils.routesConfigurations.forEach((element) => {
      let routesPath = element.prefix === undefined || element.prefix == null ? this.defaultPrefix : element.prefix;
      routesPath = routesPath.concat(element.routes_path).replace('//', '/');
      const schemaInstanceToUse = new element.schema();
      const toBeRegistered = new element.index(
          fastifyInstance,
          new element.service(element.model, fastifyInstance, schemaInstanceToUse),
          new element.schema(),
          routesPath,
      );
      toBeRegistered.register();
      // this.registerSharedSchema(fastifyInstance, schemaInstanceToUse);
    });
  }

  /**
   * Add share schemas so we can use
   * @param {FastifyInstance} fastifyInstance
   * @param {BaseSchema} schemaInstance
  */
  static registerSharedSchema(fastifyInstance: FastifyInstance, schemaInstance: BaseSchema): void {
    fastifyInstance.addSchema({
      $id: schemaInstance.constructor.name,
      type: 'object',
      properties: schemaInstance.properties,
    });
  }
}
