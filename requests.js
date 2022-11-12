const fetch = require('node-fetch');
const CHAT_ID = '1001832762595'
const BOT = '5424318541:AAGUOvfXVFkbuUdjYNmuGTZ4K46dkhyXxvE'
const URL = 'https://api.telegram.org/bot'

const constructText = (data) => {
  data = data.map(cls => {
    cls.class = cls.class.replace('/', ' ')
    return cls
  })
  const fistInBig = data.find(cls => cls.place === 'big hol' && cls.time ==='7:30').class
  const secondInBig = data.find(cls => cls.place === 'big hol' && cls.time ==='8:30').class
  const fistInSmall = data.find(cls => cls.place === 'small hol' && cls.time ==='7:30').class
  const secondInSmall = data.find(cls => cls.place === 'small hol' && cls.time ==='8:30').class
  const party = data.find(cls =>  cls.time === '9:30').class

  return `
Today %0A %0A

Big hall: %0A %0A

19:30 - ${fistInBig} %0A
20:30 - ${secondInBig} %0A %0A

${fistInSmall || secondInSmall ? `Small hall: %0A` : ''}

${fistInSmall ? `19:30 - ${fistInSmall}` : ''} %0A
${ secondInSmall ? `20:30 - ${secondInSmall}` : ''} %0A %0A

${party ? 'Party' : ''} %0A
${party ? `21:30 - ${party}` : ''}
  `
}

const getUrl = (classesForToday) => {
  return `${URL}${BOT}/sendMessage?chat_id=-${CHAT_ID}&text=${constructText(classesForToday)}`
}

const sendRequestToTelegramBot = (classesForToday) => {
  return fetch(getUrl(classesForToday))
}

module.exports = {
  sendRequestToTelegramBot
}