// main.js
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpDYHO1O1ExyuySO7MJfzkbBXELIxL1IM",
    authDomain: "distributed-chat-demo.firebaseapp.com",
    databaseURL: "https://distributed-chat-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "distributed-chat-demo",
    storageBucket: "distributed-chat-demo.firebasestorage.app",
    messagingSenderId: "543438888822",
    appId: "1:543438888822:web:9126f9823a359cb6546457",
    measurementId: "G-NGSQCGC8GJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// References
const messagesRef = db.ref("messages");
const activeNodesRef = db.ref("activeNodes");

// Generate unique node ID for this client
const nodeId = "Node-" + Math.floor(Math.random() * 10000);

// Mark node as active when tab opens
activeNodesRef.child(nodeId).set(true);

// Remove node when tab closes
window.addEventListener("beforeunload", function () {
    activeNodesRef.child(nodeId).remove();
});

// Listen for changes in active nodes
activeNodesRef.on("value", function (snapshot) {
    const activeData = snapshot.val();
    const count = activeData ? Object.keys(activeData).length : 0;
    document.getElementById("activeNodes").textContent = count;
});

// Send message
function sendMsg() {
    const msg = document.getElementById("msgInput").value;
    if (msg.trim() !== "") {
        messagesRef.push({ text: msg });
        document.getElementById("msgInput").value = "";
    }
}

// Listen for new messages
messagesRef.on("child_added", function (snapshot) {
    const li = document.createElement("li");
    li.textContent = snapshot.val().text;
    document.getElementById("messages").appendChild(li);
});
