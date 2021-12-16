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
    document.getElementById('selected-Up-In').style.marginLeft = "0px"
    document.getElementById('selected-Up-In').style.width = "100px"
    document.getElementById('selected-Up-In').style.transition = "0.5s"
})

document.getElementById('log-In-Text').addEventListener("click", function() {
    document.getElementById('selected-Up-In').style.marginLeft = "110px"
    document.getElementById('selected-Up-In').style.width = "77px"
    document.getElementById('selected-Up-In').style.transition = "0.5s"
    setTimeout(function() {
        window.location = "LogIn.html"
    }, 500)
})
}

function signUp() {
    var Name = document.getElementById("Name-Sign-Up").value;
    var Password = document.getElementById("Password-Sign-Up").value;

    if(Name != "" && Password != "") {
        var Name = document.getElementById("Name-Sign-Up").value;
        var Password = document.getElementById("Password-Sign-Up").value;
        var finalName = Name.charAt(0).toUpperCase() + Name.slice(1)

        setTimeout(function() {
            firebase.database().ref().child("users").orderByChild("Name").equalTo(finalName).on("value", function(snapshot) {
                if (snapshot.exists()) {
                    document.getElementById('error1').style.display = "flex";
                    document.getElementById('error').style.display = "none";
                } else {
                    var finalName = Name.charAt(0).toUpperCase() + Name.slice(1)
                    localStorage.setItem("Name", finalName);
                    localStorage.setItem("Password", Password);

                    document.getElementById("Name-Sign-Up").value = "";
                    document.getElementById("Password-Sign-Up").value = "";
                    document.getElementById('error').style.display = "none";

                    firebase.database().ref("users/"+ finalName).set({
                        "Name": finalName,
                        "Password": Password,
                    });
                    setTimeout(function() {
                        window.location = "index.html"
                    },200)
                }
            });
        }, 200)
    } else {
        document.getElementById('error').style.display = "flex";
        document.getElementById('error1').style.display = "none";
    }
    return false;
}