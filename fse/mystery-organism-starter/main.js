// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    mutate() {
      const selectedIndex = Math.floor(Math.random() * this.dna.length) // Randomly select a base index
      const currentBase = dna[selectedIndex]; // Identify the current base
      let newBase = '';

      // Generate a new base different from the current base
      do {
        newBase = returnRandBase()
      } while (newBase === currentBase);

      // Replace the current base with the new base
      dna[selectedIndex] = newBase;

      return dna; // Return the mutated DNA
    },
    compareDNA(pAequor) {
      const dnaToCompare = pAequor.dna
      let count = 0
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === dnaToCompare[i]) {
          count++
        }
      }
      // calculate %
      const percentage = (count / this.dna.length) * 100
      return `Specimen ${pAequor.specimenNumber} and specimen ${this.specimenNumber} have ${percentage.toFixed(2)}% DNA in common.`
    },
    willLikelySurvive() {
      const organism = this.dna.filter(base => base === 'C' || base === 'D')
      return organism.length / this.dna.length >= 0.6
    }
  }
}



const survivingOrganisms = []
let orgIdCounter = 1

while (survivingOrganisms.length < 30) {
  let organism = pAequorFactory(orgIdCounter, mockUpStrand())
  if (organism.willLikelySurvive()) {
    survivingOrganisms.push(organism)
  }
  orgIdCounter++
}

console.log(survivingOrganisms)









