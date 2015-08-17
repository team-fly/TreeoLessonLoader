<?php
	$salt = "TreeoAcademy";
	$globalPass = "TreeoAcademy";
	$hash = md5($salt.$globalPass);
	echo $hash;
	$hash = md5($salt."test123");
	echo "<br />";
	echo $hash;
	
?>