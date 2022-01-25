import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Utils class
 */
class Utils {
  /**
   * sleep milliseconds
   * @param {number} ms
   * @return {Promise} Promise
   */
  static delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default Utils;
