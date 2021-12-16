const chatbox = document.getElementById("chatbox")
chatbox.scrollTo({ top: 9999999999999, behavior: 'auto' });

var Name = localStorage.getItem("Name")
var Password = localStorage.getItem("Password")

if(Name == null || Password == null) {
    window.location = "SignUp.html"
} else {
    var myName = Name;

    document.getElementById("Please-Type-Something-Error").style.display = "none";

    function sendMessage() {
        var textBox = document.getElementById('message').value
        if(textBox != "" && textBox != " " && textBox != "  " && textBox != "   ") {
            var d = new Date();
        
            var h = (d.getHours()<10?'0':'') + d.getHours();
            var m = (d.getMinutes()<10?'0':'') + d.getMinutes();
        
            var timeStamp = h+":"+m;
            let message =document.getElementById("message").value
            firebase.database().ref("messages").push().set({
                "timeStamp": timeStamp,
                "sender": myName,
                "message": message,
                "messageType": "message"
             });
             let message1=document.getElementById("message")
             const chatbox = document.getElementById("chatbox")
             chatbox.scrollTo({ top: 9999999999999, behavior: 'auto' });
             message1.value=""
             return false;
        } else {
            document.getElementById("Please-Type-Something-Error").style.display = "flex";
            document.getElementById("Please-Type-Something-Error").classList.add("pop-Up")
            setTimeout(function() {
                document.getElementById("Please-Type-Something-Error").classList.remove("pop-Up")
            }, 1000)

            setTimeout(function() {
                document.getElementById("Please-Type-Something-Error").style.display = "none";
            }, 1750)
            return false;
        }
    }

    setInterval(function() {
        var textBox = document.getElementById('message').value
        if(textBox == "") {
            document.getElementById("button").classList.add("no-Send")
        } else {
            document.getElementById("button").classList.remove("no-Send")
        }
    }, 100)

    function openCamera() {
        document.getElementById("anim-Open-Camera").style.animation = "open-Camera .75s forwards"
        setInterval(function() {
            window.location = "camera.html"
        }, 800)
    }

    document.getElementById('log-Out').addEventListener("click", function() {
        localStorage.clear();
        window.location = "SignUp.html"
    })
}








// var counter = 0;
// var counter1 = 0;

// document.getElementById("TypingYesNo").style.display = "none"


// //Checking if you are typing
// setInterval(function() {
//     const textValue = document.getElementById("message").value;
//     var typing = false;

//     if(textValue != "") {
//         typing = true;
//         if(counter1 > 1 && counter1 < 3) {
//             counter = 0;
//         }
//         counter1++;
//     } 

//     if(textValue == "") {
//         typing = false;
//         firebase.database().ref("Typing/info").set({
//             "Typer":"",
//             "Typing":false
//         });
//         counter1 = 0;
//     }

//     if(typing = true && counter == 0) {
//         firebase.database().ref("Typing/info").set({
//             "Typer":myName,
//             "Typing":true
//         });

//         counter = 1
//         // 
//     }
// }, 100)

// var counter2 = 0

// setInterval(function() {
//     setTimeout(() => {  
//         firebase.database().ref("Typing").on("child_changed", function (snapshot) {
//             var TheTyper = snapshot.val().Typer; 
//             var Typing = snapshot.val().Typing;
    
//             if(Typing == "true") {
//                 console.log("Typing is True");
//             }
//             // const chatbox = document.getElementById("chatbox")
//             // chatbox.scrollTo({ top: 9999999999999, behavior: 'auto' });
//         });
//     }, 200);
// },100)






// setTimeout(() => {  
//     firebase.database().ref("Typing").on("child_changed", function(snapshot) {
//         var TheTyper = snapshot.val().Typer; 
//         if(TheTyper == "") {
//             document.getElementById("TypingYesNo").remove()
//         }
//     })
// }, 600);

// setTimeout(() => {  
//     firebase.database().ref("Typing").on("child_added", function (snapshot) {
//     var TheTyper = snapshot.val().Typer; 
//     if(TheTyper != "" && TheTyper != myName) {
//         var html = "";
//         html += "<div id='TypingYesNo'>";
//         html += "Typing"
//         html += "</div>";
//         document.getElementById("messages").innerHTML += html;
//     }
//     const chatbox = document.getElementById("chatbox")
//     chatbox.scrollTo({ top: 9999999999999, behavior: 'auto' });
//     }); 
// }, 200);
// counter = 1;