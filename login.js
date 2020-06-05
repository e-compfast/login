// Initialize Firebase
  var config = {

    // paste database config disini
  apiKey: "AIzaSyAsf8M4SzeuZgZdvEIJ9bjEkc9fSY5BOzg",
  authDomain: "unbk-data.firebaseapp.com",
  databaseURL: "https://unbk-data.firebaseio.com",
  projectId: "unbk-data",
  storageBucket: "unbk-data.appspot.com",
  messagingSenderId: "174806904283",
  appId: "1:174806904283:web:15e706446421696ef28bfe",
  measurementId: "G-EHT5WGBQ2Q"
    
  };

  firebase.initializeApp(config);
  const auth = firebase.auth();


  auth.onAuthStateChanged(function(cek_user) {
    if (cek_user) {
      var user = firebase.auth().currentUser;

        window.location.href = "/quiz";
      
    } else {
      //tidak ada user terotentikasi

      console.log("Status belum diverifikasi");
    }

     
  });

  $( "#btn-signin" ).click(function(e) {
    e.preventDefault();
    var email = $('#txtEmail-formLogin').val();
    var password = $('#txtPassword-formLogin').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      $( ".field-login-password" ).addClass( "has-error" );
      $( ".field-login-email" ).addClass( "has-error" );
      $( ".field-login-email>.help-block" ).html( errorCode );
    });
  });


  $( "#btn-signup" ).click(function(e) {
      e.preventDefault();
      var email = $('#txtEmail-formLogin').val();
      var password = $('#txtPassword-formLogin').val();
      auth.createUserWithEmailAndPassword(email, password).then(function () {
        console.log("Pendaftaran Berhasil");
        var user = auth.currentUser;
        user.sendEmailVerification().then(function() {
          swal("Verification Email", "Buka e-mail anda untuk melakukan proses verifikasi akun pendaftaran", "success");
          logout();
        }, function(error) {
          swal ( "Oops" ,  "Verifikasi e-mail tidak terkirim" ,  "error" )
        });
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(error != null){
          $( ".field-login-password" ).addClass( "has-error" );
          $( ".field-login-email" ).addClass( "has-error" );
          $( ".field-login-email>.help-block" ).html( errorCode );
        }
      });
    });

// function logout(){
//   firebase.auth().signOut();
// }

  $( "#btn-logout" ).click(function(e) {
    logout();
  });
