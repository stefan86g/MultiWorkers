
const csv = require("csvtojson")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ObjectsToCsv = require('objects-to-csv');

const read = async() => {
  const jsonArray = await csv().fromFile("coordinates_for_node_test.csv");
    return jsonArray;
}

const write = async(data) => {
const csv = new ObjectsToCsv(data);
await csv.toDisk('./workersData.csv');
}

 module.exports.read = read;
 module.exports.write = write;


