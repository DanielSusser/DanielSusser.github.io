$(document).ready(function(){
//$('#accuracyChecker').css("display","none")
  $('#sizeLink').click(function(){
  $('#landingPage').css("display","none");
  $('#significanceChecker').css("display","none")
  $('#sampleSizeChecker').css("display","");
  });
$('#significanceLink').click(function(){
  $('#landingPage').css("display","none");
  $('#sampleSizeChecker').css("display","none");
  $('#significanceChecker').css("display","");
});//click significance
  $('#home').click(function(){
    $('#significanceChecker').css("display","none");
    $('#sampleSizeChecker').css("display","none");
 $('#landingPage').css("display","");
  });
    $('#home').click(function(){
    $('#significanceChecker').css("display","none");
    $('#sampleSizeChecker').css("display","none");

    $('#landingPage').css("display","");

  });
  $('#home').mouseover(function(){
    $(this).css("color", 'white');
    $(this).css("cursor", 'pointer')
  });
  $('#home').mouseout(function(){
    $(this).css("color", 'black');

  });

     //onmouseout="this.style.color = 'black';"
//size checker function (delete the one below)
var NormSInv = function(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

  return retVal;
};
var calculate = function(){
  var fail = $('#failCondition').val()/100;
  var sampleSize = $('#sampleSize').val();
  var measured = $('#measuredConversion').val()/sampleSize;
  var standardError = Math.sqrt((measured*(1-measured))/sampleSize);
  var tStatistic = (measured-fail)/standardError;
  var normalDist = 1-(Math.sqrt(1/(2*Math.PI))* Math.exp(-Math.pow(tStatistic,2)/2));
  //Calculates the sample size needed for the uncertain examples
 var calculateSuggestedSize = function(failCondition,measuredRate){
  var confidence = 0.95;
  var tStatistic = NormSInv((1-confidence)/2);
  var sampleSizeNeeded = Math.floor((measuredRate*(1-measuredRate))/Math.pow(
    ((measuredRate - failCondition)/tStatistic),2));
      /*Math.floor(
    (measuredRate*(1-measuredRate))/Math.pow((
    (measuredRate - failCondition)/tStatistic),2));*/
 return sampleSizeNeeded;
 };
    /*
  var sampleSizeNeeded = Math.floor(
    ($('#expectedMeasured').val()/100)*(1-($('#expectedMeasured').val()/100))/Math.pow((
    (($('#expectedMeasured').val())/100 - ($('#failCondition1').val()/100))/tStatistic1),2));
    */

  //Works out the conversion rate (as opposed to number of conversions)
  $('#conversionRate').html("<span style='font-size:14px'>(conversion rate: "+(measured*100).toFixed()+"%)</span>");
  if($('#measuredConversion').val()===""||$('#failCondition').val()===""||$('#sampleSize').val()===""){

      $('#results').html("<div class='col-md-12'><span style='color:red'>You've left some empty boxes above, please enter numbers for all three fields! Thank you. Appreciated.</span></div>");
    }
    else if(measured>=fail && normalDist>=0.95){

  $('#results').html("<img class=\"col-md-2 col-md-offset-1\" src=\"https://openclipart.org/image/800px/svg_to_png/214028/Thumbs-Up-Circle.png\"><div class=\"col-md-9 col-md-offset-1\">Great News! You can be <strong>"+(Math.floor(normalDist*100))+"%</strong> certain that your conversion rate is above "+fail*100+"%.");
   }else if(measured>=fail){
          $('#results').html("<img class=\"col-md-2 col-md-offset-1\" src=\"http://namduoc.vn/wp-content/uploads/2016/07/Question-Rage-Face.jpg\"><div class=\"col-md-9 col-md-offset-1\">Hmmmm, seems like you can only be <strong>"+(Math.floor(normalDist*100))+"%</strong> certain that your conversion rate is above "+fail*100+"%. Try increasing the sample size nearer to "+calculateSuggestedSize(fail,measured));
    }else{
      $('#results').html("<img class=\"col-md-2 col-md-offset-1\" src=\"https://openclipart.org/image/2400px/svg_to_png/214030/Thumbs-Down-Circle.png\"><div class=\"col-md-9 col-md-offset-1\">Uh Oh, you can be <strong>"+(Math.floor(normalDist*100))+"%</strong> certain that your conversion rate is below "+fail*100+"%. ABANDON SHIP ME HEARTIES!!")
    }
};/*end of calculate function*/
var calculate1 = function(){
  if(e.keycode===13||e.which===13){
    calculate()
  }
};
$('#calculate').click(function(){
  calculate();
});

var clearFields = function(){
  $('#confidence').val(95);
  $('#failCondition1').val("");
  $('#expectedMeasured').val("");
  $('#results1').html("")
};
var clearFieldsSignificanceChecker = function(){
  $('#sampleSize').val("");
  $('#failCondition').val("");
  $('#measuredConversion').val("");
  $('#results').html("")
};
$('#clearSampleSizeCalc').click(function(){
  clearFields();
  })//clear function
//size checker function
var NormSInv = function(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

  return retVal;
};


$('#calculate1').click(function(){
  var $confidence = ($('#confidence').val())/100;
  var tStatistic1 = NormSInv((1-$confidence)/2);
  var sampleSizeNeeded = Math.floor(
    ($('#expectedMeasured').val()/100)*(1-($('#expectedMeasured').val()/100))/Math.pow((
    (($('#expectedMeasured').val())/100 - ($('#failCondition1').val()/100))/tStatistic1),2));
  if($('#confidence').val()===""||$('#expectedMeasured').val()===""||$('#failCondition1').val()===""){

    $('#results1').html("<div class='col-md-12'><span style='color:red'>You've left some empty boxes above, please enter numbers for all three fields! Thank you. Appreciated.</span></div>");
  }
  else{
    $('#results1').html("<p>You will need a sample size of at least <strong>"+sampleSizeNeeded+"</strong> to have a statistically significant result</p>" //.html
    );
  }
})

$('#clearSignificanceChecker').click(function(){
  clearFieldsSignificanceChecker()
});
})
