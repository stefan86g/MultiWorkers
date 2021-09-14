const { parentPort, threadId } = require('worker_threads');
var Distance = require('geo-distance');

parentPort.on('message', (task) => {
    console.log(`running task on thread: ${threadId}`)
    parentPort.postMessage(addDataPerRow(task))
})

function addDataPerRow(groupedData) {
    let prevRow='';

    return groupedData.map(function(item, index){
        let distance = '';
        item['worker_id'] = index; // TODO: create quid
       
        startPoint={
            lat: prevRow.latitude,
            lon: prevRow.longitude
        }
        endPoint={
            lat: item.latitude,
            lon: item.longitude
        }

        if(prevRow == '')
        {
        distance = 0;
        }else{
         distance = calcDistance(startPoint, endPoint)
        }
        item['distance_from_prev_point”'] = distance;
        prevRow = item;
        return item;
    })
}

function calcDistance(startPoint, endPoint) {
    var distance = Distance.between(startPoint, endPoint);
   return distance.human_readable().toString();
}

module.exports.calcDistance = calcDistance;
