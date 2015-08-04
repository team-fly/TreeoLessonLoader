<?php
	//connecting to the MySQL DB
      $link = mysqli_connect("localhost", "teamflyc_logindb", "treeo*login2015", "teamflyc_login");

      if (mysqli_connect_error()) die("Can't connect to DB");
?>  