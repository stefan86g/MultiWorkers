const WorkerPool = require('./worker_pool')
const path = require('path');
const os = require('os')
const csv = require("./csv_handler")



// os.cpus().length Replace this with variable from config
const pool = new WorkerPool(os.cpus().length, path.resolve(__dirname, 'worker.js'));

(async () => {
    let vehicleData = await csv.read();

    let aaa = await sendDataToWorkers(vehicleData);
    let test = await csv.write(aaa);
})()

let sendDataToWorkers = async (vehicleData)=>{
    let vehicleDataWithDistance=[];
    let groupedVehicleData = groupDataVehicleById(vehicleData)
    for await (const key of Object.keys(groupedVehicleData)) {
        pool.runTask(groupedVehicleData[key], (err, result) => {
            if (err) return reject(err)
            vehicleDataWithDistance.push(result)
          })
    }
  return vehicleDataWithDistance;
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




