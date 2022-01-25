import KafkaClientService from './services/kafka_client';


const kafkaClient = new KafkaClientService('localhost:9092');
const client = kafkaClient.startInit();
client.on('ready', () => {
  console.log('consumer ready..');
  client.subscribe(['test']);
  client.consume();
}).on('data', function(data) {
  console.log(`received message: ${data.value!.toString()}`);
  client.commit();
});

