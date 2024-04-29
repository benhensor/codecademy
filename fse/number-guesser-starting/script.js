let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
function generateTarget() {
  return Math.floor(Math.random()*9)
}

function compareGuesses(human, computer, target) {
  const humanRangeToTarget = Math.abs(human - target)
  const computerRangeToTarget = Math.abs(computer - target)
  return humanRangeToTarget <= computerRangeToTarget
}

function updateScore(winner) {
  winner === 'human' ? humanScore++ : computerScore++
}

function advanceRound() {
  currentRoundNumber++
}


