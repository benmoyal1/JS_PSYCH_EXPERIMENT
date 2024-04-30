/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response-modified'] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'html-slider-response-modified',
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The HTML string to be displayed'
            },
            blocks: {
                type: jsPsych.plugins.parameterType.COMPLEX,
                array: true,
                pretty_name: 'Blocks',
                default: undefined,
                nested: {
                    text: {
                        type: jsPsych.plugins.parameterType.HTML_STRING,
                        pretty_name: 'Text',
                        default: undefined,
                        description: 'The HTML string to be displayed Above the slider'
                    },
                    slider: {
                        type: jsPsych.plugins.parameterType.BOOL,
                        pretty_name: 'Slider',
                        default: false,
                        description: 'Will the slider be presented'
                    },
                    require_response: {
                        type: jsPsych.plugins.parameterType.BOOL,
                        pretty_name: 'Require response',
                        default: false,
                        description: 'Require response to move on'
                    },
                    slider_color: {
                        type: jsPsych.plugins.parameterType.STRING,
                        pretty_name: 'Slider color',
                        default: 'black',
                        description: 'What color will the slider have'
                    },
                    slider_locked: {
                        type: jsPsych.plugins.parameterType.BOOL,
                        pretty_name: 'slider lock',
                        default: false,
                        description: 'Will the slider be locked'
                    },
                    start: {
                        type: jsPsych.plugins.parameterType.STRING,
                        pretty_name: 'Slider starting value',
                        default: 0,
                        description: 'Formula to set the starting value of the slider. $i$ represents the user response to block i.',
                    },
                    duration: {
                        type: jsPsych.plugins.parameterType.INT,
                        pretty_name: 'Duration',
                        default: null,
                        description: 'How much time the block will be presented.'
                    },
                    key_press: {
                        type: jsPsych.plugins.parameterType.KEYCODE,
                        default: jsPsych.NO_KEYS,
                        pretty_name: 'Key to end',
                        description: 'Key that will end the block presentation when pressed'
                    }
                }
            },
            min: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Min slider',
                default: 0,
                description: 'Sets the minimum value of the slider.'
            },
            max: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Max slider',
                default: 100,
                description: 'Sets the maximum value of the slider',
            },
            step: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Step',
                default: 1,
                description: 'Sets the step of the slider'
            },
            labels: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name:'Labels',
                default: [],
                array: true,
                description: 'Labels of the slider.',
            },
            slider_width: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name:'Slider width',
                default: null,
                description: 'Width of the slider in pixels.'
            },
            slider_dir: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Slider Direction',
                default: 'ltr',
                description: 'The direction of the slider'
            },
        }
    };

    plugin.trial = function(display_element, trial) {
        /*
        * Since it is impossible to access the slider thumb via DOM, the css of the slider will be changed each time.
        * This function generates it.
        */
        var sliderCSS = function (c) {
            return '' +
                '.slider {' +
                '  -webkit-appearance: none;' +
                '  width: 100%;' +
                '  height: 15px;' +
                '  border-radius: 5px;' +
                '  background: #d3d3d3;' +
                '  outline: none;' +
                '}' +
                '' +
                '.slider:hover {' +
                '  opacity: 1;' +
                '}' +
                '.slider::-webkit-slider-thumb {' +
                '  -webkit-appearance: none;' +
                '  appearance: none;' +
                '  width: 25px;' +
                '  height: 25px;' +
                '  border-radius: 50%;' +
                '  background:'+c+';' +
                '  cursor: pointer;' +
                '}' +
                '' +
                '.slider::-moz-range-thumb {' +
                '  width: 25px;' +
                '  height: 25px;' +
                '  border-radius: 50%;' +
                '  background:'+c+';' +
                '  cursor: pointer;' +
                '}'
        };
        //Add the css
        var html = '<style data="thumb">'+sliderCSS('black')+'</style>';
        //Set the structure
        html += '<div id="jspsych-html-slider-response-wrapper" style="position: absolute; top: 50%; left:50%; height:625px; width:600px; transform: translate(-50%, -50%)">';
        html += '<div id="jspsych-html-slider-response-stimulus" style="position: relative; top:0%;">' + trial.stimulus + '</div>';
        html += '<div id="jspsych-html-slider-response-block" style="position:relative; top: 10px; height: 225px; width: 100%;">';
        html += '<div id="jspsych-html-slider-response-text" style="position: relative; top:0%; width: 100%; height: 70px;"></div>';
        html += '<div id="jspsych-html-slider-response-container" class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; visibility:hidden; ';
        if(trial.slider_width !== null){
            html += 'width:'+trial.slider_width+'px;';
        }
        html += '">';
        html += '<input type="range" value="' + trial.blocks[0].start + '" min="' + trial.min + '" max="' + trial.max + '" step="' + trial.step + '" dir="' + trial.slider_dir + '" style="width: 100%;" id="jspsych-html-slider-response-response" class="slider"></input>';
        html += '<div>'
        for(var j=0; j < trial.labels.length; j++){
            var width = 100/(trial.labels.length-1);
            var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
            html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
            html += '<span style="text-align: center; font-size: 80%;" dir="ltr">'+trial.labels[j]+'</span>';
            html += '</div>'
        };
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ //
        // html += '<div style="font-size: 20px%; height:20px; position: relative;">Selected value<br><span  id="slider-value" dir="ltr"></span></div>';
        html += '<div style="font-size: 20px%; height:20px; position: relative;"><br><span  id="slider-value" dir="ltr"></span></div>';
        
        html += '</div>';
        html += '</div>';
        html += '<div id="additional-messages" style="visibility: hidden;"><div style="position: relative; top:0%; height:20px;" id="press-space">כדי להמשיך יש ללחוץ על מקש הרווח</div>';
        //  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ //
        // html += '<div id="additional-messages" style="visibility: hidden;"><div style="position: relative; top:0%; height:25px;" id="press-space">Press the spacebar to continue</div>';
        html += '<div style="position: relative; top:0%; height:25px;" id="error-msg"></div></div>';
        html += '</div>';
        html += '</div>';


        display_element.innerHTML = html;


        display_element.querySelector('#jspsych-html-slider-response-response').addEventListener('input', function (e) {
            display_element.querySelector('#slider-value').innerHTML = e.target.value;
            responded = true;
        });
        //Set the variables needed for running the blocks and saving information.
        var responded;
        var keyboardListener;
        var response = [];
        var lastTime = performance.now();
        function nextBlock(i, info) {
            if (i>0) { //Will not be executed on the first block
                response.push({
                    rt: performance.now()-lastTime,
                    slider: display_element.querySelector('#jspsych-html-slider-response-response').value
                })
            }
            if (i==trial.blocks.length) { //If we've been through all the blocks
                end_trial();
                return;
            }
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            if (trial.blocks[i].duration != null) { //Set duration if needed
                setTimeout(function () {nextBlock(i+1)}, trial.blocks[i].duration);
            }
            if (trial.blocks[i].key_press!=jsPsych.NO_KEYS) { //Set key to end block if needed
                responded = !trial.blocks[i].require_response;
                function check_if_responded(i) {
                    if (responded) {nextBlock(i); return;}
                    display_element.querySelector('#error-msg').innerHTML = 'You must move the slider to continue';
                    display_element.querySelector('#error-msg').style.color = 'red';
                    setTimeout(function () {
                        display_element.querySelector('#error-msg').style.color = 'black'
                    }, 10);
                }
                keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                    callback_function: function (info) {check_if_responded(i+1)},
                    valid_responses: [trial.blocks[i].key_press],
                    rt_method: 'performance',
                    persist: true,
                    allow_held_key: false
                });
            } else if (typeof keyboardListener !== "undefined") { //Kill previous keyboard-listener if exists
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }
            if (trial.blocks[i].slider) { //If the slider is visible
                //calc starting value
                var startFormula = (trial.blocks[i].start+'').replace(/\$\d+\$/, function (match) {
                    var num = parseInt(match.slice(1,-1));
                    return '('+response[num].slider+')';
                });
                startFormula = eval(startFormula);
                //Set the elements
                display_element.querySelector('#jspsych-html-slider-response-container').style.visibility = 'visible';
                display_element.querySelector('#additional-messages').style.visibility = 'visible';
                display_element.querySelector('#jspsych-html-slider-response-response').value = startFormula;
                display_element.querySelector('#error-msg').innerHTML = '';
                display_element.querySelector('#slider-value').innerHTML = display_element.querySelector('#jspsych-html-slider-response-response').value;
                display_element.querySelector('[data="thumb"]').innerHTML = sliderCSS(trial.blocks[i].slider_color);
                display_element.querySelector('#jspsych-html-slider-response-response').disabled = trial.blocks[i].locked;
            }
            else { //Hide the slider if needed
                display_element.querySelector('#jspsych-html-slider-response-container').style.visibility = 'hidden';
                display_element.querySelector('#additional-messages').style.visibility = 'hidden';

            } //Show text
            display_element.querySelector('#jspsych-html-slider-response-text').innerHTML = trial.blocks[i].text;
            lastTime = performance.now();
        }

        function end_trial(){ //end the trial
            if (typeof keyboardListener !== 'undefined') { //kill listener
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }
            jsPsych.pluginAPI.clearAllTimeouts(); //clear timeouts

            // save data
            var trialdata = {
                "response": response,
                "stimulus": trial.stimulus
            };
            //clean display element
            display_element.innerHTML = '';

            // next trial
            jsPsych.finishTrial(trialdata);
        }
        //Initiate
        nextBlock(0);
    };

    return plugin;
})();
