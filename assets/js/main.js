"use strict";
$(function () {

    // Default prompt
    var bashPrompt = '[user@hostname ~]$ ';

    // Terminal window
    var terminal = $('#terminal').terminal(function (command, term) {
    }, {
        prompt: bashPrompt,
        greetings: ''
    });

    var $codeStage = $('#stage');
    var $colorSchemeForm = $('input[name=settings-color-scheme]', '#form-color-scheme');

    console.debug('Bash Prompt: ' + bashPrompt);

    // Change color scheme of preview window
    $colorSchemeForm.on('change', function (e) {
        var colorScheme = $(this).val();
        $codeStage.attr('class', colorScheme);
    });

});

/**
 * Generate stylized string.
 *
 * @param string foreground color (hex, short hex or html name of the color)
 * @param string background color (hex, short hex or html name of the color)
 * @param string text Text to be stylized
 * @param string modifiers Optional style modifiers
 *      u - underline
 *      s - strike
 *      o - overline
 *      i - italic
 *      b - bold
 *      g - glow (css text-shadow)
 * @return string Formatted string ready for jQuery Terminal plugin (Style format: [[guib;<COLOR>;<BACKGROUND>]some text])
 */
function stylize(foreground, background, text, modifiers) {
    modifiers = typeof modifiers !== 'undefined' ? modifiers : '';
    var _output = '[[' + modifiers + ';' + foreground + ';' + background + ']' + text + ']';
    return _output;
}