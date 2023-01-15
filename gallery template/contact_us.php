<!DOCTYPE html>
<?php
// Start the php session to allow capture of session variables (available to next page)
// This page lets users enter a comment in the guestbook
session_start();
?>

<html>

<head>

<style type="text/css">
	body {width:800px;background-color : #202020; color:#FFFF90; font-size: medium; text-align: center; 	margin-left:auto; margin-right:auto; }

	a:visited {color: #909760;}
	a:active {color: #0000FF;}	
	a:link {color: #ffc800;}	

	.display_link {
	/*font-size:smaller*/
}

	table {border:0px; width:690px; height:275px;}
	tr {width:682px; height:275px; text-align:center; margin-left:auto; margin-right:auto; }
	div, p { width: 800px; display:block; text-align:center; margin-left:auto; margin-right:auto;}	
	.small {font-size:small;}
</style>

</head>

<body>

<div class="outer">
<!-- Personalize this title ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
<br>John Smiths's Guestbook<br><br>

<table>
  <tr>
    <td >

    	<p  class="display_link"><b>See <a href="guestbookdisplay.htm">what others have written in the guestbook</a> or</b></p>
    	<p><b>Enter your comments for the guestbook:</b></p>
    	<p>(There is a limit of 750 characters. All entries are reviewed before
    		they're posted to the guestbook. Please allow for a delay before your comment is posted.)
    	</p>
    	<form  METHOD="POST" ACTION="confirm_submission.php">
    		<div class="outer">
    			<p>&nbsp; <textarea  rows="7" name="message1" cols="73" maxlength="750" ></textarea><br><br></p> 
				<p>                                        
					<?php
					//random number
					// Set session variables available in php to next page
					$_SESSION["randomNumber"] = rand(10,20);
					$_SESSION['IP1']= $_SERVER["REMOTE_ADDR"];
 
					//Provide random number
					echo nl2br("captcha: ".$_SESSION["randomNumber"]." \n");
					?> 
 				</p>
      		</div>
      		<div>
      			<p>To avoid automated spam postings in the guest book please add the above 
				&quot;captcha&quot; number to two hundred&nbsp;in the field below:<br/></p>
      		</div>
      		<div  ><p>&nbsp;</p></div>
      
      		<div ><p><input type="text" name="validation1" size="4" maxlength="4"></p><p></p></div>
      
      		<div  ><p>Please enter your email address below if youwish a reply:</p>
					<p><input NAME="mail1" SIZE="50" maxlength="50"></p>
					<p>&nbsp;</p>
      		</div>
      		<div  >
      			<p class="small">(The Virtual Gallery will
      			not give out your name or e-mail address, nor do we send out email unless acknowledging
      			your messaage or responding to questions you leave)&nbsp;
      			</p>
				<p>&nbsp;</p>
      		</div>
      		<div  ><p><input TYPE="submit" VALUE="Submit"> 
      			<input TYPE="reset" VALUE="Reset"></p>
      		</div>
    </form>
    </td>
  </tr>
</table>
</div>

<p class="outer" >After submitting your comments click here to 
<a href="index.htm">return to the gallery </a></p>

<p  class="outer"> </p>
</body>
</html>
