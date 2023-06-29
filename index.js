const express = require('express')


const app = express()
const cors = require("cors")



app.use(express.json())
app.use(express.static('build'))
app.use(cors())
  



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//works
app.get('/', (request, response) => {
  response.send('<h1>Bruh World!</h1>')
})


//works
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    
    const info = "<p>Phonebook has info for "
     + persons.length + " people </p> <br/>" + new Date()

    response.send(info)
  })

//works
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



//getter
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })


  //deleter
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  //adder (starts with id generator)
  const generateId = () => {
    const randId = Math.floor(Math.random() * 2000)
    return randId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
        //has to stop post method so return...
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
    response.json(person)
  })