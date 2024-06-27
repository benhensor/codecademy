const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

// capitalise first letter in a sentence
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// capitalise first letter in each word
function capitalizeFirstLetterInEachWord(string) {
	return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

module.exports = {
  getRandomElement,
  capitalizeFirstLetter,
  capitalizeFirstLetterInEachWord
};
