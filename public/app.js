(function() {

    //Copy credentials from Firebase Admin Panel 
    //Fireabse Setings > Genral Settings > Your Apps > Create a Web App
    const firebaseConfig = {
        apiKey: "YOUR-API-KEY",
        authDomain: "project-name.firebaseapp.com",
        projectId: "project-id",
        storageBucket: "your-sorage-bucket.appspot.com",
        messagingSenderId: "YOUR-ID",
        appId: "APP-ID"
      };
    firebase.initializeApp(firebaseConfig);
  
}());
