/* eslint-disable max-len */
import kafka from 'node-rdkafka';


/**
 * aaa
 */
export default class KafkaClientService {
  stringConnection: string;
  /**
   * sss
   * @param {string} kafkaHost
   */
  constructor(kafkaHost: string) {
    this.stringConnection = kafkaHost;
  }

  /**
   * sdasds
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
