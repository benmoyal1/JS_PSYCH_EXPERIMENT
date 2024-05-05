// Instruction slides

var firstSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_1_opening_page.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var secondSlideFemale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_female.png" style="width:80%; height:80%;"></div>',
    choices: ['space']
};

var secondSlideMale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_male.png" style="width:100%; height:80%;"></div>',
    choices: ['space']
};
var thirdSlideFemale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_3_stage_2_female.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var thirdSlideMale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_3_stage_2_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var forthSlideFemale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_4_stage_3_female.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var forthSlideMale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_4_stage_3_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var fifthSlideFemale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_5_ending_female.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var fifthSlideMale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_5_ending_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space'],
    on_load:function(){
        var result = sendDataToServer(experimentResult); 
        console.log(result);
    }
    
};


var fifthSlideFemale = function(gender,participantNum) {
    return {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_5_ending_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space'],
    on_load:function(){
        console.log(experimentResult);
        var result = sendDataToServer(experimentResult,gender,participantNum); 
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