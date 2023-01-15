<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
// Start the php session to allow capture of session variables (from previous page)
// This page takes user comments, checks that the capcha values are correct, re-truncates the comment to 750 characters and 
// appends the comments to a file.
session_start();
?>
<html>
<head>

<style type="text/css">

	body {background-color: #202020; color:#FFFF90; font-size: medium;	}

	a:visited {color: #909760;}
	a:active {color: #0000FF;}	
	a:link {color: #ffc800;}	

	.outer {
	width: 600px;
	display: block;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
}	
</style>

</head>

<body >
<p><br/><br/><br/><br/></p>
<p class="outer">Confirming guest book entry .....</p>

<?php
date_default_timezone_set("America/New_York");
	
$userValidation = $_POST["validation1"];
$truncatedMessage = substr($_POST['message1'],0,749); //older versions of html may not have truncated the message
$rand=$_SESSION["randomNumber"];

If ( $_SESSION["randomNumber"]+ 200 <> $userValidation ) 
	{ echo "<p class=outer><br><br><br><br><br><br>There was an error in the captcha number you entered.<br> Please correct the number and try again.</p>";} else   //capcha invalid
	{
	//append contents of post to the user_comments.txt file
	$myFile = "./data/user_comments.txt";
	$fh = fopen($myFile, 'a') or die("can't open file");
	fwrite($fh, "received via gallery from: ".$_POST["mail1"]." \n");
	fwrite($fh, "at: ".date("y.m.d")." and ".date("h:i:sa")."\n");
	fwrite($fh, "with IP: ".$_SESSION["IP1"]." \n");
	fwrite($fh, "message reads: ".$truncatedMessage." \n");
	fwrite($fh, "____________________________________________________________________ \n");
	fwrite($fh, " \n");
	fclose($fh);

   	echo "<p class=outer><br/><br/><br/><br/><br/><br/>Thank you for your comment. All comments are reviewed before they are posted.
   	Please allow for a delay before your comments are posted or replied to. </p>";
   	
	//--- personalize the following section and remove the '//' below if your webhost supports mail messages+++++++++++++++++++++       	 
   	//mail("johnsmith@exampleemail.com",
    //    		"Photogallery guestbook has received an entry",
    //  		"Someone has placed an entry in your photogallery guestbook",
    //  		"From: johnsmith@examplemail.com" . "\r\n" . "Content-Type: text/plain; charset=utf-8",
    //  		"-fjohnsmith@exampleemail.com");
   	}
	

?>
<div class="outer">
<p><br/><br/><br/><br/></p>

   <a class="outer" href="contact_us.php">add another guestbook comment </a><br/>
   <a class="outer" href="index.htm">or return to the gallery </a>

</div>
</body>

</html>
