/**
 * @author Isaac Ssemugenyi
 * @description Simple nodejs application with express that users and array as a persistence layer
*/

const express = require('express');

const app = express();
app.use(express.json());

let users = []
let id = 0

app.get('/', (req, res) => {
    res.status(200).json(users);
})

app.post('/', (req, res) => {
    id++
    req.body.userId = id
    users.push(req.body);
    res.status(201).json({message: 'User added'})
})

app.put('/:userId', (req, res)=>{
    const userIndex = users.findIndex(user => user.userId == req.params.userId)
    req.body.userId = req.params.userId
    users.splice(userIndex, 1, req.body)
    res.status(200).json(req.body)
})

app.delete('/:userId', (req, res) => {
    const userIndex = users.findIndex(user => user.userId == req.params.userId)
    users.splice(userIndex, 1)
    res.status(200).json({message: "User successfully deleted"})
})


app.listen(3000, () => console.log('Listening on ports 3000'))