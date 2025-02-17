import app from './src/app.js';
import {PORT} from "./env.js"
import connectToDb from './src/db/mongodb.js';

app.listen(PORT,async()=>{
    console.log(`Server is running on  localhost://${PORT}`)
    await connectToDb()
})