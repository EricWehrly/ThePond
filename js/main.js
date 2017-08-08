
// https://jsfiddle.net/ramnathv/1064q7jm/
// https://www.w3schools.com/w3css/w3css_cards.asp
// http://www.unicode.org/emoji/charts/full-emoji-list.html

var LocalUser = {};
var currentTask = 0;

jQuery( window ).resize(function() {

    var picHeight = parseInt(jQuery(".profile-pic").css("height"));
    jQuery(".profile-pic").css("width", (picHeight * 1.25) + "px");
});

jQuery(function() {

    // jQuery(window).trigger('resize');

    showTask();
});

function showTask(taskNumber) {

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

    showTask();
}

function shakeDeny(element, message) {

    // shake the element

    // show a message, in red, at the bottom of the page 
        // (explaining the error)
}

function genderPreference(preference) {

    LocalUser.GenderPreference = preference;

    // jQuery(".task-parent .panel-body:not(." + preference + ")").parent().fadeOut(500, function() {
        var genderArray = shuffle(Profiles.filter(genderPreferenceFilter));
        // buildTaskCompletePrompt();
        buildImageSort(genderArray);
        // buildWordSort(Adjectives.Positive); 
        nextTask();
    // });
}

function genderPreferenceFilter(element) {
    return element.gender == LocalUser.GenderPreference;
}

function sortableDropped(event, ui) {

    var sortContainer = event.target;
    var droppedClass = event.toElement.className;

    if(jQuery(sortContainer).children(":visible").length > 3) {
        jQuery(sortContainer).children(":visible:gt(3)").remove();
    }

    jQuery(sortContainer).children().each(function( index ) {
        if(this.style.display == "none") {

            jQuery(this).fadeIn(500);
            jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, "slow");

            return false;
        }
    });

    if(jQuery(sortContainer).children(":not(:visible)").length == 0) {
        nextTask();
    }
}

function sortableSorted(event, ui) {

    // console.log(event);
    jQuery("html, body").animate({ scrollTop: event.clientY }, "slow");
}

function buildTaskCompletePrompt() {

    var taskElement = buildTaskEncapsulation();

    jQuery('<h3 class="clearfix">You have completed your pending tasks.</h3>')
        .appendTo(taskElement);

    jQuery('<button class="btn btn-primary" onClick="buildWordSort(Adjectives.Positive); nextTask();">' 
                        + 'Please, sir, may I have some more?'
                    + '</button>')
        .appendTo(taskElement);
}

function buildImageSort(items) {

    var imageSort = buildTaskEncapsulation();

    for(var index in items) {
        jQuery('<div class="panel panel-default profile-pic ' 
            + items[index].name + '" style="background-image: url(\'img/' + 
            items[index].name + '.jpg\')"></div>')
            .appendTo(imageSort);
    }

    sortableTask(imageSort);
}

function buildWordSort(items) {

    var wordSort = buildTaskEncapsulation();

    for(var index in items) {
        jQuery('<div class="panel panel-default profile-pic">' + items[index] + '</div>')
            .appendTo(wordSort);
    }

    sortableTask(wordSort);
}

function buildTaskEncapsulation() {

    var taskParent = document.createElement("div");
    taskParent.className = "task-parent";    

    jQuery(".container .vertical-centerer")[0].appendChild(taskParent);

    var rowWrapper = document.createElement("div");
    rowWrapper.className = "row";
    taskParent.appendChild(rowWrapper);

    var sortyBro = document.createElement("div");
    sortyBro.className = "horizontal-center";
    rowWrapper.appendChild(sortyBro);

    return sortyBro;
}

function sortableTask(listParentElement) {

    jQuery(window).trigger('resize');

    jQuery(listParentElement).sortable({
        placeholder: "profile-panel-placeholder",
        stop: sortableDropped,
        change: sortableSorted
    }).disableSelection();

    jQuery(listParentElement).children(".panel:gt(2)").hide();
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
