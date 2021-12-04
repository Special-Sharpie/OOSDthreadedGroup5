/**
 * dateFormatting.js
 * Helps to show date-time in meaningful way & highlight expired packages' start/end dates 
 * Author: Marat Nikitin
 * Co-author: Daniel Palmer
 * CPRG 207 - Threaded Project
 * 2021-12-02
 */

 const dayjs = require("dayjs");
 const advancedFormat = require('dayjs/plugin/advancedFormat');
 dayjs.extend(advancedFormat);
 
 /* Below we set the date-time format for the Packages page */
 function dateFormatting(requestedDate){
     return dayjs(requestedDate).format('dddd MMMM D, YYYY, h:mm a');
 };
 
 /* Below we set different text colours and boldness for dates based on if they 
      are in the future (green colour) or the past (bold red color) */
 function dateColour(dateTested) {
    var dateTested = Date.parse(dateTested);
    var dateDifference = (dateTested - Date.now())/(1000*86400);
    var dateColourValue;
    var boldnessValue;
    if (dateDifference > 0) {
       dateColourValue = "green";
       boldnessValue = "400";
    }
    else {
       dateColourValue = "red";
       boldnessValue = "bold";
    };  
    return [dateColourValue, boldnessValue];
    /* Two values need to be returned, therefore we use an array */
 };
 
 exports.formattedDate = (requestedDate)=>{
   return [dateFormatting(requestedDate), dateColour(requestedDate)[0], dateColour(requestedDate)[1]];
 };
