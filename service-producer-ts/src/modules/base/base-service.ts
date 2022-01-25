/* eslint-disable max-len */
import dotenv from 'dotenv';
/**
 *@param {FastifyRequest} request
 *@param {FastifyReply} reply
 */
export default class BaseService {
  protected modelType: any;

  protected fastifyInstance: any;

  protected _collection = '';

  protected schema: any;

  /**
   * @param  {any} modelType
   * @param  {any} fastifyInstance
   * @param  {any} schema
   */
  constructor(modelType: any, fastifyInstance: any, schema: any) {
    dotenv.config();
    this.modelType = modelType;
    this.fastifyInstance = fastifyInstance;
    this.schema = schema;
  }
  /**
   * @return {string}
   */
  get collectionName(): string {
    return this._collection;
  }

  /**
   * @return {string}
   */
  get pathPrefix(): string {
    return `/${this._collection}`;
  }
}
