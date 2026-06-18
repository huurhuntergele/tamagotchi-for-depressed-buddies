import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let cleanedList = JSON.parse(localStorage.getItem('cleanedList')) || [];
cleanedList.length > 0 && updateLastCleanedDayText();
const tamagotchi = document.querySelector('.tamagotchi');

function updateLastCleanedDayText(){
  document.querySelector(".last-cleaned-day").innerHTML =
  `Last time, you cleaned on ${dayjs(cleanedList.at(-1)).format('dddd, MMMM DD, HH:mm')}`;
}

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
      updateLastCleanedDayText();
      setMood();
    });

    noButton.addEventListener('click', () => {
      document.querySelector('.question').innerHTML = 'Omg go clean girl';
      document.querySelector('.button-container').innerHTML = '';
    });
  }
}


document.querySelector('.new-log').addEventListener('click', () => {
  setMood(); 
  
  const lastTimestamp = cleanedList.at(-1);
  const hoursSinceCleaning = lastTimestamp ? dayjs().diff(dayjs(lastTimestamp), 'hour') : 0;

  if (hoursSinceCleaning < 60) {
    document.querySelector('.question').innerHTML = 'Did you clean today?';
    document.querySelector('.button-container').innerHTML = '<button class="yes-button">Yes!</button><button class="no-button">No</button>';
    attachButtonListeners();
  } else {
    document.querySelector('.question').innerHTML = 'It is too late. Borichan is gone. ';
    document.querySelector('.button-container').innerHTML = ''; 
  }
});


const buttonToggles = [{
  state: false,
  className: '.clothes',
  image: 'images/clothes.png' 
},{
  state: false,
  className: '.headphone',
  image: 'images/headphone.png'
},{
  state: false,
  className: '.eyeglass',
  image: 'images/eyeglass.png'
},{
  state: false,
  className: '.heart',
  image: 'images/heart.png'
}];

buttonToggles.forEach((button, index)=>{
  document.querySelector(`.button-${index+1}`).addEventListener('click', ()=>{
  button.state = !button.state;
  const element = document.querySelector(`.button-${index+1}`);
  element.classList.toggle(`clicked-button-${index+1}`)
  const image = `<img src="${button.image}" alt='' class= "${button.className.replace('.','')}">`
  button.state && tamagotchi.insertAdjacentHTML("beforeend", image);
  !button.state && document.querySelector(button.className)?.remove() 
})
})




function setMood(){
  if(cleanedList.length>0){
    const lastTimestamp = cleanedList[cleanedList.length - 1];
    const hoursSinceCleaning = dayjs().diff(dayjs(lastTimestamp), 'hour');
    if (hoursSinceCleaning >= 60) {
    document.querySelector('.facial-expression').innerHTML = '<img src="images/dead.png" class="emotion">';
    document.querySelector('.question').innerHTML = 'Oh no... your Tamagotchi died. ';
  } 
  else if (hoursSinceCleaning >= 24) {
    document.querySelector('.question').innerHTML = 'Your Tamagotchi is looking a super dirty.';
    document.querySelector('.facial-expression').innerHTML = '<img src="images/eye.png" class="eye"><img src="images/sad.png" class="emotion">';
  } 
  else {
    document.querySelector('.facial-expression').innerHTML = '<img src="images/eye.png" class="eye"><img src="images/happy.png" class="emotion">';
    document.querySelector('.question').innerHTML = 'Everything is sparkly clean!';
  }
  }

}

setMood();
