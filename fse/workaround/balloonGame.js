class Player {
  constructor(name, hitsPerMinute) {
    this.name = name;
    this.hitsPerMinute = hitsPerMinute;
    this.balloonCount = 100;
  }

  status() {
    console.log(`Player: ${this.name} -- Balloons Left: ${this.balloonCount}`)
  }
}

// Write function below
const p1 = new Player('Charlie', 4)
const p2 = new Player('Lola', 5)

function balloonAttack(p1, p2) {
  const p1Hits = p1.hitsPerMinute * 10
  const p2Hits = p2.hitsPerMinute * 10

  p1.balloonCount -= p2Hits
  p2.balloonCount -= p1Hits

  if (p1.balloonCount > p2.balloonCount) {
    return p1.name
  } else if (p2.balloonCount > p1.balloonCount) {
    return p2.name
  } 
  return 'Tie!'
  
}

console.log(balloonAttack(p1, p2))