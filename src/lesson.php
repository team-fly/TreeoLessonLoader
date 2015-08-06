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
	<title>Lesson Page</title>
	<meta charset=utf-8/>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<link rel="stylesheet" href="bootstrap-switch.min.css">
	<link rel="stylesheet" href="http://skidding.github.io/dragdealer/src/dragdealer.css">
	<link rel="stylesheet" href="style.css">
</head>



<body onresize="initializeInstructionBoxHeight(MediaTypeIdNVP[json[index].type])">

    <script src="https://raw.githubusercontent.com/alexei/sprintf.js/master/src/sprintf.js"></script>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
	<script src="common-utils.js"></script>
	<script src="lessonJson.js"></script>
	<script src="lesson.js"></script>
	<script src="bootstrap-switch.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<script src="http://skidding.github.io/dragdealer/src/dragdealer.js"></script>

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
						
                    <li class="dropdown">
                        <a id='navbarTitle' class="dropdown-toggle btn-lg" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            </a>
                        <ul id="lessonStepDropdown" class="dropdown-menu">
                        </ul>
                    </li>
						
					<li class="pull-right">
						<a href="index.php?logout=1">Log Out</a>
					</li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>


    <div class="row">
		<div id="videoSwitchContainer" class="col-sm-3 col-sm-offset-5">
			<span id='labelVideoMode' class='label'>Auto Loop</span>
			<input  id="switchVideoMode" type="checkbox" >
		</div>
	</div>
	<div id="lessonStepContainer" class="row">
		<div id="mediaContainer" class="col-sm-8">
			<img id="imageDisplay" class="lesson-media" />
			<div id="videoDisplay" class="lesson-media">
                <video id="videoPlayer" tabindex="0" preload="auto" width="100%" >
                    <source id="videoSrc" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                    <p>Sorry, your browser does not support the &lt;video&gt; element.</p>
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
		<div id="instructionContainer" class="col-sm-4">
			<div class="row instruction-header">
				<span class="title h4">Instruction</span>
			</div>
			<div class="row instruction-body">Sample Text</div>
		</div>
	</div>
	<div class="row" id="lessonNavigationContainer" >
		<div class="col-sm-8">
			<button id="btnStartEnd" class="btn btn-success btn-lg btn-block" type="submit">Next</button>

	  		<div class="leftSideButton">
	  			<button id="btnPrev" class="btn btn-info btn-lg btn-default-size pull-left" type="submit" >Previous</button>
	  		</div>
	  		<div class="rightSideButton">
	  			<button id="btnNext" class="btn btn-info btn-lg btn-default-size pull-right" type="submit" >Next</button>
	  		</div>
		</div>
	</div>

	<div class="modal fade modal-wide" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" >
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Modal title</h4>
				</div>
				<div class="modal-body" >
					<img id="imageDisplayModal" width="100%"/>
					<div id="videoDisplayModal">
						<video id="videoPlayerModal" tabindex="0" preload="none" width="100%" controls>
							<source id="videoSrcModal" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
							<p>Sorry, your browser does not support the &lt;video&gt; element.</p>
						</video>
					</div>
					<iframe id="youtubeDisplayModal" class="lesson-media"></iframe>
				</div>
			</div>
		</div>
	</div>

	<script src="http://cdn.jsdelivr.net/ace/1.2.0/min/ace.js" type="text/javascript" charset="utf-8"></script>
	<script>
	    var editor = ace.edit("editor");
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/c_cpp");
		editor.setReadOnly(true);
	</script>
</body>
</html>
