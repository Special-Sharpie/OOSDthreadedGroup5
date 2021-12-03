/**
 * dateFormatting.js
 * Helps to show date-time in meaningful way
 * Author: Marat Nikitin
 * CPRG 207 - Threaded Project
 * 2021-12-02
 */

 const dayjs = require("dayjs")
 const advancedFormat = require('dayjs/plugin/advancedFormat');
 dayjs.extend(advancedFormat);
  
 exports.dateFormatting = ()=>{
     return dayjs().format('dddd MMMM D, YYYY, h:mm a');
 };
 
