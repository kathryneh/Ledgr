/*Ledgr.js
 *
 *This will (hopefully) programmatically build out the UI. 
 *
 *Things to build: New Rows
 * 				   Form
 * 				   Alerts
 *				   
 */


	$(document).ready(ready);

	function ready(){
		var pageTitle = "Ledgr";
		var userTitle = "alkali";
		var imgSrc = "http://www.placekitten.com/40/40";
		var userImgSrc = "http://www.placekitten.com/40/40";
		initHeader(pageTitle, userTitle, imgSrc, userImgSrc);
	}

	function initHeader(pageTitle, userTitle, imgSrc, userImgSrc){
		var container = $("<div class='container'></table>");
		var header = "<div class='header'><div class='logo'><img src='" ;
		header+= imgSrc;
		header+= "' alt='ninja'><span id='pagetitle'>"; 
		header+= pageTitle;
		header+= "</span></div></div>";
		header = $(header);
		var userLogo = "<img src="+userImgSrc+" alt='"+userTitle+"'><span id='username'>"+userTitle+"</span>";
		header.append(userLogo);
		container.append(header);
		$('body').append(container);
		initNav();
	}
	function initNav(){
		var nav = $('<nav></nav>');
		var ulMain = $('<ul class="main-nav"><ul>');
		var liSelected = $('<li id="selected"> home </li>');
	}
