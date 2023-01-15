

<html>

<head>
<style type="text/css">
	body {width:800px;background-color : #202020; color:#FFFF90; font-size: large; text-align:left; 	margin-left:auto; margin-right:auto; }

	a:visited {color: #909760;}
	a:active {color: #0000FF;}	
	a:link {color: #ffc800;}
</style>	</head>

<body>
<p>&nbsp;</p>

<p>&nbsp;</p>


<p>Here are the interim submissions to the guestbook:</p>
<p>&nbsp;</p>

<p><br>
<?php 
//check for session password posted in previous html page password.htm


	$yourPass= $_POST["pwfield"];
	
	//Set your password here +++++++++++++++++++++++++++++++++++++++++++++++++
	if ($yourPass <> "TOP-SECRET") 
	{echo "Wrong id/password"; }
	
	else 
	{
	$myfile = fopen("./data/user_comments.txt", "r") or die("Unable to open file!");
	echo nl2br( fread($myfile,filesize("../data/user_comments.txt")) );
 	fclose($myfile);
 
	


	//still within the if theen else i.e. password has been accepted
	echo nl2br("<p>to delete the interim submissions file enter &quot;delete&quot; below</p>\n");
	echo nl2br("<p>&nbsp;</p>\n");
	echo nl2br("<form method=\"POST\" action=\"deletefile.php\" 		>\n");
  	echo nl2br("<p><input type=\"text\" name=\"delreq\" size=\"6\" 		>\n");
  	echo nl2br("<input type=\"submit\" value=\"Submit\" name=\"B1\"		>\n");
  	echo nl2br("<input type=\"reset\" value=\"Reset\" name=\"B2\"		>\n");
	echo nl2br("</p></form>");
	};
?>
</body>
</html>
