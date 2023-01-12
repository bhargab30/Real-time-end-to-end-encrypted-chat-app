import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {getAuth,getRedirectResult,GoogleAuthProvider,signInWithRedirect,signInWithPopup} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import { getDatabase, set, ref, push, child, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

const firebaseConfig ={
  apiKey: "AIzaSyCzfTl0gL0pBKl5IjobKZkyh7l9d-fXWoc",
  authDomain: "letschat-593cf.firebaseapp.com",
  databaseURL: "https://letschat-593cf-default-rtdb.firebaseio.com",
  projectId: "letschat-593cf",
  storageBucket: "letschat-593cf.appspot.com",
  messagingSenderId: "495174547501",
  appId: "1:495174547501:web:6714bc0b5695ccb92fe0a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');

const messageContainer = document.getElementById("msgContainer");

var audio = new Audio("sms.mp3");



const append = (message,pos,photo) =>{
  var msgHTML;
  console.log(photo);
  msgHTML = `<div class="msgCont left">
                  <img class = "propic" src=${photo}>
                  <div class="message leftMsg">${message}</div>
                </div>`;
  if(pos === 'right'){
    msgHTML = `<div class="msgCont right">
                  <div class="message rightMsg">${message}</div>
                </div>`;
  }
    
  
  messageContainer.insertAdjacentHTML('beforeend',msgHTML);
};




const log_but = document.getElementById('log_in');

const auth = getAuth(app);
const provider = new GoogleAuthProvider(app)

var userDetails={};

log_but.addEventListener('click',()=>{

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    userDetails = user;
    const name_of_user = userDetails.displayName;
    const arr = name_of_user.split(" ");
    const username = arr[0];
    const logPage = document.querySelector('.login-page');
    logPage.classList.remove("active");
    const id = push(child(ref(database),'message')).key;
    set(ref(database,'messages/'+id),{
      uid: userDetails.uid,
      name: username,
      message : `joined the chat`,
      photo: userDetails.photoURL,
      type: "logged"
    });

    const newMsg = ref(database,'messages/');

    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const msg = messageInput.value;
      const ids = push(child(ref(database),'message')).key;
    
      set(ref(database,'messages/'+ids),{
        uid: userDetails.uid,
        name: username,
        message : msg,
        photo: userDetails.photoURL,
        type: "msgs"
      });
      messageInput.value = "";
    });

  onChildAdded(newMsg,(data) =>{
    if(data.val().type === "msgs"){
      if(data.val().uid != userDetails.uid){
        //append(`${username} joined the chat`,'joined_left');
          append(`${data.val().name}: ${data.val().message}`,'left',`${data.val().photo}`);
      }
      else{
        append(`You: ${data.val().message}`,'right',`${data.val().photo}`);
      }
    }
    
    messageContainer.scrollTop = messageContainer.scrollHeight;
    });

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


});


