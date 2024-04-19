var calculateFirstCondDiffenece = {
    type: 'call-function',
    func: function () {
        var sum = 0;
        for (var i = 0; i < firstCondResponses.Negative.length; i++) {
            sum += parseFloat(firstCondResponses.Negative[i]);
        }
        firstCondDiffenece.Negative = (sum / firstCondResponses.Negative.length)- negativeImageAverage;
        sum = 0;
        for (var i = 0; i < firstCondResponses.Positive.length; i++) {
            sum += parseFloat(firstCondResponses.Positive[i]);
        }
        firstCondDiffenece.Positive = (sum / firstCondResponses.Positive.length) - positiveImageAverage;

    }
}

var calculateFeedback = function (mean, SD, cond=0) {
    mean = parseFloat(mean);
    SD = parseFloat(SD);
    var feedback;
    var difference = mean >= 0 ? firstCondDiffenece.Positive : firstCondDiffenece.Negative;
    if (cond==0 && mean <0) {cond = Condition}
    feedback = Math.round(mean + (cond * 0.75 * SD) + difference);
    if (feedback > 100) {
        feedback = 100;
    }
    else if (feedback < -100) {
        feedback = -100;
    }
    return feedback;
}