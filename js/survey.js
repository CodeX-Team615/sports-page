'use strict';

let Container = document.querySelector('section');

let image1 = document.querySelector('section img:first-child');

let image2 = document.querySelector('section img:nth-child(2)');

let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let maxClicks = 15;

let imageCount = 6;
const state = {
  productsArray: [],
  indexArray: [],
};

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.productsArray.length);
}

function productRenders() {
  while (state.indexArray.length < imageCount) {
    let randomNumber = getRandomNumber();
    if (!state.indexArray.includes(randomNumber)) {
      state.indexArray.push(randomNumber);
    }
  }

  let product1 = state.indexArray.shift();
  let product2 = state.indexArray.shift();
  let product3 = state.indexArray.shift();

  image1.src = state.productsArray[product1].src;
  image2.src = state.productsArray[product2].src;
  image3.src = state.productsArray[product3].src;

  image1.alt = state.productsArray[product1].name;
  image2.alt = state.productsArray[product2].name;
  image3.alt = state.productsArray[product3].name;

  let localinfo = JSON.parse(localStorage.getItem('myProd'));

  if (localinfo) {
    localinfo[product1].views++;
    localinfo[product2].views++;
    localinfo[product3].views++;
    localStorage.setItem('myProd', JSON.stringify(localinfo));
  } else {
    state.productsArray[product1].views++;
    state.productsArray[product2].views++;
    state.productsArray[product3].views++;
  }
}

function newProductClick(event) {
  let localinfo = JSON.parse(localStorage.getItem('myProd'));

  if (event.target === Container) {
    alert('Please click on a image');
  }

  clicks++;

  let productClick = event.target.alt;
  for (let i = 0; i < state.productsArray.length; i++) {
    if (productClick === state.productsArray[i].name) {
      if (localinfo) {
        localinfo[i].clicks++;
        localStorage.setItem('myProd', JSON.stringify(localinfo));
      }
      state.productsArray[i].clicks++;
      break;
    }
  }

  if (clicks === maxClicks) {
    Container.removeEventListener('click', newProductClick);

    if (!localinfo) {
      let stringifiedProd = JSON.stringify(state.productsArray);

      localStorage.setItem('myProd', stringifiedProd);
    }
    renderChart();
  } else {
    productRenders();
  }
}

function renderChart() {
  let productName = [];
  let productClick = [];
  let productView = [];
  let localinfo = JSON.parse(localStorage.getItem('myProd'));

  for (let i = 0; i < localinfo.length; i++) {
    productName.push(localinfo[i].name);

    productClick.push(localinfo[i].clicks);

    productView.push(localinfo[i].views);
  }

  const chartData = {
    labels: productName,
    datasets: [
      {
        label: 'Views',
        data: productView,
        backgroundColor: ['rgba (255,98,140, 0.4'],
        borderColor: ['rgb(255,98,131'],
        borderWidth: 1,
      },
      {
        label: 'Click(s)',
        data: productClick,
        backgroundColor: ['rgba(200,140,72, 0.2'],
        borderColor: ['rgb(255, 158, 64)'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  let chartCanvas = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(chartCanvas, config);
}
let Burks = new Product('Burks Jersey', '/../assets/burksJersey.jpg');
let Cubs = new Product('Cubs Hat', '/../assets/cubsHat.jpg');
let Dodgers = new Product('Dodgers Hat', '/../assets/dodgersHat.jpg');
let Frisbee = new Product('Frisbee Jersey', '/../assets/frisbeeJersey.jpg');
let Yeezy = new Product('Grey Yeezy', '/../assets/greyYeezy.jpg');
let Kobe = new Product('Kobe Jersey', '/../assets/kobeJersey.jpg');
let Lebron = new Product('Lebron Jersey', '/../assets/lebronJersey.jpg');
let Luka = new Product('Luka Jersey', '/../assets/lukaJersey.jpg');
let Raiders = new Product('Raiders Hat', '/../assets/raidersHat.jpg');
let Raptors = new Product('Raptors Hat', '/../assets/raptorsHat.jpg');
let redNike = new Product('Red Domino', '/../assets/redDomino.jpg');
let redDunks = new Product('Red Dunks', '/../assets/redDunk.jpg');
let Retro11 = new Product('Retro Eleven', '/../assets/retroEleven.jpg');
let Retro07 = new Product('Retro Seven', '/../assets/retroSeven.jpg');

state.productsArray.push(
  Burks,
  Cubs,
  Dodgers,
  Frisbee,
  Yeezy,
  Kobe,
  Lebron,
  Luka,
  Raiders,
  Raptors,
  redNike,
  redDunks,
  Retro11,
  Retro07
);

productRenders();
Container.addEventListener('click', newProductClick);
