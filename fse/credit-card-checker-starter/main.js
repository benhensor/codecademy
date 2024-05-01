// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
function validateCred(array) {
  // Check if the input is an array and contains only numbers
  if (!Array.isArray(array) || array.some(item => typeof item !== 'number')) {
    console.error('Invalid input: Input must be an array of numbers.');
    return false;  // Return false if the input is invalid
  }

  // Check for an empty array to avoid unnecessary processing
  if (array.length === 0) {
    console.error('Invalid input: Array is empty.');
    return false;
  }

  // Create a reversed copy of the array to apply the Luhn algorithm
  const reversedArray = array.slice().reverse();
  let sum = 0;

  // Loop through the array to sum the digits with Luhn's algorithm adjustments
  for (let i = 0; i < reversedArray.length; i++) {
    // Handle every second digit starting from the second position in the reversed array
    if (i % 2 === 1) {
      let doubled = reversedArray[i] * 2;
      // Subtract 9 from any result that is greater than 9
      if (doubled > 9) {
        doubled -= 9;
      }
      sum += doubled;
    } else {
      // Add other digits directly
      sum += reversedArray[i];
    }
  }

  // Check if the final sum modulo 10 is 0, indicating a valid number
  return sum % 10 === 0;
}


function findInvalidCards(nestedArray) {
  if (!Array.isArray(nestedArray)) {
    throw new TypeError("Input must be an array of card numbers.")
  }

  let invalidCards = []

  for (const card of nestedArray) {
      if (!Array.isArray(card) || card.some(isNaN)) {
        console.error("Invalid card data detected: ", card)
        continue
      }

      if (!validateCred(card)) {
        invalidCards.push(card)
      }
  }
  return invalidCards
}


function idInvalidCardCompanies(invalidCards) {
  let companiesWithInvalidCards = [];
  const companies = [
    { firstDigit: 3, name: 'Amex' },
    { firstDigit: 4, name: 'Visa' },
    { firstDigit: 5, name: 'Mastercard' },
    { firstDigit: 6, name: 'Discover' }
  ];

  for (const card of invalidCards) {
    let found = false;  // Flag to break the inner loop once company is found
    for (const company of companies) {
      if (card[0] === company.firstDigit) {
        if (!companiesWithInvalidCards.includes(company.name)) {
          companiesWithInvalidCards.push(company.name);
          found = true;  // Set flag to true as company is found
        }
        if (found) break;  // Break the inner loop
      }
    }
  }

  return companiesWithInvalidCards;
}



console.log(validateCred(invalid1))
console.log(findInvalidCards(batch))
console.log(idInvalidCardCompanies(findInvalidCards(batch)))