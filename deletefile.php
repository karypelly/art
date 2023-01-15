<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
</head>

<body>

<p>Page for file deletion</p>
<?php
// this page follows instructions from the readfile page to delete the file
//delete is boolean so can test success
if (unlink("./data/user_comments.txt")) 
	{	echo "file deleted successfully";} else 
	{	echo "file deletion failed ";
		if (file_exists("user_comments.txt")) 
				{echo "but file still exists";} else 
				{echo "- no file exists";} 
	} 

?>

<p>&nbsp;</p>

</body>

</html>
