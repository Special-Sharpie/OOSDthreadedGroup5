/**
 * dateColour.js
 * Helps to change fonts of the dates at the Packages page
 * Author: Marat Nikitin
 * CPRG 207 - Threaded Project
 * 2021-12-04
 */

 function dateColour(dateTested) {
    var dateTested = Date.parse(dateTested);
    var dateDifference = (dateTested - Date.now())/(1000*86400);
    console.log("The checked date (in dateColour.js) is " + dateDifference + " days from now");
    var dateColourValue = "blue";
    if (dateDifference > 0) {
       console.log("The checked date is in the future");
       dateColourValue = "green";
    }
    else {
       console.log("The checked date  is in the past");
       dateColourValue = "red";
    };  
    console.log("The date's text colour should become " + dateColourValue);
    return dateColourValue;
 };

 module.exports = {
  dateColour
 };
 
