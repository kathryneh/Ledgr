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
		//Insert init columns below so we can keep the important parameters?
		initRightColumn(imgSrc, userTitle)
		initLeftColumn
	}
	function initNav(){
		var nav = $('<nav></nav>');
		var ulMain = $('<ul class="main-nav"></ul>');
		var liSelected = $('<li id="selected"> home </li>');
		
	}
	
	function initRightColumn(imgSrc, userTitle){
		//If this basic structure is correct, I think we need to append these to container
		var rightColumn = "<div class='rightColumn'>";
		var userInfo = "<div id='userInfo'><div id='userPhoto'><img src='";
		userInfo+= imgSrc;
		userInfo+= "' alt='user photo'>";
		var userGreeting = "<h3> Welcome, "+userTitle+"</h3></div>";
		var userSummariesTable = "<table id='userSummaries'>";
		//Need variables for table below
		var userOwesRow = "<tr><td class = 'ledger-head'> Amount Owed By You</td><td>"+userOwes+"</td></tr>";
		var userDueRow = "<tr><td class='ledger-head'>Amount Owed To You</td><td>"+userDue+"</td></tr>";
		var totalSpentRow = "<tr><td class = 'ledger-head'>Amount Spent</td><td>"+totalSpent+"</td></tr>";
		var totalDueRow = "<tr><td class = 'ledger-head'>Amount Due</td><td>"+totalDue+"</td></tr>";
		//Not sure how to work with alerts...
		var userNotices = "<p class='alert'>Alert Message</p>";
		
	}
	//Now to begin scary initLeftColumn, not sure what I'm doing here but here goes:
	function initLeftColum(){
	var rowNumber = 0;
	//I hope I actually had to do this because it took a long time lol:
	var ledgerHead =  "<table id='ledger'><thead class='ledger-head'><tr><td class='date'>Date</td><td class='description'>
        Description </td><td class='responsible'>Responsible</td><td class='amountOwed'>Amount Owed</td><td class='amountDue'>
        Amount Due</td><td class='totalDue'> Total Due</td><td class='dueDate'>Due Date</td><td class='paid'>
	Paid?</td></tr></thead>";
   	
	}
	//I'm assuming we'll need a function to initialize the add new bill generic row:
	function initBillLine(){
	

	}

	//Here's that function that used to sort of append Larry rows everywhere:
	$(document).ready(function(){
  	var currentTable = document.getElementById("ledger");
        $("#submit").click(function(){
	//We need to make a generic row that is editable so a user can put in new values, create variables for them, then stick them below:
      	$("#ledger").append("<tr><td>Date</td><td>Description</td><td>Responsible</td><td>Amount Owed</td><td>Amount due</td><td>Total Due</td><td>Due Date</td><td>Paid</td></tr>");                                                 
		});
	});
