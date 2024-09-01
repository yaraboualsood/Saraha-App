import express from 'express'
import connectionDB from './DB/connectionDB.js'
import userRouter from './src/modules/users/user.routes.js'
import messageRouter from './src/modules/messages/message.routes.js'
import { AppError } from './utils/classError.js'
import { globalErrorHandler } from './utils/globalErrorHandling.js'

const app = express()
const port = 3000

connectionDB()

app.use(express.json())

app.use('/users', userRouter)

app.use('/messages', messageRouter)


app.use('*', (req, res, next) => {
    return next(new AppError(`Invalid url: ${req.originalUrl}`, 404))
})

//global error handling middleware
app.use(globalErrorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))