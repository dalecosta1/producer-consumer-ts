import { FastifyInstance } from 'fastify';
import BaseService from './base-service';
/**
 *@param {FastifyRequest} request
 *@param {FastifyReply} reply
 */
export default class BaseIndex {
  protected prefix: string;

  protected fastifyInstance: any;

  protected service: any;

  protected schema: any;
  /**
   * @param  {FastifyInstance} fastifyInstance
   * @param  {BaseService} serviceToUse
   * @param  {any} schema
   * @param  {string|null} routesPrefix
   */
  constructor(
      fastifyInstance: FastifyInstance,
      serviceToUse: BaseService,
      schema: any,
      routesPrefix: string | null = null,
  ) {
    this.fastifyInstance = fastifyInstance;
    this.service = serviceToUse;
    this.schema = schema;
    this.prefix = routesPrefix == null ? this.service.pathPrefix : routesPrefix;
    this.prefix = this.prefix?.startsWith('/') ? this.prefix : `/${this.prefix}`;
  }
  /**
   * Register routes
   */
  public register(): void {
  }
}
