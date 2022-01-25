/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import BaseService from '../base/base-service';

/**
 * Webhook service
 */
export default class WebhookService extends BaseService {
  /**
   * test api
   * @param {any} request
   * @return {any}
   */
  public test(request: any) {
    this.fastifyInstance.kafka.push({
      topic: 'test',
      payload: JSON.stringify(request.body),
    });
    return { 'message': 'Data added to the topic test' };
  }
}
