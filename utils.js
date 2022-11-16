function convertCsvToJSON(csv){
  
  var lines=csv.replace('\r', '').split("\n");

  var curriculums = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentLine=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentLine[j];
      }

      curriculums.push(obj);

  }

  return curriculums
}

const getDay = () => {
  const d = new Date();
  let day = d.getDay();
  const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  return weekday[day]
}

const getClassesForToday = (data) => {
  return data.map(obj => {
    const cls = obj[ getDay()] ? obj[ getDay()].replace('/', ' ').replace('\r', '') : ''
    if (!cls) {
      return undefined
    }
    return {
      time: obj['Time'].split('/')[0],
      place: obj['Time'].split('/')[1],
      class: obj[getDay()]
    }
  }).reduce((cur, cls) => {
    if (cls === undefined) return cur
    const timeAndClass = {
      time: cls.time,
      class: cls.class
    }
    if (cur && cur[cls.place]) {
      cur[cls.place].push(timeAndClass)
    } else {
      cur[cls.place] = [timeAndClass]
    }
    return cur
  }, {})
}

module.exports = {
  convertCsvToJSON,
  getClassesForToday
}