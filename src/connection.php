<?php
	//connecting to the MySQL DB
      $link = mysqli_connect("localhost", "teamflyc_logindb", "treeo*login2015", "teamflyc_login");
	  //$link = mysqli_connect("localhost", "cl51-example-box", "hVh7^BV36", "cl51-example-box");

      if (mysqli_connect_error()) die("Can't connect to DB");
?>  