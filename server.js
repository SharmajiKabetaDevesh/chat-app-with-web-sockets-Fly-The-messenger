const express=require('express')
//express import kiya pehle
const app=express()
//express ka object banaya

const Port=process.env.PORT||3000
//ye code yato port dynamically assign karta hai ,matlab agar 3000port nahi chala to koi or assign kardega


const http=require('http').createServer(app);
//yaha pe http import kiya and server create kiya by passing the app

const io=require('socket.io')(http);


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})




app.use(express.static(__dirname+'/public'))
//ye ek middle ware hai jo public naam ke saare files ko invoke kar deta hai
http.listen(Port,(req,res)=>{
    console.log(`Listening on ${Port}`)
})

io.on('connection',(socket)=>{
    console.log('Connected...')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})
// io.onjab koi client connection establish karta hai WebSocket ka server ke sath,
//  tabhi 'connection' event trigger hota hai.
// baju mai jo function hai vo socket naam ka param leta hai jo, 
//  represent karta individual client connection.
//socket.on: Inside the connection event, it sets up an event listener for the 'message' event.
//This event allows clients to send messages to the server.
// socket.broadcast.emit('message', msg); broadcasts the received message (msg) to all connected clients except the sender. 
// This means that all other clients will receive the message, but the sender won't receive their own message.





