var calculateFirstCondDiffenece = {
    type: 'call-function',
    func: function () {
        var baselineSum = 0;
        for (var i = 0; i < firstCondResponses.length; i++) {
            baselineSum += parseFloat(firstCondResponses[i]);
        }
        var baselineAverage = baselineSum / firstCondResponses.length; // U_i'
        firstCondDiffenece =  negativeImageAverage - baselineAverage; // (U -U_i')
    },
}

var calculateFeedback = function (mean, SD, cond){
    mean = parseFloat(mean);
    SD = parseFloat(SD);
    var feedback;
    var difference = firstCondDiffenece;
    feedback = Math.round(mean + (cond * 0.75 * SD) + difference); // mean + (cond * 0.75 * SD) + diff
    if (feedback > 100) {
        feedback = 100;
    }
    else if (feedback < -100) {
        feedback = -100;
    }
    return feedback;
}

// if SD < sqrt(5) kick the participart 
