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
var Bill = function(addDate ,payTo, owner, dueDate, amtPaid, amtDue, paid){
	this.payTo = payTo;
	this.owner = owner;
	//javascript dates are YY MM DD
	//var today = this.getDate(new Date());
	//this.addDate = new Date(today.getYear(), today.getMonth(), today.getYear());
	this.addDate = addDate;
	var dueDateTemp = dueDate.split('/');//returns an array, but, expected entry of dates will be MM/DD/YY
	//this.dueDate = new Date(/*year*/dueDateTemp[2], /*month*/dueDateTemp[0],/*day*/ dueDateTemp[1]);
	this.dueDate = dueDate;
	this.paid = amtPaid;
	this.amtDue = amtDue;
	this.hasPaid = paid;

	//payees is an array of people who are additionally paying
	this.payees = []
	//add the owner to the list of payees. 
	//payees.push(new Payee (this.owner, this.amtPaid, this.amtDue));
	//owner.bills.push(this);
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
	//this.paid = 0;
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
Bill.prototype.addPayee = function(user, payeePaid, payeeDue){
	this.payees.push(new Payee(user, payeePaid, payeeDue));
	this.updateAmountPaid();
	//user.bills.push(this);
}

/*updatePayee()
 *
 *updates the amount that the payee has paid so far
 *and how much the payee owes, if applicable. 
 *then, it updats the amount paid of the bill
 */
Bill.prototype.updatePayee = function(user, payeePaid, payeeDue){
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