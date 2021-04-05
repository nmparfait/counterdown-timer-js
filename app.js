const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2021, 3, 15, 11, 45, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
giveaway.textContent = `giveaway end on ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in ms

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60 min
  // 1d = 24h

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  //calculate all the values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  //set the format
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  //set values array
  const values = [days, hours, minutes, seconds];

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  // deal expired
  if (t < 0) {
    clearInterval(counter);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired`;
  }
}

// set the interval

const counter = setInterval(getRemainingTime, 1000);

getRemainingTime();
