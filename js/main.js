
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

    jQuery(window).trigger('resize');

    /*
    var ul = document.querySelector('.sortable');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }

    jQuery( ".sortable" ).sortable({
        placeholder: "profile-panel-placeholder",
        stop: sortableDropped
    }).disableSelection();
    */

    // for sorted lists, hide all but the first three
    // jQuery(".sortable .panel:gt(2)").hide();

    showTask();
});

function showTask(taskNumber) {

    // check if task number exists?

    if(taskNumber == null) taskNumber = currentTask;

    if(jQuery(".task-parent:visible").length == 0) {
        jQuery(jQuery(".task-parent")[taskNumber]).fadeIn(500);
    } else {
        jQuery(".task-parent:visible").fadeOut(750, function() {
            jQuery(jQuery(".task-parent")[taskNumber]).fadeIn(500);
        });
    }
}

function nextTask() {

    currentTask++;

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
        buildImageSort(genderArray)
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

function buildImageSort(items) {

    for(var index in items) {
        jQuery('<div class="panel panel-default profile-pic ' 
            + items[index].name + '" style="background-image: url(\'img/' + 
            items[index].name + '.jpg\')"></div>')
            .appendTo("#profile-sort .sortable");
    }
    jQuery(window).trigger('resize');

    jQuery( ".sortable" ).sortable({
        placeholder: "profile-panel-placeholder",
        stop: sortableDropped,
        change: sortableSorted
    }).disableSelection();

    jQuery(".sortable .panel:gt(2)").hide();
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
