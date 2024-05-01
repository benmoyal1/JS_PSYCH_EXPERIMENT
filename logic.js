var calculateFirstCondDiffenece = {
    type: 'call-function',
    func: function () {
        var sum = 0;
        for (var i = 0; i < firstCondResponses.length; i++) {
            sum += parseFloat(firstCondResponses[i]);
        }
        firstCondDiffenece = (sum / firstCondResponses.length) - negativeImageAverage;
    },
}

var calculateFeedback = function (mean, SD, cond=0) {
    mean = parseFloat(mean);
    SD = parseFloat(SD);
    var feedback;
    var difference = firstCondDiffenece;
    if (cond==0 && mean <0) {cond = Condition}
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
