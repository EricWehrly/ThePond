function buildTaskCompletePrompt() {

    var taskElement = buildTaskEncapsulation();

    jQuery('<h3 class="clearfix">You have completed your pending tasks.</h3>')
        .appendTo(taskElement);

    jQuery('<button class="btn btn-primary" onClick="nextTask();">' 
                        + 'Please, sir, may I have some more?'
                    + '</button>')
        .appendTo(taskElement);
}

function buildImageSort(items) {

    if(!items) return;

    var imageSort = buildTaskEncapsulation();
    
    jQuery('<h4>Grab and drag to sort by attractiveness</h4>')
        .prependTo(jQuery(imageSort).parent().parent());

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
        jQuery('<div class="panel panel-default"><span>' + items[index] + '</span></div>')
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

function buildCommentCard() {

    var taskEncapsulation = buildTaskEncapsulation();
    
    jQuery('<div class="panel panel-default comment-card">' +
        '<div class="panel-heading">How was your date with SexBot9000?</div>' +
        '<div class="panel-body"><form>' + 
            '<div class="form-group">' +
                '<label>What went well?</label>' +
                '<input type="text" class="form-control" id="goodStuff">' +
            '</div>' +
            '<div class="alert alert-warning"><i class="glyphicon glyphicon-warning-sign" aria-hidden="true"></i> ' +
                'Custom entered text will need to be reviewed by our staff and may be discarded if you decide to do the dumb.</div>' +
            '<p></p>' +
            '<div class="form-group">' +
                '<label>What could have gone better?</label>' +
                '<input type="text" class="form-control" id="badStuff">' +
            '</div>' +
            '<div class="alert alert-warning"><i class="glyphicon glyphicon-warning-sign" aria-hidden="true"></i> ' +
                'Custom entered text will need to be reviewed by our staff and may be discarded if you decide to do the dumb.</div>' +
            '<button type="submit" class="btn btn-primary" disabled>Submit</button>' + 
        '</form></div>' +
    '</div>')
        .appendTo(taskEncapsulation);

    jQuery(taskEncapsulation).find(".alert").hide();

    var goodStuff = [];
    for(var category in CommentCard.Good) {
        for(var index in CommentCard.Good[category]) {
            console.log();
            goodStuff.push({
                "label": CommentCard.Good[category][index],
                "category": category
            })
        }
    }
    var badStuff = [];
    for(var category in CommentCard.Bad) {
        for(var index in CommentCard.Bad[category]) {
            console.log();
            badStuff.push({
                "label": CommentCard.Bad[category][index],
                "category": category
            })
        }
    }

    // https://jqueryui.com/autocomplete/#categories
    jQuery("#goodStuff").catcomplete({
        minLength: 0,
        source: goodStuff
    });
    jQuery("#badStuff").catcomplete({
        minLength: 0,
        source: badStuff
    }).click(function(event, ui) { jQuery(this).trigger("focus")});

    jQuery(".ui-autocomplete-input").on("autocompletechange autocompleteselect", function( event, ui ) {
        
        if(ui.item) {            
            jQuery(this).parent().next(".alert").hide();          
        } else {     // TODO: enable 'go' button
            jQuery(this).parent().next(".alert").show();
        }
    }).click(function() {    
        jQuery(this).catcomplete( "search", "" );
    });
}
