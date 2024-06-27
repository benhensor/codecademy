const express = require('express')
const app = express()

const { quotes } = require('./data')
const { getRandomElement, capitalizeFirstLetter, capitalizeFirstLetterInEachWord } = require('./utils')

const PORT = process.env.PORT || 4001

app.use(express.static('public'))

// get all quotes
app.get('/api/quotes', (req, res) => {
	try {
		if (req.query.person !== undefined) {
			const quotesByPerson = quotes.filter(
				quote => quote.person.toLowerCase() === req.query.person.toLowerCase()
			)
			res.status(200).send({ quotes: quotesByPerson })
		} else {
			res.status(200).send({ quotes: quotes })
		}
	} catch (error) {
		res.status(500).send({ error: 'Something went wrong!' })
	}
})

// get random quote
app.get('/api/quotes/random', (req, res) => {
	res.send({ quote: getRandomElement(quotes) })
})


// update a quote
app.put('/api/quotes/:id', (req, res) => {
	
})


// add new quotes
app.post('/api/quotes', (req, res) => {
	try {
    const newQuote = {
			quote: capitalizeFirstLetter(req.query.quote),
    	person: capitalizeFirstLetterInEachWord(req.query.person)
		}
    if (newQuote.quote && newQuote.person) {
      quotes.push(newQuote)
      res.status(201).send({ quote: newQuote })
    } else {
      res.status(400).send('Invalid request')
    }
	} catch (error) {
		res.status(500).send({ error: 'Something went wrong!' })
	}
})

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
