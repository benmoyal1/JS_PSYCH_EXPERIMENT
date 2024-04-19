// Instruction slides

var firstSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div style="background-color: black; display: flex; justify-content: center; align-items: center; height: 100vh;">' +
        '<img src="instructions_new/instructions_1_opening_page.png" style="width:100%; height: auto;"></div>',
    choices: ['space']
};

var secondSlide_female = {
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



// var thirdSlide1 = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">Sometimes, we will ask you to rate your own reaction to the image. In these cases, you will see a picture, and the rating scale will appear below it. You will then move the mouse and click to indicate how you feel in response to the image. It will look like this: <br><img style="width:500px;" src="instruction_images/slidepic1.png"><br><p>Press the spacebar to continue</p></div>',
//     choices: ['space']
// }

// var thirdSlide2 = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">After you indicate your response, the next slide will show you how you have responded in red. You will not need to respond again, just press the spacebar to continue. It will look like this: <br><img style="width:500px;" src="instruction_images/slidepic2.png"><br><p>Press the space bar to continue</p></div>',
//     choices: ['space']
// }

// var fourthSlide = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">In addition to asking you to rate your own reactions to some images, we will also ask you to guess the emotional responses of previous participants to some images. In these cases, you will see the name of an actual previous participant, and need to guess the emotional response of that participant to the image, by guessing their rating on the scale. It will look like this:<br> <img style="width:500px;" src="instruction_images/slidepic3.png"><br><p>Press the spacebar to continue</p></div>',
//     choices: ['space']
// }



// var fifthSlide1 = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">After you guess how the previous participant responded to the image, in the next screen we will show you the actual response of that previous participant to the image in red. It will look like this: <br><img style="width:500px;" src="instruction_images/slidepic4.png"><br>Press the spacebar to continue</div>',
//     choices: ['space']
// }


// var fifthSlide = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">To indicate the emotional response of a previous participant to a picture, you will also use the same scale that ranges from -100 to 100. A rating of 100 means you assume that the image made the participant feel very good. A rating of - 100 means you assume that the image made the participant feel very bad.A rating of 0 means you assume that the image did not make the participant feel good or bad. Please use the mouse to move the cursor to the place on the scale that best matches the response of the previous participant.' +
//         '<p>Press the spacebar to continue.</p></div>',
//     choices: ['space']
// }

// var sixthSlide = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">Now, you will complete a brief training phase. <p>You will be presented with different pictures and rate how you feel in response to each picture.</p>' +
//         ' <p>After the rating, you will see on the screen the rating you gave in response to the picture.</p><br>' +
//         '<p>Press the spacebar to begin.</p></div>',
//     choices: ['space']
// }

// var seventhSlide = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">The training is over. Now the main task will begin. During the task, you will be presented with multiple pictures. In some cases, ' +
//         'you will rate how you feel in response to a picture, and then your emotional reaction will be presented on a separate screen. ' +
//         'In other cases, you will guess the emotional response of a previous participant to a picture, and then that participant\'s <b><u>actual</u></b> emotional response will be presented on a separate screen. <br>' +
//         '<p>Press the spacebar to begin the task.</p></div>',
//     choices: ['space']
// }



// var seventhSlide1 = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">Here’s a brief example of a few trials.<p>Press the spacebar to begin the task.</p></div>',
//     choices: ['space']
// }

// var seventhSlide2 = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">When you are ready to begin the main task. Press the spacebar.</div>',
//     choices: ['space']
// }


// var eightSlide = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">Now, we will continue to the next part of the task.<br>' +
//         'In this part, we will show you responses of previous participants. You will see five responses of the same participants, in sequence. After viewing the participant\'s responses, we will ask you to evaluate that participant on several dimensions.<br>' +
//         'The participants\' responses will appear briefly and then disappear. Therefore, you need to pay attention to their responses in order so that you can evaluate the person who made these responses.<br>' +
//         'We are interested in your intuitive judgments. There are no correct or incorrect judgement. Try to make your evaluations quickly based on your gut feeling.<br>' +
//         '<p>Press the spacebar to begin.</p></div>',
//     choices: ['space']
// }

// var ninethSlide = {
//     type: 'html-keyboard-response',
//     stimulus: '<div dir="ltr">The task is over. Please press the spacebar to continue.</div>',
//     choices: ['space']
// }
