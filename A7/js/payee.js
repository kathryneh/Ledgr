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
	if(this.payeePaid == this.payeeDue) return "Yes";
	return "No";
}