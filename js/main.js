
// https://jsfiddle.net/ramnathv/1064q7jm/
// https://www.w3schools.com/w3css/w3css_cards.asp

var currentTask = 0;

jQuery(function() {

    showTask();
});

function showTask(taskNumber) {

    // check if task number exists?

    if(taskNumber == null) taskNumber = currentTask;

    if(jQuery(".task-parent:visible").length == 0) {
        jQuery(jQuery(".task-parent")[taskNumber]).fadeIn(500);
    } else {
        jQuery(".task-parent:visible").fadeOut(500, function() {
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
