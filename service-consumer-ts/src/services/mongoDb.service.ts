import {MongoClient} from 'mongodb';
import Data from '../models/data.model';

/**
 * This is the class to connect with mongo db.
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
  * This function set the connection with mongo db url.
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

  /**
  * This function set the connection with mongo db url.
  * @param {any} jsonObj json object to add in mongoDB
  * @param {string} dbStr db name
  * @param {string} collStr collection name
  */
  async putData(jsonObj: any, dbStr: string, collStr: string): Promise<void> {
    try {
      const data = new Data(jsonObj);
      // console.log(data);
      const dbTest = this._connection.db(dbStr);
      const collection = dbTest.collection(collStr);
      const result = await collection.insertOne(data);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
      throw new Error((
        new Date()).toISOString() + ' - Mongo Error: ' + error);
    }
  }
}
