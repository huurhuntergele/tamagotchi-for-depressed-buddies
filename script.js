import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let cleanedList = JSON.parse(localStorage.getItem('cleanedList')) || [];
if (cleanedList.length > 0) {
  document.querySelector(".last-cleaned-day").innerHTML = `Last time, you cleaned on ${dayjs(cleanedList.at(-1)).format('dddd, MMMM DD, HH:mm')}`;
}
const tamagotchi = document.querySelector('.tamagotchi');

function attachButtonListeners() {
  const yesButton = document.querySelector('.yes-button');
  const noButton = document.querySelector('.no-button');

  if (yesButton && noButton) {
    yesButton.addEventListener('click', () => {
      const today = dayjs().format();
      document.querySelector('.question').innerHTML = 'Good job!';
      document.querySelector('.button-container').innerHTML = '';
      cleanedList.push(today);
      localStorage.setItem('cleanedList', JSON.stringify(cleanedList));
      document.querySelector('.last-cleaned-day').innerHTML = `Last time, you cleaned on ${dayjs(cleanedList.at(-1)).format('dddd, MMMM DD, HH:mm')}`;
      setMood();
    });

    noButton.addEventListener('click', () => {
      document.querySelector('.question').innerHTML = 'Omg go clean girl';
      document.querySelector('.button-container').innerHTML = '';
    });
  }
}


document.querySelector('.new-log').addEventListener('click', () => {

  document.querySelector('.question').innerHTML = 'Did you clean today?';
  document.querySelector('.button-container').innerHTML = '<button class="yes-button">Yes!</button><button class="no-button">No</button>';

  attachButtonListeners();
});


let buttonToggle1 = false;
let buttonToggle2 = false;
let buttonToggle3 = false;
let buttonToggle4 = false;

const myDiv = document.querySelector('.tamagotchi')

document.querySelector('.button-1').addEventListener('click', ()=>{
  buttonToggle1 = !buttonToggle1;
  const element = document.querySelector('.button-1');
  element.classList.toggle('clicked-button-1')
  buttonToggle1 && myDiv.insertAdjacentHTML("beforeend", " <img src='images/clothes.png' alt='' class='clothes'>");
  !buttonToggle1 && document.querySelector('.clothes').remove() 
})

document.querySelector('.button-2').addEventListener('click', ()=>{
  buttonToggle2 = !buttonToggle2;
  const element = document.querySelector('.button-2');
  element.classList.toggle('clicked-button-2')
  buttonToggle2 && myDiv.insertAdjacentHTML("beforeend", " <img src='images/headphone.png' alt='' class='headphone'>");
  !buttonToggle2 && document.querySelector('.headphone').remove();
})

document.querySelector('.button-3').addEventListener('click', ()=>{
  buttonToggle3 = !buttonToggle3;
  const element = document.querySelector('.button-3');
  element.classList.toggle('clicked-button-3')
  buttonToggle3  && myDiv.insertAdjacentHTML("beforeend", " <img src='images/eyeglass.png' alt='' class='eyeglass'>");
  !buttonToggle3 && document.querySelector('.eyeglass').remove();
})

document.querySelector('.button-4').addEventListener('click', ()=>{
  buttonToggle4 = !buttonToggle4;
  const element = document.querySelector('.button-4');
  element.classList.toggle('clicked-button-4')
  buttonToggle4  && myDiv.insertAdjacentHTML("beforeend", " <img src='images/heart.png' alt='' class='heart'>");
  !buttonToggle4 && document.querySelector('.heart').remove();
})


function setMood(){
  const today = dayjs(); 
  const lastDayCleanedArray = JSON.parse(localStorage.getItem('cleanedList')) || [];


  if(lastDayCleanedArray.length>0){
    const lastTimestamp = lastDayCleanedArray[lastDayCleanedArray.length - 1];
    const hoursSinceCleaning = dayjs(today).diff(dayjs(lastTimestamp), 'hour');
    if (hoursSinceCleaning >= 60) {
    document.querySelector('.facial-expression').innerHTML = '<img src="images/dead.png" class="emotion">';
    document.querySelector('.question').innerHTML = 'Oh no... your Tamagotchi died because it was too dirty. ';
  } 
  else if (hoursSinceCleaning >= 24) {
    document.querySelector('.question').innerHTML = 'Your Tamagotchi is looking a super dirty... Did you clean today?';
    document.querySelector('.facial-expression').innerHTML = '<img src="images/eye.png" class="eye"><img src="images/sad.png" class="emotion">';
  } 
  else {
    document.querySelector('.facial-expression').innerHTML = '<img src="images/eye.png" class="eye"><img src="images/happy.png" class="emotion">';
    document.querySelector('.question').innerHTML = 'Everything is sparkly clean!';
  }
  }

}

setMood();
