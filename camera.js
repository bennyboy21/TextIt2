(function() {

  const firebaseConfig = {
    apiKey: "AIzaSyCI5ZNumzP32DT_AA5EI1fF8J3DoM_VgY8",
    authDomain: "text-it-wtcs.firebaseapp.com",
    projectId: "text-it-wtcs",
    storageBucket: "text-it-wtcs.appspot.com",
    messagingSenderId: "185965497550",
    appId: "1:185965497550:web:339b438a78ab825dc5d49f",
    measurementId: "${config.measurementId}"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var myName = localStorage.getItem("Name");
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
  
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream
  
    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
  
    var streaming = false;
  
    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.
  
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var sendButton = null;
    var retakeButton = null;
    var data = null;
  
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('start-button');
      sendButton = document.getElementById('send-Button');
      retakeButton = document.getElementById('retake-Button');

      sendButton.style.display = "none";
      retakeButton.style.display = "none";


      canvas.style.display = "none";
      photo.style.display = "none";

      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
        
          if (isNaN(height)) {
            height = width / (4/3);
          }
        
          // video.setAttribute('width', width);
          // video.setAttribute('height', height);
          // canvas.setAttribute('width', width);
          // canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
      startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);
      
      clearphoto();
    }
  
    // Fill the photo with an indication that none has been
    // captured.
  
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }
    
    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.
  
    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      
        data = canvas.toDataURL('image')
        photo.setAttribute('src', data);
        canvas.style.display = "none";
        photo.style.display = "flex";

        startbutton.style.display = "none"
        sendButton.style.display = "flex";
        retakeButton.style.display = "flex";
        document.body.style.background = "white";
      } else {
        clearphoto();
      }
    }
  
    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, errorGettingCamera);

    function errorGettingCamera() {
        document.getElementById()
    }

    document.getElementById("retake-Button").addEventListener("click", function() {
      photo.setAttribute("src", "")
      startbutton.style.display = "flex"
      sendButton.style.display = "none";
        retakeButton.style.display = "none";
    })

    document.getElementById("send-Button").addEventListener("click", function() {   
      // var storageRef = firebase.storage().ref('Images/img');
      // var uploadTask = firebase.storage().ref().put(data)

      // uploadTask.on('state_changed', uploadTick, (err)=> {
      //   console.log('Upload error:', err);
      // }, ()=> {
      //   console.log(uploadTask.snapshot.downloadURL)
      // });

      let dataURL = canvas.getBase64Image = data;
      console.log(dataURL)
      
      var d = new Date();
        
      var h = (d.getHours()<10?'0':'') + d.getHours();
      var m = (d.getMinutes()<10?'0':'') + d.getMinutes();

      var timeStamp = h+":"+m;

      firebase.database().ref("messages").push().set({
          "timeStamp": timeStamp,
          "sender": myName,
          "imageLink": dataURL,
          "messageType": "image"
      });
      document.getElementById("Photo-Spot").style.animation = "closeCamera 1s forwards"
      console.log(dataURL)
      setInterval(function() {
        window.location = "index.html";
      }, 800)
    })
})();