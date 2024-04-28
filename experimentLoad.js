// filling the timeline according to gender - important since the instructions are 
// to male or female

// the functions in the following script are in slides.js file , 
// each one creates a trial according to gender and stage1Objects that 
// initiated in the index html file 
// import {pushToDB} from './dbHandler';

function initStage1(gender){
    //initializing the exp, not using timeline vars due to unknown problem
    Stage1Timeline = [];
    for (var i = 0; i < stage1Objects.length; i++) {
        Stage1Timeline.push(firstCond(stage1Objects[i],gender));
    }
    return  {
        timeline: Stage1Timeline,
      };
}
function initStage2(gender){
    Stage2Timeline = [];
    for (var i = 0; i < stage2Objects.self.length; i++) {
      Stage2Timeline.push(
        selfCond(stage2Objects.self[i],gender),
        otherCond(stage2Objects.other[i],gender)
      );
    }
    return {
      timeline: Stage2Timeline,
    };
}
function initStage3(gender){
    var stage3Timeline = []; 
    for (var i = 0; i < stage3Object.length; i++) {
      stage3Timeline.push(stage3SinglePerson(stage3Object[i],gender));
    }
    return   {
      timeline: stage3Timeline,
    };
}

function initTimeline(gender){
    var Stage1Full = initStage1(gender);
    var Stage2Full = initStage2(gender);
    var Stage3Full = initStage3(gender);
    timeline = gender == "male" ?
        [firstSlide,secondSlideMale,Stage1Full,thirdSlideMale,Stage2Full,forthSlideMale,Stage3Full,fifthSlideMale]
       :[firstSlide,secondSlideFemale,Stage1Full,thirdSlideFemale,Stage2Full,forthSlideFemale,Stage3Full,fifthSlideFemale]
  // return timeline;
  return [Stage3Full];
}



