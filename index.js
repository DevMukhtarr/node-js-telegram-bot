require("dotenv").config()
const express = require('express')
const axios = require("axios")
const app = express()

const { TELEGRAM_TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const URI = `/webhook/${TELEGRAM_TOKEN}`
const WEBHOOK_URL = SERVER_URL+URI

app.use(express.urlencoded({ 
    extended: false 
}))

app.use(express.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) =>{
    // console.log(req.body)

    const chatId = req.body.message.chat.id
    const message = req.body.message.text
    const user = req.body.message.chat.username

    // console.log(chatId)

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `hello ${user}`
    })
    return res.send()
})

app.listen(process.env.PORT || 5000, async () =>{
    console.log(`app is running on port`, process.env.PORT  || 5000);
    await init()
})


