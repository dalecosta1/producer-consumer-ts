import { FastifyReply, FastifyRequest } from 'fastify';
import BaseIndex from '../base/base-index';

/**
 * WebhookIndex class
 */
export default class WebhookIndex extends BaseIndex {
  /**
   * register api
   */
  public register(): void {
    this.fastifyInstance.post(
        `${this.prefix}/echoservice`,
        {},
        async (request: FastifyRequest, reply: FastifyReply) => this.test(request, reply),
    );
  }

  /**
   *
   * @param {any} request
   * @param {FastifyReply} reply
   * @return {FastifyReply}
   */
  public async test(request: any, reply: FastifyReply) {
    const output = await this.service.test(request);
    return reply.code(200).send(output);
  }
}
