/* eslint-disable max-len */
// import { Db } from 'mongodb';
import KafkaClientService from './services/kafka_client';
import MongoDbClient from './services/mongoDb.service';

const MONGO_URL = ''; // Put your URL address here
const db = new MongoDbClient();
db.startConnection(MONGO_URL);

const kafkaClient = new KafkaClientService('localhost:9092');
const client = kafkaClient.startInit();

client.on('ready', () => {
  console.log('consumer ready..');
  client.subscribe(['test']);
  client.consume();
}).on('data', function(data: { value: any; }) {
  console.log(`received message: ${data.value!.toString()}`);
  client.commit();
  db.putData(JSON.parse(data.value!.toString()), 'dbTest', 'tests');
});

