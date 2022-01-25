import {MongoClient} from 'mongodb';

/**
 *
 */
export default class MongoDbClient {
  private _connection!: MongoClient;

  /**
   * getConnection
   */
  public get getConnection(): MongoClient {
    return this._connection;
  }

  /**
   * setConnection
   * @param {MongoClient} connection
   */
  private set setConnection(connection: MongoClient) {
    this._connection = connection;
  }

  /**
  *
  * @param {string} urlConnection connection string to database
  */
  async startConnection(urlConnection: string): Promise<void> {
    try {
      const connection = await new MongoClient(urlConnection).connect();
      this.setConnection = connection;
      console.log((new Date()).toISOString() + ' - Mongo Connected');
    } catch (error) {
      throw new Error((
        new Date()).toISOString() + ' - Mongo Connection error: ' + error);
    }
  }
}
