
const csv = require("csvtojson")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const read = async() => {
  const jsonArray = await csv().fromFile("coordinates_for_node_test.csv");
    return jsonArray;
}

const write = async(data) => {
  const csvWriter = createCsvWriter({
    path: 'workersData.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'}
    ]
});
const result = await csvWriter.writeRecords(data);
return result;
}

 module.exports.read = read;
 module.exports.write = write;


