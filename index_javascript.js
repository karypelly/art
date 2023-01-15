var i = 0;						//global variable as long as this page is open - denotes the image index - this works
var pause_status = true;		//global variable as long as this page is open - denotes whether the slideshow is paused or not
var repeat_at_intervals;		//must be global - used for slideshow
var thumbs_initialized=false;	//must be global - shows false until the first time the src for the thumbnails are initialized
var time_tofadeout=1000;			//must be global - used for changing from one large image to another
var time_tofadein=1500;				//must be global - used for changing from one large image to another
var time_forslideshow =time_tofadeout+time_tofadein + 800;			//must be global - used for slideshow
var	first_slideinshow=true;			//must be global - no delay for first slide change in show


			  //the following populates the thumbnail grid
			  $(document).ready(function(){
				init_grid();
			  });

$(document).ready(function(){
	GetQueryString(); //checks for a search string in the URL
});

function GetQueryString()
{
	var UrlQuery = location.search;  //returns query part of url [NB a "#" sign and anything after will be lost - JS or web bug]
	var SplitQuery = UrlQuery.split("="); //query gets split at = sign into a 2-element array, the part before and the part after the "="
	if (SplitQuery[0]=="?image") 
		{
			var temp=parseInt(SplitQuery[1]); 	//convert the part after the "=" to integer
			if (isNaN(temp)) {					//if temp is not a number, it will be NaN, in that case test for image name
			//loop through image name
						query1 = SplitQuery[1].replaceAll("%22","")   //remove quotes from e.g. "hunting the elusive catail"
						query1 = query1.replaceAll("%20"," ")  //put in normal spaces
						query1 = query1.replaceAll("%27","'")  //put in normal apostrophe
						query1 = query1.replaceAll("%23","#")  //put in normal #
						
						query2 = query1.toLowerCase()
						for (i=0; i<=allimgs.length-1; i++) {
									//check if the 2nd part of the query (temp) matches an image name
									if(allimgs[i].name.toLowerCase().includes(query2)) {display_image(i); break;}
			
						}
			} else {
						if (temp <= allimgs.length-1 && temp >=0 ) 
							{
							i=temp;				//setting the global variable i
							display_image(i);
							}
			}
		}	
}

function nxt_or_prev_image(event) {
							var mouseX = event.screenX;     // Get the horizontal coordinate of mouse click relative to the screen
							var screenWidth= window.innerWidth;
							if (mouseX > screenWidth/2) {next_image();} else {prev_image();}					
}

function next_image() {
                      if (i == allimgs.length-1)  {  //if img is last in series make the next one the first in the series, i.e. loop back to start
                      			i = 0;
                      } 
                      else {		
                      			i = i+1;			
                      }                     		 		
						$(".imgfade").fadeOut(time_tofadeout,function() {display_image(i);}); 	//the callback function display_image will wait unitl fadeout is finsihed
}
function first_image() {
						i=0;		
   					  $(".imgfade").fadeOut(time_tofadeout,function() {display_image(i);}); 	//the callback function display_image will wait unitl fadeout is finsihed				  				  
}
function prev_image() {
                      if (i === 0) { //if this is the first image, loop to the last image, else simply move back one image
                      		i = allimgs.length-1;
                      		} else 
                      		{ 
                      		i = i-1;								
                      }                    		
					  $(".imgfade").fadeOut(time_tofadeout,function() {display_image(i);}); 	//the callback function display_image will wait unitl fadeout is finsihed			  
}
function last_image() {
	 				  i = allimgs.length-1;
					  $(".imgfade").fadeOut(time_tofadeout,function() {display_image(i);}); 	//the callback function display_image will wait unitl fadeout is finsihed
}

function slideshow() {

					 pause_status = !pause_status; //reverse pause status
					 
					 if (!pause_status) {
					 		document.getElementById("Button0").disabled = true; //disable other buttons until slideshow is stopped
					 		document.getElementById("Button1").disabled = true; //disable other buttons until slideshow is stopped
					 		document.getElementById("Button2").disabled = true; //disable other buttons until slideshow is stopped
					 		document.getElementById("Button4").disabled = true; //disable other buttons until slideshow is stopped
					 		document.getElementById("Button5").disabled = true; //disable other buttons until slideshow is stopped
					 		document.getElementById("guest_book").disabled = true; //disable link until slideshow is stopped
					 		document.getElementById("guest_book").style.color="#272727";					 		
					 		document.getElementById("other_language1").disabled = true; //disable link until slideshow is stopped
					 		document.getElementById("other_language1").style.color="#272727";
					 		document.getElementById("other_language2").disabled = true; //disable link until slideshow is stopped
					 		document.getElementById("other_language2").style.color="#272727";
				 		
					 		document.getElementById("Button3").value="\u25A0";		//now playing - this is the unicode hex vresion of the stop play symbol
					 		document.getElementById("Button3").style.color="red";	//make stop symbol stand out with red font
							if (first_slideinshow) {next_image();}					//for first slide don't delay before changing slide
							repeat_at_intervals = setInterval(function() {			//repeats  at set intervals

									$(document).ready(								// provided current image is fully loaded [jquery]
											function() {next_image();});							// load next image
							
																						},time_forslideshow);//repeats next image at set intervals
							first_slideinshow = !true;
							}
					else
					 		{
							clearInterval(repeat_at_intervals);									//stops repetition of next image
							first_slideinshow = true;											//for next slide show make sure first slide changes quickly
							document.getElementById("Button0").disabled = false; //re-enable other buttons after slideshow is stopped
							document.getElementById("Button1").disabled = false; //re-enable other buttons after slideshow is stopped
							document.getElementById("Button2").disabled = false; //re-enable other buttons after slideshow is stopped
							document.getElementById("Button4").disabled = false; //re-enable other buttons after slideshow is stopped
							document.getElementById("Button5").disabled = false; //re-enable other buttons after slideshow is stopped
					 		document.getElementById("guest_book").disabled =false; //re-enable link after slideshow is stopped	
					 		document.getElementById("guest_book").style.color="#777738";
					 		document.getElementById("other_language1").disabled =false; //re-enable link after slideshow is stopped	
					 		document.getElementById("other_language1").style.color="#777738";
					 		document.getElementById("other_language2").disabled =false; //re-enable link after slideshow is stopped	
					 		document.getElementById("other_language2").style.color="#777738";
														
							document.getElementById("Button3").value="\u25BA";		//now paused - this is the unicode hex for the pointing triangle play symbol			
							document.getElementById("Button3").style.color="#777738";	//reset colour of play/stop button to original - no longer red
					 		first_slideinshow=true; 							//reset flag for next time slideshow is used
					 		}	
}					 		
		
function init_grid() {

					//function to initialize the thummbnail grid


							
					document.getElementById("thumbs_div").style.display="block";
					//update the table thumbs_table if cell content not yet created
					//insert into the cells the source for each thumbnail plus an onclick bigimage function
				    if (!thumbs_initialized)   			// only have to do this once
						    		{
						    			var k;
						    			var myrow = document.getElementById("th_row1");
						    			for (k=0; k < allimgs.length; k++) //place the img src for the thumbnails in the table 
						    				{
											myrow.cells[k].innerHTML= 
												"<img src = \"" + allimgs[k].src.replace("large","thumbs") +"\">";
									    	}
									thumbs_initialized=true;		//only have to do this once
						    		}	
								
				 
}		

function grid_view() {
				// if user clicks grid view icon, scroll down so the thumbnail row comes into view
				document.getElementById("th_row1").scrollIntoView();
}


function display_image() {
					  // this is called by many of the other functions, e.g. next_image, first_image, previous_image etc., via the callback function
					  // to display a new image 						
    				  document.getElementById("imgline1").innerHTML = "&quot;" + allimgs[i].name + "&quot;, " + allimgs[i].place_date;
					  document.getElementById("imgline2").innerHTML = '&copy; Peter Staadecker, ' + allimgs[i].cright;
					  		if (allimgs[i].size !== undefined) {
					  						document.getElementById("imgline2").innerHTML = document.getElementById("imgline2").innerHTML +
					  							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + allimgs[i].size;
					  		}
					  		if (allimgs[i].misc !== undefined) {
					  						document.getElementById("imgline2").innerHTML = document.getElementById("imgline2").innerHTML +
					  							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + allimgs[i].misc;
					  		}
					  		if (allimgs[i].link !== undefined) {
					  						anchor ="<a href='" + allimgs[i].link + "' target='_blank'>[From the Blog]<a>"
					  						document.getElementById("imgline2").innerHTML = document.getElementById("imgline2").innerHTML +
					  							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + anchor;
					  		}
					  document.getElementById("img").innerHTML = "<img src = \"" + allimgs[i].src + "\">";	
					  $(".imgfade").fadeIn(time_tofadein); 							//jquery fade in to reveal for element with id=img

					  		
}

function img_click() {
					//this is called when the user clicks on an image
					// if the slide show is playing do nothing
					// if the slide show is paused, display the next image
					if (pause_status) {next_image();} 

}

function bigimage(thumb_source) {
					//this is called when the user clicks on a thumbnail image. It converts the main image into the corresponding large version of the thumbnail
					//its main function is to display the image from the large image directory instead of from the thumbs directory;
					
					var target_string= thumb_source.innerHTML.replace("thumbs","large"); 
					target_string= target_string.replace(/<img src=\"/i,""); //strip out leading part   /.../i means the replacement is case insensitive - needed since img is sometimes IMG
					target_string=target_string.replace("\">",""); //strip out trailing part
					var j=0;
					while (allimgs[j].src !== target_string) 
							{
							j=j+1;
							if (j == allimgs.length) {break;} //should never get to this point, but prevents infinite loop
							}
					if (j !== allimgs.length) {
					  i=j;
					  // scroll back up from thumbnail grid to bring title of new pic into view
					  document.getElementById("welcome").scrollIntoView();
					  
					  $(".imgfade").fadeOut(time_tofadeout,function() {display_image(i);}); 	//the callback function display_image will wait unitl fadeout is finsihed

							}
}

