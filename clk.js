const btn12 = document.getElementById('btn');
const btn24 = document.getElementById('btn2');
const clockDisplay = document.getElementById('clock');
const ampmDisplay = document.getElementById('ampm');
const dateDisplay = document.getElementById('date');
const dayDisplay = document.getElementById('day');
const greetDisplay = document.querySelector('.greet');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

let is12HourFormat = true;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateClock() {
  const now = new Date();
  
  let hours = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');
  
  const date = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const dayName = days[now.getDay()];

  let displayHours = hours;
  let ampm = "";

  if (is12HourFormat) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    displayHours = hours % 12 || 12;
    ampmDisplay.style.display = "block";
  } else {
    ampmDisplay.style.display = "none";
  }

  displayHours = String(displayHours).padStart(2, '0');

  clockDisplay.textContent = `${displayHours}:${minutes}:${seconds}`;
  ampmDisplay.textContent = ampm;
  dateDisplay.textContent = `${date}/${month}/${year}`;
  dayDisplay.textContent = dayName;

  if (hours >= 5 && hours < 12) {
    greetDisplay.textContent = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    greetDisplay.textContent = "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    greetDisplay.textContent = "Good Evening";
  } else {
    greetDisplay.textContent = "Good Night";
  }
}

btn12.addEventListener("click", () => {
  is12HourFormat = true;
  btn12.classList.add('active');
  btn24.classList.remove('active');
  updateClock();
});

btn24.addEventListener("click", () => {
  is12HourFormat = false;
  btn24.classList.add('active');
  btn12.classList.remove('active');
  updateClock();
});

function updateBackgroundSky() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const decimalHour = hour + (minute / 60);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (decimalHour >= 6 && decimalHour < 18) {
    document.body.style.backgroundColor = getSkyColor(decimalHour);
    sun.style.display = 'block';
    moon.style.display = 'none';
    
    const progress = (decimalHour - 6) / 12;
    sun.style.left = `calc(${progress * screenWidth}px - ${sun.offsetWidth / 2}px)`;
    sun.style.bottom = `${Math.sin(progress * Math.PI) * (screenHeight * 0.75)}px`;
  } else {
    document.body.style.backgroundColor = '#0b0d17';
    sun.style.display = 'none';
    moon.style.display = 'block';
    
    let progress = decimalHour >= 18 ? (decimalHour - 18) / 12 : (decimalHour + 6) / 12;
    moon.style.left = `calc(${progress * screenWidth}px - ${moon.offsetWidth / 2}px)`;
    moon.style.bottom = `${Math.sin(progress * Math.PI) * (screenHeight * 0.75)}px`;
  }
}

function getSkyColor(hour) {
  if (hour >= 6 && hour < 8) return '#1a2b4c';
  if (hour >= 8 && hour < 16) return '#2b5a8c';
  if (hour >= 16 && hour < 18) return '#6b3d4f';
  return '#0b0d17';
}

setInterval(updateClock, 1000);
updateClock();
setInterval(updateBackgroundSky, 60000);
updateBackgroundSky();
window.addEventListener('resize', updateBackgroundSky);
