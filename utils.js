function convertCsvToJSON(csv){

  var lines=csv.replace('\r', '').split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return result
}
const getDay = () => {
  const d = new Date();
  let day = d.getDay();
  const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  return weekday[day]
}

const getClassesForToday = (data) => {
  return data.map(obj => {
    return {
      time: obj['Time'].split('/')[0],
      place: obj['Time'].split('/')[1],
      class: obj[getDay()]
    }
  })
}

module.exports = {
  convertCsvToJSON,
  getDay,
  getClassesForToday
}