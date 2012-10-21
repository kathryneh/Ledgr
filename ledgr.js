/*Ledgr.js
 *
 *This will (hopefully) programmatically build out the UI. 
 *
 *Things to build: New Rows
 * 				   Form
 * 				   Alerts
 *				   
 */


	function ready(){
		var pageTitle = "Ledgr";
		var userTitle = "alkali";
		var imgSrc = "http://www.placekitten.com/40/40";
		var userImgSrc = "http://www.placekitten.com/40/40";
		initHeader(pageTitle, userTitle, imgSrc, userImgSrc);
		//these will eventually be pulled from and populated into a database
		var row1 = {
			date: "10/18",
			description: "rent",
			payee: "Larry",
			amtPaid: "$300.00",
			amtDue: "$500.00",
			dueDate: "10/31",
			paid: "No"
		};
		var row1a = {
			payee: "Jill", 
			amtPaid: "$0.00", 
			amtDue: "$200.00",
			paid: "No"
		};
		var row1b = {
			payee: "Larry", 
			amtPaid: "$300.00", 
			amtDue: "$300.00",
			paid: "Yes"
		};
		var currentUserSum = {
			userOwes: '$0.00',
			userDue: '$0.00',
			totalSpent: '$0.00',
			totalDue: '$0.00'
		};
		initRightColumn(imgSrc, userTitle, currentUserSum);
		initLeftColumn(row1, row1a, row1b);
			
	}

	function initHeader(pageTitle, userTitle, imgSrc, userImgSrc){
		var container = $('.header');
		var pageLogo = "<div class='logo'><img src='" ;
		pageLogo+= imgSrc;
		pageLogo+= "' alt='ninja'><span id='pagetitle'>"; 
		pageLogo+= pageTitle;
		pageLogo+= "</span></div>";
		pageLogo = $(pageLogo);
		var userLogo = "<div class='user'><img src="+userImgSrc+" alt='"+userTitle+"'><span id='username'>"+userTitle+"</span></div>";
		$('.header').append(pageLogo);
		$('.header').append(userLogo);
		//container.append(header);
		initNav();
		//Insert init columns below so we can keep the important parameters?
//		initLeftColumn()
	}
	function initNav(){
		var nav = $('<nav></nav>');
		var ulMain = $('<ul class="main-nav"><ul>');
		var liSelected = $('<li id="selected"> home </li>');
		ulMain.append(liSelected);
		for (var i=0; i<5; i++){
			ulMain.append('<li></li>');
		}
		nav.append(ulMain);
		$('.header').append(nav);
	}


	function initRightColumn(imgSrc, userTitle, currentUserSum){
		console.log(currentUserSum);
		//If this basic structure is correct, I think we need to append these to container
		var rightColumn = $('.rightColumn');
		var userInfo = "<div id='userInfo'><div id='userPhoto'><img src='";
		userInfo+= imgSrc;
		userInfo+= "' alt='user photo'>";
		rightColumn.append(userInfo);
		var userGreeting = "<h3> Welcome, "+userTitle+"</h3></div>";
		rightColumn.append(userGreeting);
		var userSummariesTable = $("<table id='userSummaries'></table>");
		//Need variables for table below
		var userOwesRow = "<tr><td class = 'ledger-head'> Amount Owed By You</td><td>"+currentUserSum.userOwes+"</td></tr>";
		userSummariesTable.append(userOwesRow);
		var userDueRow = "<tr><td class='ledger-head'>Amount Owed To You</td><td>"+currentUserSum.userDue+"</td></tr>";
		userSummariesTable.append(userDueRow);
		var totalSpentRow = "<tr><td class = 'ledger-head'>Amount Spent</td><td>"+currentUserSum.totalSpent+"</td></tr>";
		userSummariesTable.append(totalSpentRow);
		var totalDueRow = "<tr><td class = 'ledger-head'>Amount Due</td><td>"+currentUserSum.totalDue+"</td></tr>";
		userSummariesTable.append(totalDueRow);
		rightColumn.append(userSummariesTable);
		//Not sure how to work with alerts...
		var userNotices = "<p class='alert'>You have no alerts</p><p class='notice'>You have no notices</p><p> You have no additional messages</p>";
		rightColumn.append(userNotices);
	}

	function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
	}

	//Now to begin scary initLeftColumn, not sure what I'm doing here but here goes:
	function initLeftColumn(){
	var leftColumn = $('.leftColumn');
	//I hope I actually had to do this because it took a long time lol:
	var ledgerTable =  $("<table id='ledger'></table>");
	var ledgerHeader= $("<thead class='ledger-head'><tr></tr></thead>");
	var ledgerHeaderLabels = ['date', 'description', 'responsible', 'amount paid', 'amount due', 'due date', 'paid'];
	$(ledgerHeaderLabels).each(function(index, label){
		var temp = "<td class="+ label + ">" + toTitleCase(label) + "</td>";
		temp = $(temp);
		ledgerHeader.append(temp);
	})
	// var ledgerHeaderLabel = $("<td class='date'>Date</td><td class='description'>
 //        Description </td><td class='responsible'>Responsible</td><td class='amountOwed'>Amount Paid</td><td class='amountDue'>
 //        Amount Due</td><td class='dueDate'>Due Date</td><td class='paid'>
	// Paid?</td>");
	ledgerTable.append(ledgerHeader);
	leftColumn.append(ledgerTable);
   	
	}
	//I'm assuming we'll need a function to initialize the add new bill generic row:
	// function initBillLine(){
	

	// }

	//Here's that function that used to sort of append Larry rows everywhere:
	// $(document).ready(function(){
 //  	var currentTable = document.getElementById("ledger");
 //        $("#submit").click(function(){
	// //We need to make a generic row that is editable so a user can put in new values, create variables for them, then stick them below:
 //      	$("#ledger").append("<tr><td>Date</td><td>Description</td><td>Responsible</td><td>Amount Owed</td><td>Amount due</td><td>Total Due</td><td>Due Date</td><td>Paid</td></tr>");                                                 
	// 	});
	// });

	$(document).ready(ready);
