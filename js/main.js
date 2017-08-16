
// https://jsfiddle.net/ramnathv/1064q7jm/
// https://www.w3schools.com/w3css/w3css_cards.asp
// http://www.unicode.org/emoji/charts/full-emoji-list.html

var localUser = {};
var currentTask = 0;

var taskList = [
    {
        // gender selection ...
    },
    {
        "method": "buildImageSort",
        "parameters": "",
        "completed": false
    },
    {
        "method": "buildTaskCompletePrompt",
        "parameters": "",
        "completed": false
    },
    {
        "method": "buildWordSort",
        "parameters": "'" + Adjectives.Positive + "'",
        "completed": false
    }
];

jQuery( window ).resize(function() {

    var picHeight = parseInt(jQuery(".profile-pic").css("height"));
    jQuery(".profile-pic").css("width", (picHeight * 1.25) + "px");
});

jQuery(function() {

    // jQuery(window).trigger('resize');

    jQuery(".male").one('click ', function(evt) {
        genderPreference('male');
    });

    jQuery(".female").one('click', function(evt) {
        genderPreference('female');
    });

    showTask();
});

function showTask(taskNumber) {

    // TODO: make very sure that no other tasks are being displayed

    // check if task number exists?

    if(taskNumber == null) taskNumber = currentTask;

    if(jQuery(".task-parent:visible").length == 0) {
        jQuery(jQuery(".task-parent")[taskNumber]).fadeIn(400);
    } else {
        jQuery(".task-parent:visible").fadeOut(500, function() {
            jQuery(jQuery(".task-parent")[taskNumber]).fadeIn(400);
        });
    }
}

function nextTask() {

    currentTask++;

    // TODO: if there are no tasks or whatever,
    // buildTaskCompletePrompt()

    eval(taskList[currentTask].method + "(" + taskList[currentTask].parameters + ")");

    showTask();
}

function shakeDeny(element, message) {

    // shake the element

    // show a message, in red, at the bottom of the page 
        // (explaining the error)
}

function genderPreference(preference) {

    localUser.GenderPreference = preference;

    // jQuery(".task-parent .panel-body:not(." + preference + ")").parent().fadeOut(500, function() {
        var genderArray = shuffle(Profiles.filter(genderPreferenceFilter));
        // buildTaskCompletePrompt();
        buildImageSort(genderArray);
        // buildWordSort(Adjectives.Positive); 
        nextTask();
    // });
}

function genderPreferenceFilter(element) {
    return element.gender == localUser.GenderPreference;
}

//Array.prototype.shuffle = ...
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
