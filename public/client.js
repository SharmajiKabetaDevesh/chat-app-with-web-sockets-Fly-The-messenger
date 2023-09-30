const textarea=document.querySelector('#textarea')

const messageArea=document.querySelector('.message__area')


const socket=io();
// This line initializes a WebSocket connection to the server.
//  It assumes that the server 
// is running and listening for Socket.IO connections.

let userName;
do{
    userName=prompt('Enter your userName bud')
}while(!userName);

// This block of code prompts the user to enter their userName.
//  It keeps prompting until a non-empty userName is provided.

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})
// This sets up an event listener on the textarea element.
// It listens for the keyup event and checks if the key pressed is 'Enter'. If so, it 
// calls the sendMessage function with the content of the textarea.

function sendMessage(message){
    let msg={
        user:userName,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //sending to server
    socket.emit('message',msg)

}
// The sendMessage function constructs a message object
//  with the user's userName and the message content. It then 
//  appends this message to the message area as an outgoing
//   message, clears the textarea, scrolls to the bottom,
//    and emits 
// the message to the server using socket.emit('message', msg).

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`

    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

// Creating a New Element:

// let mainDiv = document.createElement('div');:
// This line creates a new div element in the DOM.
// Determining the CSS Class userName:

// let classuserName = type;: This line 
//assigns the value of the type parameter to the 
//variable classuserName. In your chat application, 
//type can be either 'incoming' or 'outgoing'.
// Adding CSS Classes:

// mainDiv.classList.add(classuserName, 'message');:
// This line adds one or more class userNames to the newly created div. In this case, it adds the class userName determined by type (either 'incoming' or 'outgoing') and 'message'.
// javascript
// Copy code
//     // Define the HTML markup for the message
//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `;
// Explanation:

// Creating the Markup:

// Here, a string markup is defined using a template 
//literal. It includes two placeholders ${msg.user} and 
//${msg.message}. These will be replaced with the actual
 //user userName and message content.
// Using Template Literals:

// Template literals allow you to embed 
//expressions within backticks (`). In this case, 
//it's used to create a multi-line string with placeholders.
// javascript
// Copy code
//     // Set the inner HTML of the div to the defined markup
//     mainDiv.innerHTML = markup;
// Explanation:

// Setting Inner HTML:
// mainDiv.innerHTML = markup;: This line sets the 
//content of the div element to the HTML defined in the
// markup string.
// javascript
// Copy code
//     // Append the new div to the message area
//     messageArea.appendChild(mainDiv);
// }
// Explanation:

// Appending the Element:
// messageArea.appendChild(mainDiv);: 
//This line appends the newly created div element (which now contains the formatted message) to the messageArea. This effectively adds the message to the chat interface.
// In summary, this function creates 
//a new div element, sets its 


socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})
// This code sets up an event listener on the socket 
// for the 'message' event. When a message is received 
// from the server, it calls the appendMessage function 
// with the message object and the type 'incoming'.
//  It then scrolls to the bottom of the message area.

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}
// This function scrolls the message area to the bottom
//  by setting scrollTop to scrollHeight, 
// which is the height of the entire scrollable content.


