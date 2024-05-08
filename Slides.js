//The texts to be presented
const pleaseRespondText = '?איך התמונה גורמת לך להרגיש';


const howDidTheyRespondHTML = function (name) {
    return `
        <div style="text-align: center; color: white;">
            ?איך התמונה גרמה ל<span style="font-weight: bold; text-decoration: underline;">${name}</span> להרגיש
        </div>
    `;
};

const howTheyRatedHTML = function (name, gender) {
    var felt = gender == "male" ? "הרגיש" : "הרגישה";
    return `
        <div style="color: red;">
            <span style="font-weight: bold; text-decoration: underline;">${name}</span> ${felt}
        </div>
    `;
};


const averageResponseWas = function (name) {
    return `:התגובה הממוצעת של ${name} הייתה`
};
function thisIsYourResponseText(gender){
    response = gender =="male"? ":אתה הרגשת" : ":את הרגשת" 
    return response;
}
const answerTheQuestions = 'ענו על השאלה';

function rateLikablility (name,gender) {
    var liked = gender == 'male' ? "אהוב" : " אהובה";
    return `?כמה ${liked} ${name}` ;
}
const rateTrustworthiness = function (name, gender) {
    var trustworthy = gender == 'male' ? "אמין" : " אמינה";
    return `?כמה ${trustworthy} ${name}` ;

};
const rateCompenetce = function (name, gender) {
        var competent = gender == 'male' ? "בעל מסוגלות" : " בעלת מסוגלות";
    return `?כמה ${competent} ${name}` ;

    };

const scaleLabel =  ['-100<br> רע מאוד', '100<br> טוב מאוד']
const redScaleLabel = scaleLabel.map(label => '<span style="color: red;">' + label + '</span>');

// adjusting two JSPSYCH default  divs content to hebrew selected value of slider
// and continue with space default text
function ret_fun(gender){
    const changeDefaultSpaceMessageHTML = function () {
        var contentWrapper = document.querySelector('.jspsych-content-wrapper');
        contentWrapper.style.transform = 'scale(0.8)'; // Decrease scale (zoom out)

        var additionalMessages = document.getElementById('additional-messages');
        if (additionalMessages) {
            // Select the press-space message within additionalMessages
            var pressSpaceMessage = additionalMessages.querySelector('#press-space');
        
            if (pressSpaceMessage) {
                // Modify the text content of the press-space message based on gender
                var press = gender == "male" ? "לחץ" : "לחצי";
                pressSpaceMessage.textContent = press + ' על מקש הרווח כדי להמשיך '  ;
            }
        
        }
        document.body.style.focus  = 'none';
        var jspsychHtmlDiv = document.getElementById('jspsych-html-slider-response-container');
        var sliderValueSpan = jspsychHtmlDiv.querySelector('div > #slider-value');
        sliderValueSpan.style.display = 'none'; 

        var sliderInput = jspsychHtmlDiv.querySelector('input[type="range"]');
        sliderInput.addEventListener('click', function() {
            sliderValueSpan.style.display = 'block'; // Display the slider value span when the slider is clicked
        });
        }
        return changeDefaultSpaceMessageHTML;
}

function retForFeedback(gender){
    const changeDefaultSpaceMessageHTML = function () {
        // Check if the additionalMessages element exists
        var additionalMessages = document.getElementById('additional-messages');
        if (additionalMessages) {
            // Select the press-space message within additionalMessages
            var pressSpaceMessage = additionalMessages.querySelector('#press-space');
            if (pressSpaceMessage) {
                // Modify the text content of the press-space message based on gender
                var press = gender == "male" ? "לחץ" : "לחצי";
                pressSpaceMessage.textContent = press + ' על מקש הרווח כדי להמשיך '  ;
            }
            var jspsychHtmlDiv = document.getElementById('jspsych-html-slider-response-container');
            // var divs = jspsychHtmlDiv.querySelectorAll('div')[3];
            var sliderValueSpan = jspsychHtmlDiv.querySelector('div > #slider-value');
            sliderValueSpan.style.display = 'none';        
        }
        }
        return changeDefaultSpaceMessageHTML;
}
//Fixation slide
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">' +
        '<span style="font-size: 5vw"><b>+</b></span>' + 
        '</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: ITI_PRESENTATION,
    // post_trial_gap: PRE_TRIAL_BREAK,
    data: {test_part: 'fixation'}
};



var feedbackScreen = function(picNum,gender,text){
    return {
            type: 'html-slider-response-modified',
            stimulus: function () {
            return '<div style="margin: auto; width: 90%; text-align: center;">' +
                '<img src="stimuli/' + picNum + '.jpg" style="max-width: 90%; max-height:90%;" />' +
                '</div>'
            },
            on_load : retForFeedback(gender),
            blocks: function(){              
                var expValues = jsPsych.data.get().values()
                var trialIndex = expValues.length;
                var trialData = expValues[trialIndex - 1].response
                var trialResponse = trialData[1].slider  
                return [
                    {
                        text: '',
                        slider: false,
                        locked: false,
                        duration: 500
                    },
                    {
                        text: '<div style="text-align: center; color: red;">' +
                        '<div>' + text + '</div>' +
                        '<div>'+ trialResponse + '</div>' +
                      '</div>',
                        slider: true,
                        locked: true,
                        text_color:'red',
                        slider_color: 'red',
                        start:trialResponse,
                        key_press: null,
                        duration:RESPONSE_PRESENTATION
                    },
                    {
                        text: '<div style="text-align: center; color: red;">' +
                        '<div>' + text + '</div>' +
                        '<div>'+ trialResponse + '</div>' +
                      '</div>',
                        slider: true,
                        locked: true,
                        text_color:'red',
                        slider_color: 'red',
                        start:trialResponse,
                        key_press: 'space',
                    },
                ];
            },
            labels: redScaleLabel,
            max: 100, min: -100,
        }
    };


var firstCond = function (ExpObj,gender,stage,age,participantNum) {
    var picNum = ExpObj.pic_num;
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;  width: 80%; text-align: center; overflow: hidden;">' +
                    '<img src="stimuli/' + picNum + '.jpg" style="max-width: 100%; max-height: 100%;" />' +
                    '</div>';
            },
            on_load : ret_fun(gender),
            blocks: [
                {
                    text: '',
                    slider: false,
                    locked: true,
                    duration: STIMULUS_PRESENTATION,
                    
                },
                {
                    text: pleaseRespondText,
                    slider: true,
                    locked: false,
                    key_press: 'space',
                    require_response: true,
                },

            ],
            labels: scaleLabel,
            max: 100, min: -100,
            on_finish: function (data) {
                var trialResponse = data.response[1].slider; // trial response
                var trialResultObject = {
                    participantNum:participantNum,
                    age:age,
                    gender : gender,
                    stage:stage,
                    imageNum:picNum,
                    PredictionOrSelf:"Self Rating",
                    response :trialResponse,
                }
                if(stage ==1){firstCondResponses.push(trialResponse);}
                if(stage ==2){
                    trialResultObject.baseline = firstCondResponses.reduce((acc, curr) => acc + parseInt(curr), 0);}
                experimentResult.push(trialResultObject);
            }
        },feedbackScreen(picNum,gender,thisIsYourResponseText(gender))]
    };
};




var otherFeedbackScreen = function(picNum,gender,theyRateText,otherCalc){
    return {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto; width: 90%; text-align: center;">' +
                    '<img src="stimuli/' + picNum + '.jpg" style="max-width: 90%; max-height:90%;" />' +
                    '</div>'
                },
            on_load : retForFeedback(gender),
            blocks: function(){              
                return [
                    {
                        text: '',
                        slider: false,
                        locked: false,
                        duration: 500
                    },
                    {
                        text: '<div style="text-align: center; color: red;">' +
                        '<div>' + theyRateText + '</div>' +
                        '<div>'+ otherCalc + '</div>' +
                      '</div>',
                        slider: true,
                        locked: true,
                        key_press: null,
                        text_color:'red',
                        slider_color: 'red',
                        start:otherCalc,
                        duration:RESPONSE_PRESENTATION
                    },
                    {
                        text: '<div style="text-align: center; color: red;">' +
                        '<div>' + theyRateText + '</div>' +
                        '<div>'+ otherCalc + '</div>' +
                      '</div>',
                        slider: true,
                        locked: true,
                        key_press: 'space',
                        text_color:'red',
                        slider_color: 'red',
                        start:otherCalc,
                    },
                ];
            },
            labels: redScaleLabel,
            max: 100, min: -100,
            // post_trial_gap: 1000,    
        }
    };

var otherCond = function (ExpObj,gender,age,participantNum) {
    var objName = ExpObj.name;
    var objCond = ExpObj.cond;
    var picNum = ExpObj.pic_num;
    var otherCalc = calculateFeedback(ExpObj.Mean, ExpObj["Std. Deviation"],objCond);
    var howOtherFeltQu =howDidTheyRespondHTML(ExpObj.name); 
    var TheyRateText = howTheyRatedHTML(objName,gender);
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + picNum + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            on_load: ret_fun(gender),
            blocks: function () {
                return [
                    {
                        text: '',
                        slider: false,
                        locked: true,
                        duration: STIMULUS_PRESENTATION
                    },
                    {
                        text: howOtherFeltQu,
                        slider: true,
                        locked: false,
                        key_press: 'space',
                        require_response: true,
                        start: 0
                    }]
            },
            labels: scaleLabel,
            max: 100, min: -100,
            on_finish: function (data) {
                var trialResponse = data.response[1].slider; // trial response
                var trialResultObject = {
                    participantNum:participantNum,
                    age:age,
                    gender : gender,
                    stage:2,
                    imageNum:ExpObj.pic_num,
                    PredictionOrSelf:"Self Rating",
                    otherCalc:otherCalc,
                    response :trialResponse,
                    baseline : firstCondResponses.reduce((acc, curr) => acc + parseInt(curr), 0),
                }
                firstCondResponses.push(trialResponse);
                experimentResult.push(trialResultObject);
            }
        },
        otherFeedbackScreen(picNum,gender,TheyRateText,otherCalc)]
    };
};

var Stage3PresentAverage = function(name,average,gender,participantNum) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: calc(20vh) auto 0; width: 50%; text-align: center;">' + // Adjusted margin-top using calc() function
                '<div style="text-align: center; color: red;">' +
                    '<div>' + averageResponseWas(name) + '</div>' +
                    '<div>'+ average + '</div>' +
                '</div>' +
                '</div>';
        },
        on_load : retForFeedback(gender),
        blocks: function(){
            return [
                {
                    text: '',
                    slider: true,
                    locked: true,
                    key_press: null,
                    text_color:'red',
                    slider_color: 'red',
                    start:average,
                    duration: NAME_AVERAGE_PRESENTATION,
                },
                {
                    text: '',
                    slider: true,
                    locked: true,
                    key_press: 'space',
                    text_color:'red',
                    slider_color: 'red',
                    start:average,
                },
            ];
        },
        labels: redScaleLabel,
        max: 100, min: -100,
        // post_trial_gap: 1000, 
        on_finish: function () {
            var trialResultObject = {};
            trialResultObject.averagePresente = average;
            trialResultObject.participantNum = participantNum;
            trialResultObject.gender = gender;
            trialResultObject.stage = 3;
            experimentResult.push(trialResultObject);
        }
           
    }
}

var Stage3RateThisPerson = function (name,gender,age,instructionFunc,propertyRate) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: calc(20vh) auto 0; width: 50%; text-align: center;">' + // Adjusted margin-top using calc() function
                '<div style="text-align: center;">' +
                    '<div>' + answerTheQuestions + '</div>' +
                '</div>' +
                '</div>';
        },
        on_load: ret_fun(gender),
            blocks: [
                {
                    text: instructionFunc(name,gender),
                    slider_handle: false,
                    start: 50,
                    slider:true,
                    locked: true,
                    key_press: null,
                    duration:2000,
                },
                {
                    text: instructionFunc(name,gender),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: true,
                }
            ],
        labels: ['בכלל לא', 'מאוד'],
        max: 100, min: 0,
        slider_dir: 'ltr',
        on_finish:function(data)
        {   var responses = data.response;
            var lastIdx = experimentResult.length -1;
            experimentResult[lastIdx][propertyRate] = responses[1].slider;
            experimentResult[lastIdx].age = age;
            // currentTrialData
        }
    }
};


var stage3SinglePerson = function (Person,gender,age,participantNum) {
    var finalArray = [fixation];
    finalArray.push(Stage3PresentAverage(Person.name,Person.average,gender,participantNum));
    finalArray.push(Stage3RateThisPerson(Person.name,gender,age,rateLikablility,"Likable"));
    finalArray.push(Stage3RateThisPerson(Person.name,gender,age,rateTrustworthiness,"trustworthiness"));
    finalArray.push(Stage3RateThisPerson(Person.name,gender,age,rateCompenetce,"competence"));
    return {
        timeline: finalArray
    }
};




// var survey_questions = [
//     {
//       prompt: "How satisfied are you with our product?",
//       labels: ["Not satisfied at all", "Neutral", "Very satisfied"],
//       slider_width: 400
//     },
//     {
//       prompt: "How likely are you to recommend our service to others?",
//       labels: ["Not likely at all", "Neutral", "Very likely"],
//       slider_width: 400
//     },
//     {
//       prompt: "On a scale from 1 to 10, how easy was it to use our website?",
//       labels: ["1 (Very difficult)", "", "10 (Very easy)"],
//       slider_width: 400
//     }
//   ];
  
//   // Combine all questions into one stimulus
//   var combined_stimulus = survey_questions.map(function(question) {
//     return '<div style="margin-bottom: 20px;">' +
//            '<p>' + question.prompt + '</p>' +
//            '<div>' +
//            '<input type="range" id="slider' + survey_questions.indexOf(question) + '" min="0" max="100" value="50" style="width:' + question.slider_width + 'px;">' +
//            '</div>' +
//            '</div>';
//   }).join('');
  
//   // Define the trial
//   var trial = {
//     type: 'html-button-response',
//     stimulus: combined_stimulus,
//     choices: ['Next'], // Change to any button text you prefer
//     button_html: '<button class="jspsych-btn">%choice%</button>',
//     on_finish: function(data) {
//       // Retrieve slider values and store them in the trial data
//       survey_questions.forEach(function(question, index) {
//         var slider_value = document.getElementById('slider' + index).value;
//         data['slider' + index] = slider_value;
//       });
//     }
//   };
  