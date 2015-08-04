<?php
                
    session_start();
    /* --- The AND only logs out if already logged in (has a session id) --- */
    if(($_GET['logout']==1 AND $_SESSION['id']) OR ($_SESSION['timeout'] + 15) > time())  { //check for session timeout = 60 mins
        session_destroy();
        $msg = "You have logged out";
    }
    /* ---connect to mySQL DB below--- */
    include("connection.php");
    /* ---connect to mySQL DB above--- */

    if(isset($_POST['submit'])) {
      
      $username = mysqli_real_escape_string($link, $_POST['inputUsername']);
      $salt = "TreeoAcademy";
      $password = md5($salt.$_POST['inputPassword']);
      
      $query = "SELECT * FROM users WHERE name='$username' AND password='$password'";
      $result = mysqli_query($link, $query);
      $row = mysqli_fetch_array($result);
      
      if($row) {
          $_SESSION['id']=$row['id'];
          
          /* ---Session Timeout--- */
          $_SESSION['timeout']=time();
          /* ---Session Timeout--- */          
          
          
          /* ---Redirect page below--- */
          header("Location: navigation.php");
          exit();
          /* ---Redirect page above--- */
          
      } else {
          $error = "Could not find a user with that username and password";
      }
      
      /* ---alternate password checking method---
      $queryUsername = "SELECT name FROM users WHERE name='$username'";
      $queryPassword = "SELECT password FROM users WHERE name='$username'";
      
      $resultUsername = mysqli_query($link, $queryUsername);
      $resultPassword = mysqli_query($link, $queryPassword);
      $getResultPassword = mysqli_fetch_array($resultPassword);
      $getResultPassword = $getResultPassword['password'];
      
      if($password == $getResultPassword) {
          echo "CORRECT PASSWORD";
      } else {
          echo "INCORRECT PASSWORD";
      }
      ---end alternate password checking method---*/
    }
  
?>