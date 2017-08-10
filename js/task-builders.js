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

    if(!items) return;

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

    jQuery("html, body").animate({ scrollTop: event.clientY }, "slow");
}
