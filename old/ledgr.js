//Ledgr.js
	function ready(){
		var pageTitle = "Ledgr";
		var userTitle = "alkali";
		var imgSrc = "http://www.placekitten.com/40/40";
		var userImgSrc = "http://www.placekitten.com/40/40";
		initHeader(pageTitle, userTitle, imgSrc, userImgSrc);

		//these will eventually be pulled from and populated into a database
		// var row1 = {
		// 	date: "10/18",
		// 	description: "rent",
		// 	payee: "Larry",
		// 	amtPaid: "$300.00",
		// 	amtDue: "$500.00",
		// 	dueDate: "10/31",
		// 	paid: "No"
		// };
		var row1 = ["10/18","Rent", "Larry", "$300.00", "$500.00", "10/31", "No"];
		var row1a = [" ", " ", "Jill", "$0.00", "$200.00", " ", "No"];
		var row1b = [" ", " ", "Larry", "$300.00", "$300.00", " ", "Yes"];
		var rowAdd = ["Received&nbsp;MM/DD", "Description", "Responsible", "Amount&nbsp;Owed", "Amount&nbsp;Due", "Due&nbsp;MM/DD", "Paid"];
		var personAdd=[" ", " ", "Person", "Amount&nbsp;Owed", "Amount&nbsp;Due", " ", "Paid"]; 
	//	var row1a = {
	//		payee: "Jill", 
	//		amtPaid: "$0.00", 
	//		amtDue: "$200.00",
	//		paid: "No"
	//	};
	//	var row1b = {
	//		payee: "Larry", 
	//		amtPaid: "$300.00", 
	//		amtDue: "$300.00",
	//		paid: "Yes"
	//	};
		var currentUserSum = {
			userOwes: '$0.00',
			userDue: '$0.00',
			totalSpent: '$0.00',
			totalDue: '$0.00'
		};
		initRightColumn(imgSrc, userTitle, currentUserSum);
		initLeftColumn(row1, row1a, row1b);
		initAddForm(rowAdd, personAdd);

		$('#newForm').submit(function(){
			$('leftColumn').append($('input:first').val());
			return false;

		});
		

	}

	function addClickHandlerSubmit(){
		console.log("something");
		$('#submit').click(duplicateRow);
	}

	function duplicateRow(event){
		//$('#row1').clone;
		console.log("called!");
		var test = $('#row1').clone();
		console.log(test);
		$('#row1b').append(test);
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
		initNav();
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
		var rightColumn = $('.rightColumn');
		var userInfo = "<div id='userInfo'><div id='userPhoto'><img src='";
		userInfo+= imgSrc;
		userInfo+= "' alt='user photo'>";
		rightColumn.append(userInfo);
		var userGreeting = "<h3> Welcome, "+userTitle+"</h3></div>";
		rightColumn.append(userGreeting);
		var userSummariesTable = $("<table id='userSummaries'></table>");
		var userOwesRow = "<tr><td class = 'ledger-head'> Amount Owed By You</td><td>"+currentUserSum.userOwes+"</td></tr>";
		userSummariesTable.append(userOwesRow);
		var userDueRow = "<tr><td class='ledger-head'>Amount Owed To You</td><td>"+currentUserSum.userDue+"</td></tr>";
		userSummariesTable.append(userDueRow);
		var totalSpentRow = "<tr><td class = 'ledger-head'>Amount Spent</td><td>"+currentUserSum.totalSpent+"</td></tr>";
		userSummariesTable.append(totalSpentRow);
		var totalDueRow = "<tr><td class = 'ledger-head'>Amount Due</td><td>"+currentUserSum.totalDue+"</td></tr>";
		userSummariesTable.append(totalDueRow);
		rightColumn.append(userSummariesTable);
		var userNotices = "<p class='alert'>You have no alerts</p><p class='notice'>You have no notices</p><p> You have no additional messages</p>";
		rightColumn.append(userNotices);
	}

	function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
	}

	function processRow(){

	}

	function initLeftColumn(row1, row1a, row1b){
	var dateSelect = $('<p> Currently Showing </p>');
	dateSelect.append($('<select><option value="currentMonth">Current Month</option><option value="pastMonth">Past Month</option><option value="allHistory">All of History</option></select>'));
	var leftColumn = $('.leftColumn');
	var ledgerTable =  $("<table class='ledger' id='ledger'></table>");
	var ledgerHeader= $("<thead class='ledger-head'><tr></tr></thead>");
	var ledgerHeaderLabels = ['date', 'description', 'responsible', 'amount paid', 'amount due', 'due date', 'paid'];
	$(ledgerHeaderLabels).each(function(index, label){
		var temp = "<td class="+ label + ">" + toTitleCase(label) + "</td>";
		temp = $(temp);
		ledgerHeader.append(temp);
	});
	ledgerTable.append(ledgerHeader);

	var ledgerRow1 = $("<tr id='row1' class='ledger'></tr>");
	console.log(row1);
	$(ledgerHeaderLabels).each(function(index, label){
		var temp = "<td class=" + label + ">" + row1[index] + "</td>";
		ledgerRow1.append(temp);
	});

	ledgerTable.append(ledgerRow1);

	//do the same thing here with row1 - make a structure for adding the data the same as the header
	//then, do the same thing with row1a and row1b. 

	var ledgerRow1a = $("<tr id='row1a' class='ledger'></tr>");
	console.log(row1a);
	$(ledgerHeaderLabels).each(function(index,label){
		var temp = "<td class=" + label + ">" + row1a[index] + "</td>";
		ledgerRow1a.append(temp);
	});

	ledgerTable.append(ledgerRow1a);

	var ledgerRow1b = $("<tr id='row1b' class='ledger'></tr>");
	console.log(row1b);
	$(ledgerHeaderLabels).each(function(index,label){
		var temp = "<td class=" + label + ">" + row1b[index] + "</td>";
		ledgerRow1b.append(temp);
	});
	ledgerTable.append(ledgerRow1b);

	leftColumn.append(dateSelect);
	leftColumn.append(ledgerTable);
	}

	function initAddForm(rowAdd, personAdd){
	var leftColumn = $('.leftColumn');
	var addForm = $('<br><div class="addForm"></div>');
	var addHeaderLabels = ['date', 'description', 'responsible', 'amount paid', 'amount due', 'due date', 'paid'];
	var addFormTable = $('#ledger');
	var addFormHeader = ($('<tr><td>&nbsp;</td></tr><tr class="ledger-head"><td>Add New</td></tr>'));
	var addRow1 = $("<tr id = 'ledger-add1' class='ledger'></tr>");
	var addRow2 = $("<tr id='ledger-add1a' class='ledger'></tr>");
	
	addFormTable.append(addFormHeader);
	var form = $('<form></form>');
	$(addHeaderLabels).each(function(index,label){
		var temp = "<td><input type = 'text' name =" +rowAdd[index] + " placeholder="+ rowAdd[index]+"></td>"
		addRow1.append(temp);
	});

	addFormTable.append(addRow1);

	$(addHeaderLabels).each(function(index,label){
		if (personAdd[index] == " "){
			var temp = "<td></td>";
		}
		else{
			var temp = "<td><input type = 'text' name =" +personAdd[index] + " placeholder="+ personAdd[index]+"></td>"
		}
		addRow2.append(temp);
	});

	addFormTable.append(addRow2);

	addForm.append(addFormTable);
	addForm.append('<input type="button" value="Clear">');
	var submitButton = $('<input value="Submit" type="submit">');
	submitButton.click(function(){
		console.log(this);
		duplicateRow();
		processRow();
	});
	addForm.append(submitButton);
	leftColumn.append(addForm);

	//Trigger function when button is clicked
	// $("#submit").click(function(){	
	// console.log(ledgerTable);
	// //Trying to use our current ledgerTable as a parameter here:
	// addNewRow($(ledgerTable));
	// return false;
	// });

	// //We then ping this method:
	// function addNewRow(ledgerTable){
	// var $tr = $(ledgerTable).find("tbody tr:last").clone();
	// $(ledgerTable).find("tbody tr:last").append($tr);
	// }

}

	$(document).ready(ready);


