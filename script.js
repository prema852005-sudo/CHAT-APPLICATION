const socket = io("http://localhost:5000");

const messageInput = document.getElementById("message");

const chatBox = document.getElementById("chat-box");

const typing = document.getElementById("typing");

const themeBtn = document.getElementById("theme-btn");

let darkMode = true;

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  darkMode = !darkMode;

  themeBtn.innerText = darkMode ? "🌙" : "☀️";

});

function sendMessage(){

  const username =
  document.getElementById("username").value;

  const message = messageInput.value;

  if(username === "" || message === ""){
    alert("Enter name and message");
    return;
  }

  const time =
  new Date().toLocaleTimeString();

  socket.emit("send-message", {
    username,
    message,
    time
  });

  messageInput.value = "";

}

messageInput.addEventListener("keypress", () => {

  const username =
  document.getElementById("username").value;

  socket.emit("typing", username);

});

messageInput.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){
    sendMessage();
  }

});

socket.on("show-typing", (name) => {

  typing.innerText = `${name} is typing...`;

  setTimeout(() => {
    typing.innerText = "";
  },1000);

});

socket.on("receive-message", (data) => {

  const div = document.createElement("div");

  div.classList.add("message");

  div.innerHTML = `
    <strong>${data.username}</strong><br>
    ${data.message}
    <div class="time">${data.time}</div>
  `;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;

});