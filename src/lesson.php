<?php
    session_start();
    include("connection.php");
    
    if($_SESSION['id'] AND (($_SESSION['timeout'] + 60*60*2) > time())) {	//check for session timeout = 2 hours
        $_SESSION['timeout']=time();	//extend session
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
	<title>Lesson Page</title>
	<meta charset=utf-8/>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="bootstrap-switch.min.css">
	<link rel="stylesheet" href="http://skidding.github.io/dragdealer/src/dragdealer.css">
	<link rel="stylesheet" href="style.css">
</head>



<body onresize="autoSetHeightWidth()">

	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="https://s3-us-west-2.amazonaws.com/treeo/resources/sprintf.js"></script>
	<script src="common-utils.js"></script>
	<script src="lessonJson.js"></script>
	<script src="https://s3-us-west-2.amazonaws.com/treeo/resources/dragdealer.js"></script>
	<script src="lesson.js"></script>

    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="pull-left" >
                        <button id="btn-nav-home" type="button" class="btn btn-default btn-lg navbar-btn">
                            <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Home</button>
                    </li>
					<li class="pull-right" >
                        <button id="btn-nav-logout" type="button" class="btn btn-default btn-lg navbar-btn" onclick="window.location.href='index.php?logout=1'">
                            <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</button>
                    </li>
					
                    <li class="dropdown">
                        <a id='navbarTitle' class="dropdown-toggle btn-lg" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            </a>
                        <ul id="lessonStepDropdown" class="dropdown-menu">
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

	<div id="lessonStepContainer" class="row">

        <div id="loadingDisplay" class="col-sm-9 text-center">
            <div class="row">
                <i id="loadingIcon" class="fa fa-circle-o-notch fa-spin"></i>
            </div>
            <div class="row">
                <span class="loading">Loading...</span>
            </div>
        </div>

		<div id="mediaContainer" class="col-sm-9">
				<img id="imageDisplay" class="lesson-media" />
				<div id="videoDisplay" class="lesson-media">
					<input id="videoPlayIcon" type="image" src="img/playIcon.png" alt="Submit" width="128" height="128" style="position:absolute; z-index: 1;">
					<video id="videoPlayer" tabindex="0" autobuffer="autobuffer" preload="preload" >
						<source id="videoSrc"   type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
					</video>
					<div id="videoSlider" class="dragdealer">
						<div class="handle red-bar">
							<span id="videoSliderValue"></span>
						</div>
					</div>
				</div>
				<iframe id="youtubeDisplay" class="lesson-media"></iframe>
				<div id="textDisplay" class="lesson-media"></div>
		</div>
		<div id="instructionContainer" class="col-sm-3">
			<div class="row instruction-header">
				<span class="title h4">Instruction</span>
			</div>
			<div class="row instruction-body scroll-area" ></div>
		</div>
	</div>


	<div class="row">
		<div class="footer col-sm-9" id="lessonNavigationContainer" >
			<div class="leftSideButton">
				<button id="btnPrev" class="btn btn-info btn-default-size pull-left btn-navigation" style="margin:10px 35px;" type="submit" >Previous</button>
			</div>
			<div class="rightSideButton">
				<button id="btnNext" class="btn btn-info btn-default-size pull-right btn-navigation" style="margin:10px 25px;" type="submit" >Next</button>
			</div>
			<div id="repeat">
				<a>
					<i class="fa fa-repeat"></i>
					<span id="replayText">replay</span>
				</a>
			</div>
		</div>
	</div>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.js" type="text/javascript" charset="utf-8"></script>
	<script>
		var editor = ace.edit("textDisplay");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/c_cpp");
		editor.setReadOnly(true);
	</script>
</body>
</html>
