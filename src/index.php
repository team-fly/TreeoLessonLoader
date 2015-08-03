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

          <title>Treeo Login</title>

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
            <? include("login.php"); ?>
            
            <div class="container">
                  <form class="form-signin" method="post">
                      
                        <div class="form-group">
                            <h2 class="form-signin-heading">Welcome to Treeo!</h2>
                            <h4 class="form-signin-heading">Please sign in</h2>
                        </div>
                        
                        <div class="form-group">
                            <label for="inputUsername" class="sr-only">Username</label>
                            <input type="text" id="inputUsername" name="inputUsername" class="form-control" placeholder="Username" required="" autofocus="">
                        </div>
                        
                        <div class="form-group">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required="">
                        </div>
                        
                        <div class="form-group">
                            <div class="checkbox">
                                  <label>
                                  <input type="checkbox" value="remember-me"> Remember me
                                  </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <button class="btn btn-lg btn-primary btn-block" id="signinBtn" name="submit" type="submit" value="signIn">Sign in</button>
                        </div>
                  
                  <?php
                      
                      if($error){
                          echo '<div class="form-group alert alert-danger">'.addslashes($error).'</div>';
                      }
                      
                      if($msg){
                          echo '<div class="form-group alert alert-info">'.addslashes($msg).'</div>';
                      }
                      
                  ?>
                  </form>

            </div> <!-- /container -->



          <script></script>


      </body>
</html>