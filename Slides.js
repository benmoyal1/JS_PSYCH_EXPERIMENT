//The texts to be presented
const pleaseRespondText = '?איך התמונה גורמת לך להרגיש';

const howDidTheyRespondText = function (name) {

    return  `?איך התמונה גרמה ל${name} להרגיש`;
};
const howTheyRatedText = function (name,gender) {
    var felt = gender == "male"? "הרגיש" :"הרגישה"
    return `:${name} ${felt}`;
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
        
        }
        document.body.style.focus  = 'none';
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
    trial_duration: 750,
    post_trial_gap: 500,
    data: {test_part: 'fixation'}
};



var feedbackScreen = function(picNum,gender,text){
    return {
            type: 'html-slider-response-modified',
            stimulus: function () {
            return '<div style="margin: auto; width: 100%; text-align: center;">' +
                '<img src="stimuli/' + picNum + '.jpg" style="max-width: 100%; max-height: 90vh;" />' +
                '</div>'
            },
            on_load : retForFeedback(gender),
            on_start:retForFeedback(gender),
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
                        duration: 1000
                    },
                    {
                        text: '<div style="text-align: center; color: red;">' +
                        '<div>' + text + '</div>' +
                        '<div>'+ trialResponse + '</div>' +
                      '</div>',
                        slider: true,
                        locked: true,
                        key_press: 'space',
                        text_color:'red',
                        slider_color: 'red',
                        start:trialResponse,
                    },
                ];
            },
            labels: redScaleLabel,
            max: 100, min: -100,
            post_trial_gap: 1000,    
        }
    };


var firstCond = function (ExpObj,gender,stage,age) {
    var picNum = ExpObj.pic_num;
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
            return '<div style="margin: auto; width: 100%; text-align: center;">' +
                '<img src="stimuli/' + picNum + '.jpg" style="max-width: 100%; max-height: 90vh;" />' +
                '</div>';
            },
            on_load : ret_fun(gender),
            on_start:function (){
                document.body.tabIndex = -1; 
            },
            blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
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
            // post_trial_gap: 1000,
            on_finish: function (data) {
                var trialResponse = data.response[1].slider; // trial response
                var trialResultObject = {
                    age:age,
                    gender : gender,
                    stage:stage,
                    imageNum:ExpObj.pic_num,
                    PredictionOrSelf:"Self Rating",
                    response :trialResponse,
                }
                if(stage ==1){firstCondResponses.push(trialResponse);}
                experimentResult.push(trialResultObject);
                console.log(trialResultObject);
            }
        },feedbackScreen(picNum,gender,thisIsYourResponseText(gender))]
    };
};




var otherFeedbackScreen = function(picNum,gender,text,otherCalc){
    return {
            type: 'html-slider-response-modified',
            stimulus: function () {
            return '<div style="margin: auto; width: 100%; text-align: center;">' +
                '<img src="stimuli/' + picNum + '.jpg" style="max-width: 100%; max-height: 90vh;" />' +
                '</div>'
            },
            on_load : retForFeedback(gender),
            on_start:retForFeedback(gender),
            blocks: function(){              
                return [
                    {
                        text: '',
                        slider: false,
                        locked: false,
                        duration: 1000
                    },
                    {
                        text: '<div style="text-align: center; color: red;">' +
                        '<div>' + text + '</div>' +
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
            post_trial_gap: 1000,    
        }
    };

var otherCond = function (ExpObj,gender,age) {
    var objName = ExpObj.name;
    var picNum = ExpObj.pic_num;
    var otherCalc = calculateFeedback(ExpObj.Mean, ExpObj["Std. Deviation"]);
    var howOtherFeltQu =howDidTheyRespondText(ExpObj.name); 
    var TheyRateText = howTheyRatedText(objName,gender);
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
                        locked: false,
                        duration: PRE_TRIAL_BREAK
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
            post_trial_gap: 1000,
            on_finish: function (data) {
                var trialResponse = data.response[1].slider; // trial response
                var trialResultObject = {
                    age:age,
                    gender : gender,
                    stage:2,
                    imageNum:ExpObj.pic_num,
                    PredictionOrSelf:"Self Rating",
                    otherCalc:otherCalc,
                    response :trialResponse,
                }
                firstCondResponses.push(trialResponse);
                experimentResult.push(trialResultObject);
                console.log(trialResultObject);
            }
        },
        otherFeedbackScreen(picNum,gender,TheyRateText,otherCalc)]
    };
};

var Stage3PresentAverage = function(name,average,gender) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
        return '<div style="margin: auto; width: 100%; text-align: center;">' +
            '</div>'
        },
        on_load : retForFeedback(gender),
        on_start:retForFeedback(gender),
        blocks: function(){
            return [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: 1000
                },
                {
                    text: '<div style="text-align: center; color: red;">' +
                    '<div>' + averageResponseWas(name) + '</div>' +
                    '<div>'+ average + '</div>' +
                  '</div>',
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
        post_trial_gap: 1000, 
        on_finish: function () {
            var trialResultObject = {averagePresented:average};
            trialResultObject.gender = gender;
            trialResultObject.stage = 3;
            experimentResult.push(trialResultObject);
        }
           
    }
}

var Stage3RateThisPerson = function (Name,gender,age) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                answerTheQuestions +
                '</div>';
        },
        on_load: ret_fun(gender),
            blocks: [
                {
                    text: rateLikablility(Name,gender),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                },
                {
                    text: rateTrustworthiness(Name,gender),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                },
                {
                    text: rateCompenetce(Name,gender),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                }
            ],
        labels: ['בכלל לא', 'מאוד'],
        max: 100, min: 0,
        post_trial_gap: 1000,
        slider_dir: 'ltr',
        on_finish:function(data)
        {   var responses = data.response;
            var lastIdx = experimentResult.length -1;
            experimentResult[lastIdx].likable = responses[0].slider;
            experimentResult[lastIdx].trustworthy = responses[1].slider;
            experimentResult[lastIdx].competent = responses[2].slider;
            experimentResult[lastIdx].age = age;
            // currentTrialData
            console.log(experimentResult[lastIdx]);
        }
    }
};


var stage3SinglePerson = function (Person,gender,age) {
    var finalArray = [fixation];
    finalArray.push(Stage3PresentAverage(Person.name,Person.average,gender,age));

    finalArray.push(Stage3RateThisPerson(Person.name,gender));
    return {
        timeline: finalArray
    }
};

