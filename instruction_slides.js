
var welcomeSlideA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_1_opening_page.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    trial_duration:WELCOME_HOLD,
};
var welcomeSlideB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_1_opening_page.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};


var stage1InstFemaleA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_female.png" style="width:80%; height:80%;"></div>',
        choices: null,
        response_ends_trial:false,
        trial_duration:STAGE_1_INSTRUCTION_HOLD,
};
var stage1InstFemaleB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_female.png" style="width:80%; height:80%;"></div>',
    choices: ['space']
};

var stage1InstMaleA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_male.png" style="width:100%; height:80%;"></div>',
    choices: null,
    response_ends_trial:false,
    trial_duration:STAGE_1_INSTRUCTION_HOLD,
};
var stage1InstMaleB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_male.png" style="width:100%; height:80%;"></div>',
    choices: ['space']
};

var stage2InstFemaleA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_3_stage_2_female.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    trial_duration:STAGE_2_INSTRUCTION_HOLD,
};
var stage2InstFemaleB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_3_stage_2_female.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var stage2InstMaleA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_3_stage_2_male.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    trial_duration:STAGE_2_INSTRUCTION_HOLD,
};
var stage2InstMaleB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_3_stage_2_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};
var stage3InstFemaleA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_4_stage_3_female.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    trial_duration:STAGE_3_INSTRUCTION_HOLD,
};
var stage3InstFemaleB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_4_stage_3_female.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var stage3InstMaleA = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_4_stage_3_male.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    trial_duration:STAGE_3_INSTRUCTION_HOLD,
};
var stage3InstMaleB = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_4_stage_3_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};


var fifthSlideMale = function(gender,participantNum) {
    return {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_5_ending_male.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    on_load:function(){
        console.log(experimentResult);
        sendDataToServer(experimentResult,gender,participantNum); 
    }
}};


var fifthSlideFemale = function(gender,participantNum) {
    return {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_5_ending_female.png" style="width:100%; height: auto;"></div>',
    choices: null,
    response_ends_trial:false,
    on_load:function(){
        console.log(experimentResult);
        sendDataToServer(experimentResult,gender,participantNum); 
    }}
};

// var fullscrenStart = {
//     type: 'fullscreen',
//     fullscreen_mode: true
//   };
//   // exit fullscreen mode
//   var fullscrenEnd = {
//     type: 'fullscreen',
//     fullscreen_mode: false
//   };