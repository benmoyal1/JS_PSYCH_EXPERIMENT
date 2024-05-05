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


async function sendDataToServer(dataJson,gender,participantNum) {
    try {
        const devUrl = 'http://localhost:3000/';
        const serverUrl = 'https://express-backend-exp.vercel.app/';
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: dataJson,
                "participantNum":participantNum,
                "gender":gender})
        }); 
        const result = await response.json(); // Parse response as JSON
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getParticipantNum() {
    try {
        const devUrl = 'http://localhost:3000/';
        const serverUrl = 'https://express-backend-exp.vercel.app/';
        const response = await fetch(serverUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json(); // Parse response as JSON
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}