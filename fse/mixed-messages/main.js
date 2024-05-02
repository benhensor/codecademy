// Arrays and functons for generating random quotes

const historicalFigures = [
  "Socrates",
  "Cleopatra",
  "Leonardo da Vinci",
  "Galileo Galilei",
  "William Shakespeare",
  "Isaac Newton",
  "Mary Wollstonecraft",
  "Confucius",
  "Jane Austen",
  "Charles Darwin",
  "Albert Einstein",
  "Simone de Beauvoir",
  "Friedrich Nietzsche",
  "Virginia Woolf",
  "Karl Marx",
  "Nikola Tesla",
  "George Orwell",
  "Mikhail Bakunin",
  "Harriet Tubman",
  "Rumi",
  "Plato",
  "Aristotle",
  "Immanuel Kant",
  "Martin Luther King Jr.",
  "Mahatma Gandhi",
  "Nelson Mandela",
  "Marie Curie",
  "Ada Lovelace",
  "Thomas Jefferson",
  "Sun Tzu",
  "Confucius",
  "Homer"
];

const adjectives = [
  'solitary',
  'independent',
  'autonomous',
  'self-sufficient',
  'unilateral',
  'gormless'
]

const objects = [
  'bath chewer',
  'sock snatcher',
  'teacup wrestler',
  'lamp whisperer',
  'book nibbler',
  'pillow wrangler',
  'dancing llama',
  'pirate squirrel',
  'space hamster',
  'ninja cupcake',
  'dirty penguin'
]

const option1Words = [
  'grow antennae',
  'find the lost city',
  'catcvh the moon',
  'win the snail race',
  'unlock the portal',
  'reverse gravity',
  'feel silly'
]

const option2Words = [
  'sing opera',
  'turn into jelly',
  'whistle like a kettle',
  'bake a sponge',
  'can knit a jumper',
  'eat 18 curries',
  'produce goo'
]

const actions = [
  'dance widly',
  'spin in circles',
  'leap over puddles',
  'chase butterflies',
  'shout obscenities',
  'grumble',
  'fall over',
  'fly away',
  'transform',
  'morph',
  'evolve',
  'emerge',
  'ascend'
]

const attributes = [
  'trembling',
  'gibberish',
  'tiny rocks',
  'wooden spoon arms',
  'more than words',
  'seasoning',
  'befuddlement',
  'glitter'
]

const tranformations = [
  "always prented to like",
  'pretend to be in your dreams',
  'suspect you might be',
  'used to think you were',
  'are secretly afraid of',
  'wink at in the mirror',
  'thought was okay'
]

// Get a random value from any array
function getRandomWord(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

// Generate a random quote
function generateQuote() {
  const adjective = getRandomWord(adjectives)
  const object = getRandomWord(objects)
  const option1 = getRandomWord(option1Words)
  const option2 = getRandomWord(option2Words)
  const attribute = getRandomWord(attributes)
  const action1 = getRandomWord(actions)
  const action2 = getRandomWord(actions)
  const transformation = getRandomWord(tranformations)

  // Randomly choose a quote to return
  const quotes = [
    `You are not my ${adjective} ${object}!`,
    `Amateurs practice until they ${option1}, professionals practice until they ${option2}. Always practice like a ${object}!`,
    `It takes ${attribute} to ${action1} and ${action2} into who you ${transformation}.`
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
}


// Image slider with modal
let sliderContainer = document.querySelector('.slider-container');
let slider = document.querySelector('.slider');
let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;

// set background images
images.forEach((image, index) => {
  image.style.backgroundImage = `url(./assets/img/${index + 1}.webp)`;
});

// clone items for infinite scroll
items.forEach(item => {
  let clone = item.cloneNode(true);
  clone.classList.add('clone');
  slider.appendChild(clone);
  clones.push(clone);
});

// get full width of the slider
function getClonesWidth() {
  let width = 0;
  clones.forEach(clone => {
    width += clone.offsetWidth;
  });
  return width;
}

// get current scroll position
function getScrollPos() {
  return window.scrollY;
}

// update scroll position
function scrollUpdate() {
  if (window.innerWidth > 768) { // disable scroll on mobile
    sliderContainer.style.overflow = 'hidden';
    scrollPos = getScrollPos();
    if (clonesWidth + scrollPos >= sliderWidth) {
      window.scrollTo({top: 1})
    } else if (scrollPos <= 0) {
      window.scrollTo({top: sliderWidth - clonesWidth - 1})
    }
    slider.style.transform = `translateX(${-window.scrollY}px)`;
    requestAnimationFrame(scrollUpdate); // call scrollUpdate() on next available frame
  } else {
    sliderContaier.style.overflow = 'scroll';
  }  
}

// modal

let backdrop;
let modal;

// Setup event listener on the slider container
slider.addEventListener('click', function(event) {
  // Traverse up from the target to find the closest .slider-item
  let clickedItem = event.target.closest('.slider-item');
  if (clickedItem) {
    let index = Array.from(slider.querySelectorAll('.slider-item')).indexOf(clickedItem);
    openModal(index % items.length); // Use modulo to handle clones' indexes
  }
});

// Open and close modal functions
function openModal(index) {
  let quote = generateQuote()
  let attributedTo = getRandomWord(historicalFigures)

  // Create backdrop and modal elements
  backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  document.body.appendChild(backdrop);

  modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <img src="./assets/img/${index + 1}.webp" alt="image">
    <div class="quote-container">
    <p class="quote">"${quote}"</p>
    <p class="quote-author">${attributedTo}</p>
    </div>
  `;
  document.body.appendChild(modal);

  backdrop.addEventListener('click', closeModal);
}

function closeModal() {
  backdrop.remove();
  modal.remove();
}

// event listeners

// ensure slider width is correct on resize
window.addEventListener('resize', onLoad);

// scroll event listener
function onLoad() {
  calculateDimensions();
  window.scrollTo({top: 1});
  document.body.style.height = `${sliderWidth}px`;
  scrollUpdate();
}

// calculate dimensions
function calculateDimensions() {
  sliderWidth = slider.getBoundingClientRect().width;
  clonesWidth = getClonesWidth();
}

onLoad();