/*dataModel.js for Ledgr*/
/*we'll separate these into other files later*/

/*Bill.js
 *has functions getDate
				updateAmountPaid
				isPaid
				addPayee
				isOverdue
				updatePayee
 *models the information associated with a bill, including metadata
 *such as who the bill will be paid to, the person responsible
 *for submitting the payment to the bill, the amount of the bill, 
 *the amount thus paid of the bill, the due date, the add date, 
 *and whether the bill is overdue. 
 */
var Bill = function(payTo, owner, dueDate, amtPaid, amtDue, totalDue){
	this.payTo = payTo;
	this.owner = owner;
	//javascript dates are YY MM DD
	var today = new Date();
	this.addDate = new Date(today.getYear(), today.getMonth(), today.getYear());
	var dueDateTemp = dueDate.split('/');//returns an array, but, expected entry of dates will be MM/DD/YY
	this.dueDate = new Date(/*year*/dueDateTemp[2], /*month*/dueDateTemp[0],/*day*/ dueDateTemp[1]);
	this.totalDue = totalDue;
	this.paid = amtPaid;

	//payees is an array of people who are additionally paying
	this.payees = []
	//add the owner to the list of payees. 
	payees.push(new Payee (this.owner, this.amtPaid, this.amtDue));
	owner.bills.push(this);
}

/*getDate()
 *
 * print out the date as a string
 */
Bill.prototype.getDate = function(date){
	return this.date.getMonth() + "/" + this.date.getDay(); + "/" + this.date.getYear();
}

/* updateAmountPaid()
 *
 * finds the amount paid out of the total bill by all payees
 * should be udpated each time a payee is added
 */
Bill.prototype.updateAmountPaid = function(){
	this.paid = 0;
	$(this.payees).each(function(index, payee){
		paid += payee.payeePaid;
	});
	return paid;
	this.isPaid();
}

/*isPaid()
 *
 *returns a string literal of whether the bill is paid or not
 */
Bill.prototype.isPaid = function(){
	if(this.paid >= this.totalDue){
		return "Yes";
	}
	else{
		return "No";
	}
}

/*addPayee()
 *
 *adds a new payee to the list of payees, takes arguments of the
 *amount that the payee must pay and the amount the payee has paid 
 *thus far
 */
Bill.prototpye.addPayee = function(user, payeePaid, payeeDue){
	this.payees.push(new Payee(user, payeePaid, payeeDue);
	this.updateAmountPaid();
	user.bills.push(this);
}

/*updatePayee()
 *
 *updates the amount that the payee has paid so far
 *and how much the payee owes, if applicable. 
 *then, it updats the amount paid of the bill
 */
Bill.protoype.updatePayee = function(user, payeePaid, payeeDue){
	$(this.payees).each(function(index, payee){
		if (payee.user == user){
			if(!payeePaid == undefined){
				payee.payeePaid = payeePaid;
			}
			if(!payeeDue == undefined){
				payee.payeeDue = payeeDue;
			}
		}
	});
	this.updateAmountPaid();
}

/*overDue()
 *
 *returns a string literal of whether the bill is past it's due date
 */
Bill.prototype.overDue = function(){
	var present = new Date()
	if(present > this.DueDate){
		return true;
	}
	return false;
}


/*User.js*/
/*has functions owed
				totalOwed
				totalSpent
				totalOwedTo
				getName
				addBill
 * contains the name information and a list of bills applied to the user
 */
var User = function(first, last){
	this.first = first;
	this.last = last;

	//Bills is an array of bills added to the user
	this.bills = [];
}
/*owed()
 *
 *returns the amount the user owes
 */
User.prototype.owed = function(){
	var owed = 0;
	$(this.bills).each(function(index, bill){
		$(bill.payees).each(function(billIndex, payee){
			//check all of the amounts that the user has left to pay 
			if(payee == user){
				owed+=(payee.payeeDue - payee.payeePaid);
			}
		})
	});
	return owed;
}

/*totalOwed()
 *
 *the total owed is the total amount that the user has been responsible for
 */
User.prototype.totalOwed = function(){
	var totalOwed=0;
	$(this.bills).each(function(index, bill){
		$(bill.payees).each(function(billIndex, payee){
			//check all of the amounts that the user has left to pay 
			if(payee == user){
				totalOwed+=(payee.payeeDue);
			}
		})
	});
	return totalOwed;
}
/*totalSpent()
 *
 *the total spent is the total amount that the user has paid out
 */
User.prototype.totalSpent = function(){
	var spent=0;
	$(this.bills).each(function(index, bill){
		$(bill.payees).each(function(billIndex, payee){
			//check all of the amounts that the user has left to pay 
			if(payee == user){
				spent+=(payee.payeePaid);
			}
		})
	});
	return totalSpent;
}

/*the totalOwedTo is the total amount that the user has paid for a bill in all
  on bills that this user is the owner for, and the amount that the other users
  are still left to pay*/
User.prototype.totalOwedTo = function(){
	var totalOwedTo=0;
	$(this.bills).each(function(index, bill){
		if (bill.owner == this){
			$(bill.payees).each(function(billIndex, payee){
				//check all of the amounts that the user has left to pay 
				if(payee != this){
					totalOwedTo += (payee.payeeDue - payee.payeePaid);
				}
			})
		}
	});
	return totalOwedTo;
}
/*getName()
 *
 *returns the string of the first and last name of the user 
 */
User.prototype.getName = function(){
	return this.firstName + " " + this.lastName;
}

/*Payee.js*/
/*has functions isPaid*/ 
/*a payee is a data model for the bill object;
 *this holds all of the information about each particular
 *person who is paying, and also contains 
 */
var Payee = function(user, payeePaid, payeeDue){
	this.user = user; 
	this.payeePaid = payeePaid;
	this.payeeDue = payeeDue;
}
/*isPaid()
 *
 *returns whether the payee has paid his portion or not
 */
Payee.prototype.isPaid = function(){
	return (this.payeePaid == this.payeeDue);
}