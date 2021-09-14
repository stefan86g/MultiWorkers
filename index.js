const WorkerPool = require('./worker_pool')
const path = require('path');
const os = require('os')
const csv = require("./csv_handler")



// os.cpus().length Replace this with variable from config
const pool = new WorkerPool(os.cpus().length, path.resolve(__dirname, 'worker.js'));

(async () => {
    let vehicleData = await csv.read();
    let processedData = await sendDataToWorkers(vehicleData);
    processedData.forEach(function(rowArray) {
          csv.write(rowArray);
    });
    pool.close();
})()

let sendDataToWorkers = async (vehicleData)=>{
    let groupedVehicleData = groupDataVehicleById(vehicleData);
    let promises = [];

    for await (const key of Object.keys(groupedVehicleData)) {
        let p = new Promise((resolve, reject) => {
            pool.runTask(  groupedVehicleData[key], (err, result) => {
              if (err) return reject(err)
              return resolve(result)
            })
          });
          promises.push(p);
    }
    let res = await Promise.all(promises);
  return res;
}


let groupDataVehicleById =(carsData)=>{
    let groupedByVehicle={};
    carsData.forEach((item)=>{
        if(groupedByVehicle.hasOwnProperty(item["vehicle_id"])){

           groupedByVehicle[item["vehicle_id"]].push(item)
        }else{
           groupedByVehicle[item["vehicle_id"]] = [item]
        }
       })
       return groupedByVehicle
}




