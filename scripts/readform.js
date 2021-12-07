/**
 * readform.js
 * Form data validation scripts are here
 * Author: Daniel Palmer
 * CPRG 207 - Threaded Project
 * 2021-12-01
 */

//Pre-defined regex expressions for value validation
var postalCheck = /(^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$)|(^\d{5}-\d{4}$)|(^\d{5}$)/
var phoneCheck = /(^\d{10}$)|(^\(\d{3}\)-\d{3}-\d{4}$)|(^\d{3}-\d{3}-\d{4}$)/

function checkValue(value, reg){
    if (reg.test(value)){
        return true
    }else{
        return false
    }
}

/**
 * Below is the form validation.
 * First confirming all fields are filled
 * Second verifying the password and confirm password are the same
 * Third verifies postal code / zip code is formated properly
 * Forth verifies that the phone number is formated properly
 * Last, and ALWAYS LAST, the page requests confirmation to submit information to the server.
 */
function validate(){
    var elements = document.getElementById("registerform").elements;
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
    }else if (form.password.value != form.cpassword.value){
        alert("Password and Confirm Password do not match!");
        return false;
    }else if(!checkValue(form.postalcode.value, postalCheck)){
        alert("Invalid Postal Code!");
        return false;
    }else if(!checkValue(form.phonenumber.value, phoneCheck)){
        alert("Invalid Phone Number or Format");
        return false;
    }else if(!checkValue(form.busphone.value, phoneCheck)){
        alert("Invalid Phone Number or Format")
        return false;
    }else{
        return confirm("Confirm and Submit information?");
    };
};

