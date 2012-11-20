		var submitForm = function(event){
			event.preventDefault();
			console.log($('#amountOwed').val());
			var newBill = new Bill($('#dateReceived').val(),
								   $('#description').val(), 
							   $('#responsible').val(),
							   $('#dueDate').val(), 
							   $('#amountOwed').val(),
							   $('#amountDue').val(),
							   $('#paid').val());
			console.log(newBill);
			newBill.addPayee($('#addPerson').val(), $('#addAmountOwed').val(), $('#addAmountDue').val());
			var newRow = '<tr class="ledger"><td>';
				newRow += newBill.addDate;
				newRow += '</td><td>';
				newRow += newBill.payTo;
				newRow += '</td><td>';
				newRow += newBill.owner;
				newRow += '</td><td>';
				newRow += newBill.paid;
				newRow += '</td><td>';
				newRow += newBill.amtDue;
				newRow += '</td><td>';
				newRow += newBill.dueDate;
				newRow += '</td><td>';
				newRow += newBill.isPaid();
				newRow += '</td></tr>';
				newRow = $(newRow);
			var newPayeeRow = '<tr class="ledger"><td>';
			    newPayeeRow += '</td><td>';
			    newPayeeRow += '</td><td>';
			    newPayeeRow += newBill.payees[0].user;
			    newPayeeRow += '</td><td>';
			    newPayeeRow += newBill.payees[0].payeePaid;
			    newPayeeRow += '</td><td>';
			    newPayeeRow += newBill.payees[0].payeeDue; 
			    newPayeeRow += '</td><td>';
			    newPayeeRow += '</td><td>';
			    newPayeeRow += newBill.payees[0].isPaid();
			    newPayeeRow += '</td></tr>';
			$('#ledger').append(newRow);
			$('#ledger').append(newPayeeRow);
			$('#dateReceived').val('');
			$('#description').val(''); 
		    $('#responsible').val('');
			$('#dueDate').val(''); 
			$('#amountOwed').val('');
			$('#amountDue').val('');
			$('#paid').val('');
		}