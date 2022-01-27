import * as mongoose from 'mongoose';

/**
 * This is the model of the collection on the dbTest called test.
 */
export const DataSchema = new mongoose.Schema({
  field1: {type: String, required: true},
  field2: {type: Number, required: true},
  field3: {type: Boolean, required: true},
});

export const Data = mongoose.model('tests', DataSchema);
export default Data;
