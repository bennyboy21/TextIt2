if(screen.width < 500) {
        document.getElementById('sign-Up-Text').addEventListener("click", function() {
        document.getElementById('selected-Up-In').style.marginLeft = "calc(50% - 95px)"
        document.getElementById('selected-Up-In').style.width = "100px"
        document.getElementById('selected-Up-In').style.transition = "0.5s"
        setTimeout(function() {
            window.location = "SignUp.html"
        }, 500)
    })
    
    document.getElementById('log-In-Text').addEventListener("click", function() {
        document.getElementById('selected-Up-In').style.marginLeft = "calc(50% + 15px)"
        document.getElementById('selected-Up-In').style.width = "77px"
        document.getElementById('selected-Up-In').style.transition = "0.5s"
        setTimeout(function() {
            window.location = "LogIn.html"
        }, 500)
    })
} else if(screen.width > 499) {
    document.getElementById('sign-Up-Text').addEventListener("click", function() {
        document.getElementById('selected-Up-In').style.marginLeft = "-110px"
        document.getElementById('selected-Up-In').style.width = "100px"
        document.getElementById('selected-Up-In').style.transition = "0.5s"
        setTimeout(function() {
            window.location = "SignUp.html"
        }, 500)
    })
    
    document.getElementById('log-In-Text').addEventListener("click", function() {
        document.getElementById('selected-Up-In').style.marginLeft = "110px"
        document.getElementById('selected-Up-In').style.width = "77px"
        document.getElementById('selected-Up-In').style.transition = "0.5s"
    })
}

// screen.width;
function logIn() {
    var Name = document.getElementById("Name-Log-In").value;
    var Password = document.getElementById("Password-Log-In").value;
    var finalName = Name.charAt(0).toUpperCase() + Name.slice(1)

    if(Name != "" && Password != "") {
        setTimeout(function() {
            firebase.database().ref().child("users").orderByChild("Name").equalTo(finalName).on("value", function(snapshot) {
                if (snapshot.exists()) {
                    firebase.database().ref("users/" + finalName).on("value", function(snapshot) {
                        var previousPassword = snapshot.val().Password;
                        setTimeout(function() {
                            if(previousPassword == Password) {
                                localStorage.setItem("Name", finalName);
                                localStorage.setItem("Password", Password);
                                setTimeout(function() {
                                    window.location = "index.html"
                                }, 200)
                            } else if(previousPassword != Password) {
                                console.log("Error")
                                document.getElementById('error').style.display = "none";
                                document.getElementById('error1').style.display = "flex";
                                document.getElementById('error2').style.display = "none";
                            }
                        },300)
                    })
                }else{
                    document.getElementById('error').style.display = "none";
                    document.getElementById('error1').style.display = "none";
                    document.getElementById('error2').style.display = "flex";
                }
            });
        }, 200)
    } else {
        document.getElementById('error').style.display = "flex";
        document.getElementById('error1').style.display = "none";
        document.getElementById('error2').style.display = "none";
    }
    return false;
}