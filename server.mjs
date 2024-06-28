import 'dotenv/config'
import express from "express"

const app = express()

const PORT = process.env.PORT
const projectDirectory = __dirname;
console.log(__dirname)
/* app.get('/products', (req, res) => {
    console.log(projectDirectory)
    res.sendFile()
}) */


//app.listen(process.env.PORT , () => console.log(`Server started on http://localhost:${process.env.PORT}`))