//The texts to be presented
const pleaseRespondText = 'How did the picture make you feel?';
const howDidTheyRespondText = function (name) {
    return 'How did the picture make ' + name + ' feel?';
};
const howTheyRatedText = function (name) {
    return name + ' felt:';
};
const thisIsYourResponseText = 'YOU felt:';
const answerTheQuestions = 'Please answer the following questions:';
const rateLikablility = function (name) {
    return 'How likable is ' + name + '?';
};
const rateTrustworthiness = function (name) {
    return 'How trustworthy is ' + name + '?';
};
const rateCompenetce = function (name) {
    return 'How competent is ' + name + '?';
};

//Fixation slide
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">' +
        '<span style="font-size: 200px"><b>+</b></span>' +
        '</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 750,
    post_trial_gap: 500,
    data: {test_part: 'fixation'}
};

var firstCond = function (ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj['pic_num'] + '.jpg" style="width: 500px;" />' +
                    '</div>';
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
                    require_response: true
                }
            ],
            labels: ['-100', '100'],
            max: 100, min: -100,
            data: function () {
                return {
                    Image: ExpObj.pic_num,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative'
                }
            },
            post_trial_gap: 1000,
            on_finish: function (data) {
                firstCondResponses[data.Valence].push(data.response[1].slider);
            }
        }]
    };
};
    

var selfCond = function (ExpObj) {
    return {
        timeline: [fixation,{
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.pic_num + '.jpg" style="width: 500px;" />' +
                    '</div>';
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
                    require_response: true
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: 1000
                },
                {
                    text: thisIsYourResponseText,
                    slider: true,
                    locked: true,
                    key_press: 'space',
                    slider_color: 'red',
                    start: '$1$'
                },
            ],
            labels: ['-100<br>Very negative', '100<br>Very positive'],
            max: 100, min: -100,
            post_trial_gap: 1000,
            data: function () {
                return {
                    Image: ExpObj.pic_num,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative'
                };
            }
        }]}
};


var otherCond = function (ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.pic_num + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
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
                        text: howTheyRatedText(ExpObj.name),
                        slider: true,
                        locked: true,
                        key_press: 'space',
                        slider_color: 'red',
                        start: calculateFeedback(ExpObj.mean, ExpObj.SD)
                    },
                ]
            },
            labels: ['-100<br>Very negative', '100<br>Very positive'],
            max: 100, min: -100,
            post_trial_gap: 1000,
            data: function () {
                return {
                    Image: ExpObj.pic_num,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative'
                };
            }
        }]
    };
};


var stage3ShowImage = function (ImageInd, ImageMean, ImageSD, Name, PersonCond) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/' + ImageInd + '.jpg" style="width: 500px;" />' +
                '</div>';
        },
        blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: howTheyRatedText(Name),
                    slider: true,
                    locked: true,
                    start: calculateFeedback(ImageMean, ImageSD, PersonCond),
                    key_press: 'space',
                    require_response: false,
                }
            ],
        labels: ['-100<br>Very negative', '100<br>Very positive'],
        max: 100, min: -100,
        post_trial_gap: 1000,
        data: function () {
            return {
                trial_type: 'Stage 3 Show Images'
            };
        }
    }
};


var Stage3RateThisPerson = function (Name) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                answerTheQuestions +
                '</div>';
        },
        blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateLikablility(Name),
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
                    text: rateTrustworthiness(Name),
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
                    text: rateCompenetce(Name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                }
            ],
        labels: ['not at all', 'Extremely'],
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


var stage3SinglePerson = function (Person) {
    var finalArray = [fixation];
    for (var i = 0; i < Person.images.length; i++) {
        var cur = Person.images[i];
        finalArray.push(stage3ShowImage(cur.pic_num, cur.mean, cur.SD, Person.name, Person.cond));
    }
    finalArray.push(Stage3RateThisPerson(Person.name));
    return {
        timeline: finalArray
    }
};

