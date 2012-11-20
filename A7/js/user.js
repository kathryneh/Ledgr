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