//The texts to be presented
const pleaseRespondText = '?איך התמונה גורמת לך להרגיש';

const howDidTheyRespondText = function (name) {

    return  `?איך התמונה גרמה ל${name} להרגיש`;
};
const howTheyRatedText = function (name,gender) {
    var felt = gender == "male"? "הרגיש" :"הרגישה"
    return `:${name} ${felt}`;
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

const scaleLabel =  ['-100<br> שלילי מאוד', '100<br> חיובי מאוד']

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

        }}
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


var firstCond = function (ExpObj,gender) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
            return '<div style="margin: auto; width: 100%; text-align: center;">' +
                '<img src="stimuli/' + ExpObj['pic_num'] + '.jpg" style="max-width: 100%; max-height: 90vh;" />' +
                '</div>';
            },
            on_load : ret_fun(gender),
            
            blocks: [
                {
                    text: '',
                    // slider: false,
                    // locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: pleaseRespondText,
                    slider: true,
                    locked: false,
                    key_press: 'space',
                    require_response: true
                }
            ],
            labels: scaleLabel,
            max: 100, min: -100,
            data: function () {
                return {
                    Image: ExpObj.pic_num,
                    Valence: parseFloat(ExpObj.Mean) > 0 ? 'Positive' : 'Negative'
                }
            },
            post_trial_gap: 1000,
            on_finish: function (data) {
                firstCondResponses[data.Valence].push(data.response[1].slider);
            }
        }]
    };
};
    

var selfCond = function (ExpObj,gender) {
    return {
        timeline: [fixation,{
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.pic_num + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            on_load: ret_fun(gender),
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
                    require_response: true
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: 1000
                },
                {
                    text: thisIsYourResponseText(gender),
                    slider: true,
                    locked: true,
                    key_press: 'space',
                    slider_color: 'red',
                    start: '$1$'
                },
            ],
            labels: scaleLabel,
            max: 100, min: -100,
            post_trial_gap: 1000,
            data: function () {
                return {
                    Image: ExpObj.pic_num,
                    Valence: parseFloat(ExpObj.Mean) > 0 ? 'Positive' : 'Negative'
                };
            }
        }]}
};


var otherCond = function (ExpObj,gender) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.pic_num + '.jpg" style="width: 500px;" />' +
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
                        text: howDidTheyRespondText(ExpObj.name),
                        slider: true,
                        locked: false,
                        key_press: 'space',
                        require_response: true
                    },
                    {
                        text: '',
                        slider: false,
                        locked: false,
                        duration: 1000
                    },
                    {
                        text: howTheyRatedText(ExpObj.name,gender),
                        slider: true,
                        locked: true,
                        key_press: 'space',
                        slider_color: 'red',
                        start: calculateFeedback(ExpObj.Mean, ExpObj["Std. Deviation"])
                    },
                ]
            },
            labels: scaleLabel,
            max: 100, min: -100,
            post_trial_gap: 1000,
            data: function () {
                return {
                    Image: ExpObj.pic_num,
                    Valence: parseFloat(ExpObj.Mean) > 0 ? 'Positive' : 'Negative'
                };
            }
        }]
    };
};


var stage3ShowImage = function (ImageInd, ImageMean, ImageSD, Name, PersonCond,gender) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/' + ImageInd + '.jpg" style="width: 500px;" />' +
                '</div>';
        },
        on_load: ret_fun(gender),
        blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: howTheyRatedText(Name,gender),
                    slider: true,
                    locked: true,
                    start: calculateFeedback(ImageMean, ImageSD, PersonCond),
                    slider_color: 'red',
                    key_press: 'space',
                    require_response: false,
                }
            ],
        labels: scaleLabel,
        max: 100, min: -100,
        post_trial_gap: 1000,
        data: function () {
            return {
                trial_type: 'Stage 3 Show Images'
            };
        }
    }
};


var Stage3RateThisPerson = function (Name,gender) {
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
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateLikablility(Name,gender),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
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
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
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
        data: function () {
            return {
                Person: Name,
            };
        }
    }
};


var stage3SinglePerson = function (Person,gender) {
    var finalArray = [fixation];
    for (var i = 0; i < Person.images.length; i++) {
        var cur = Person.images[i];
        finalArray.push(stage3ShowImage(cur.pic_num, cur.Mean, cur["Std. Deviation"], Person.name, Person.cond,gender));
    }
    finalArray.push(Stage3RateThisPerson(Person.name,gender));
    return {
        timeline: finalArray
    }
};

