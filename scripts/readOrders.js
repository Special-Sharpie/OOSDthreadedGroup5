/**
 * readOrders.js
 * Validating data of the Orders form
 * Author: Daniel Palmer
 * CPRG 207 - Threaded Project
 * 2021-12-04
 */

// Function to validate the order form.
// Ensures that all fields are filled
function validate(){
        var elements = document.getElementById("orderForm").elements;
        var form = document.forms[0]
        var filledFields = 0;
        var values = []
        for (var i = 0, element; element = elements[i++];) {
            values.push(element.value)
            if (element.value === ""){
                filledFields++
            };
        };
        if (filledFields != 0){
            alert(filledFields + " required fields are missing.");
            return false;
        }else{
             return confirm("Confirm and Submit information?");
        };
};