<?php
    session_start();
    include("connection.php");
    
    if($_SESSION['id']) {
        //Welcome user
    } else {
        echo "please log in first";
        header("Location: index.php");
        exit();
    }
?>    

<!DOCTYPE html>
<html lang="en">
      <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

          <meta name="description" content="">
          <meta name="author" content="">
          <link rel="icon" href="img/logo.ico">

          <title>Treeo Secure Website</title>

          <!-- Bootstrap core CSS -->
          <link href="bootstrap-3.3.5-dist/css/bootstrap.min.css" rel="stylesheet">

          <!-- Custom styles for this template -->
          <link href="bootstrap-3.3.5-dist/css/signin.css" rel="stylesheet">

          <!-- My CSS -->
          <link href="css/style.css" rel="stylesheet">

          <!-- Google Open Sans font -->
          <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

      </head>

      <body cz-shortcut-listen="true">
        <div class="navbar navbar-default" id="navigationBar">
            <div class="container">
                <div class="pull-right">
                    <ul class="navbar-nav nav">
                        <li><a href="index.php?logout=1">Log Out</a></li>
                    </ul>
                </div> 
            </div> <!-- /container -->
        </div> <!-- /navbar -->


      </body>
</html>