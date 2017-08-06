
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

    var ul = document.querySelector('.sortable');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }

    jQuery( ".sortable" ).sortable({
        placeholder: "profile-panel-placeholder",
        stop: sortableDropped
    }).disableSelection();

    // for sorted lists, hide all but the first three
    jQuery(".sortable .panel:gt(2)").hide();

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
        nextTask();
    // });
}

function sortableDropped(event, ui) {

    // console.log(event);
    // console.log(ui);
    var sortContainer = event.target;
    var droppedClass = event.toElement.className;

    var children = jQuery(sortContainer).children();
    for(var index in children) {
        var child = children[index];
        console.log(child);
        if(child.style.display == "none") {

            jQuery(child).fadeIn(500);
            break;
        }
    }
}

function buildImageSort(items) {

}
