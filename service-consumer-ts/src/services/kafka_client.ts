/* eslint-disable max-len */
import kafka from 'node-rdkafka';

/**
 * Kafka client service.
 */
export default class KafkaClientService {
  stringConnection: string;
  /**
   * Constructor of class, passing
   * by argument the connection string with the broker.
   * @param {string} kafkaHost
   */
  constructor(kafkaHost: string) {
    this.stringConnection = kafkaHost;
  }

  /**
   * Consumer class.
   * @return {kafka.Consumer}
   */
  startInit(): kafka.KafkaConsumer {
    const consumer = new kafka.KafkaConsumer({
      'group.id': 'kafka',
      'metadata.broker.list': this.stringConnection,
    }, {});
    consumer.connect();
    return consumer;
  }
}
