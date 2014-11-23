"use strict";
$(function () {

    // Cache selectors
    var $codeStage = $('#stage');
    var $colorSchemeForm = $('input[name=settings-color-scheme]', '#form-color-scheme');
    var ps1StringHtml = document.getElementById('ps1-string').innerHTML = document.getElementById('ps1-string').innerHTML.replace(/(\r\n|\n|\r)/gm,"");
    console.log(ps1StringHtml);
    //var showTimestamp = $('input[name=option-show-timestamp]', '#form-prompt-config');

    // Change color scheme of preview window
    $colorSchemeForm.on('change', function (e) {
        var colorScheme = $(this).val();
        $codeStage.attr('class', colorScheme);
    });

    // Strip line breaks from preview panel (makes it easier to develop if we don't have to worry about fitting everything on a single line
    console.log(ps1StringHtml);

    // Handle changes to prompt config

});