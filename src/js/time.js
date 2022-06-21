import { $ } from './helpers';

function getDate () {
  let today = new Date();
  let hour = today.getHours();
  if (hour < 10) hour = '0' + hour;
  let min = today.getMinutes();
  if (min < 10) min = '0' + min;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = today.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  const yyyy = today.getFullYear();
  today = `${hour}:${min} ${dd}.${mm}.${yyyy}`;
  return today;
}

function showCurrentTime () {
  const timeElement = $('.trello__main__time');
  const dateElement = $('.trello__main__date');
  const date = new Date();
  const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weekDay = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  timeElement.innerText = `${hours}:${minutes}:${seconds}`;
  dateElement.innerHTML = `${month} ${day}, ${year}<br>${weekDay}`;
}

setInterval(showCurrentTime, 1000);

export { getDate };
