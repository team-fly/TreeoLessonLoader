<?php
    session_start();
    include("connection.php");
    
    if($_SESSION['id'] AND (($_SESSION['timeout'] + 15) > time())) {	//check for session timeout = 15 seconds
        $_SESSION['timeout']=time();
		//Welcome user
    } else {
        echo "please log in first";
        header("Location: index.php");
        exit();
    }
?> 

<!DOCTYPE html>
<html>
<head>
<title>Treeo Main Navigation</title>
<meta charset=utf-8/>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="navigation.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="style.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="bootstrap-switch.min.js"></script>

</head>
<body>
	<!-- navbar with logout -->
	<div class="navbar navbar-default" id="navigationBar">
            <div class="container">
                <div class="pull-right">
                    <ul class="navbar-nav nav">
                        <li><a href="index.php?logout=1">Log Out</a></li>
                    </ul>
                </div> 
            </div>
        </div>
	<!-- navbar with logout -->
		
<div id="navigationContainer" class="navigation-panel">
	<a id="nav_scratch" class="btn btn-info btn-lg btn-navigation" ><span class="glyphicon glyphicon-folder-open"></span> Scratch</a>
	<a id="nav_arduino" class="btn btn-info btn-lg btn-navigation" ><span class="glyphicon glyphicon-folder-open"></span> Arduino</a>
	<!--
    <a id="nav_mindstorm" class="btn btn-info btn-lg btn-navigation" ><span class="glyphicon glyphicon-folder-open"></span> Mindstorm</a>
	-->
</div>
<div id="navigationContainer-lesson-lv" class="navigation-panel">
	<a id="nav_lesson_1" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 1</a>
	<a id="nav_lesson_2" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 2</a>
	<a id="nav_lesson_3" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 3</a>
	<a id="nav_lesson_4" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 4</a>
	<a id="nav_lesson_5" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 5</a>
	<a id="nav_lesson_6" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 6</a><!--
	<a id="nav_lesson_1" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 7</a>
	<a id="nav_lesson_2" class="btn btn-info btn-lg btn-navigation btn-lesson" ><span class="glyphicon glyphicon-folder-open"></span> Lesson 8</a> -->
	
	<div id="navigationContainerBack" style="margin-top:50px;">
		<a id="btn-back" class="btn btn-info btn-lg btn-navigation" >
	    <span class="glyphicon glyphicon-chevron-left"></span> Back</a>
	</div>
</div>

</body>
</html>