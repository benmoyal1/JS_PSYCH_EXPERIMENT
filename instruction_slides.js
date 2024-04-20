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
        '<img src="instructions_new/instructions_2_stage_1_female.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var secondSlideMale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_2_stage_1_male.png" style="width:100%; height: auto;"></div>',
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
    choices: ['space']
};


var fifthSlideMale = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_5_ending_male.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

// filling the timeline according to gender - important since the instructions are 
// to male or female
function initTimeline(gender){
    timeline = gender == "male" ? 
  [firstSlide,secondSlideMale,Stage1Full,thirdSlideMale,Stage2Full,forthSlideMale,Stage3Full,fifthSlideMale]
    : [firstSlide,secondSlideFemale,Stage1Full,thirdSlideFemale,Stage2Full,forthSlideFemale,Stage3Full,fifthSlideFemale]
    return timeline 
  }
// this funciton starts the experiment
function startExperiment(gender){
var timeline = initTimeline(gender);
jsPsych.init({
    timeline: timeline,
    preload_images: IMAGES_TO_LOAD,
    on_finish: function() {
    /* TODO handle data inserting to db*/
    var data = jsPsych.data.get().json();
    pushToDB(data);
    }
});}