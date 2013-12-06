//---------------------------------
// Functions globals, coomon
(function () {
    //---------------------------------
    // Variables globals
    //---------------------------------
    // Variable for validate the name of NameSpace
    this.validateNS = /^[a-zA-Z]?[a-zA-z0-9]+$/;
    // Variables for the all browsers
    this.URL = window.URL || window.webkitURL;
    //---------------------------------
    // Get path of a namespace
    this.fnImport = function (namespace) {
        var parent;
        try {
            var parts = namespace.split('.');
            for (var i = 0; i < parts.length; i++) {
                if (!parent && i == 0) parent = window;
                parent = parent[parts[i]];
            } // end for
            return parent;
        } // end try
        catch (e) {
            console.log(e);
            return null;
        } // end catch
    };
    //---------------------------------

    //---------------------------------
    // Validate the dependences
    this.fnDepenciesTrue = function (dependencies) {
        if (dependencies.constructor === Assembly) if (!dependencies) return false;
        if (dependencies.constructor === Array) for (var i in dependencies) if (!dependencies[i]) return false;
        return true;
    };
    //---------------------------------

    // Struct for the namespace
    this.Assembly = function () {
        this.Author = '';
        this.Created = '';
        this.Description = '';
        this.Title = '';
        // Add new namespace
        this.fnAddNS = function (name) {
            if (!name) return;
            if (!name.match(validateNS)) return;
            // create a property if it doesnt exist
            if (typeof this[name] == 'undefined') this[name] = new Assembly();
            return this[name];
        };
    };
    //---------------------------------
})(window);
//---------------------------------

//---------------------------------
// Namespace Main for library
var company = "j";
var j = new Assembly();
$.extend(j, {
    Author: 'Julian Ruiz', Created: '2013-12-03', Page: 'Coming soon', preBrowsers: ['', '-moz-', '-ms-', '-o-', '-webkit-'], Title: 'Namespace Main'
});
//---------------------------------

//---------------------------------
// Common Tools, Namespace Main
(function () {
    // Private members
    var j = fnImport(company);
    if (!fnDepenciesTrue(j)) return;
    //---------------------------------
    // Color string to hexadecimal color
    function fnStrToHex(str) {
        if (!str) return undefined;
        var hex = (str.indexOf("#") === 0) ? str.substring(1) : str;
        hex = parseInt("0x" + hex, 16);
        return hex;
    };
    //---------------------------------

    //---------------------------------
    // Hexadecimal color to string color
    function fnHexToStr(n) {
        n = n.toString(16);
        if (n.length === 6) return '#' + n;
        return '#000000'.substr(0, 7 - n.length) + n;
    };
    //---------------------------------

    // Public API
    //---------------------------------
    // Find "n" colors gradients between two colors
    this.fnGradientColors = function (fromColor, toColor, steps) {
        fromColor = fnStrToHex(fromColor);
        toColor = fnStrToHex(toColor);
        var colors = [];
        var fadeHex = function (hex, hex2, ratio) {
            var r = hex >> 16;
            var g = hex >> 8 & 0xFF;
            var b = hex & 0xFF;
            r += ((hex2 >> 16) - r) * ratio;
            g += ((hex2 >> 8 & 0xFF) - g) * ratio;
            b += ((hex2 & 0xFF) - b) * ratio;
            return (r << 16 | g << 8 | b);
        };
        for (var i = 0; i <= steps; i++) colors.push(fnHexToStr(fadeHex(fromColor, toColor, i / steps)));
        return colors;
    };
    //---------------------------------

    //---------------------------------
    // Insert an element after the other element
    this.fnInsertAfter = function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    //---------------------------------

    //---------------------------------
    // Find word in text
    // Parameters: Expression Regular, Text
    this.fnFindWord = function (reString, text) {
        var re = new RegExp(reString);
        var result = re.exec(text);
        return result ? result[0] : result;
    };
    //---------------------------------

    //---------------------------------
    // Created a RegularExpression for a number range
    this.fnGetERNumberRange = function (max) {
        var range = "[0-9]{";
        for (var i = 0; i < max; i++) range += (i + 1) + (i + 1 != max ? ',' : '');
        return range += "}";
    };
    //--------------------------------

    //---------------------------------
    // Created text with the prefixed of browsers
    this.fnGetTextPreBrowsers = function (text) {
        var result = '';
        for (var i = 0; i < j.preBrowsers.length; i++) result += (j.preBrowsers[i] + text);
        return result;
    };
    //---------------------------------
}).apply(j.fnAddNS("tools"));
$.extend(j.tools, { Author: 'Julian Ruiz', Created: '2013-12-01', Page: 'Coming soon', Title: 'Common Tools' });
//---------------------------------

//---------------------------------
// Plugin Pipeline
// Depends Tools, Jquery, Namespace Main
(function () {
    // Private properties
    //---------------------------------
    var j = fnImport(company), initTrue, p = this, tools = fnImport(company + '.tools');
    if (!fnDepenciesTrue(['jQuery', company, tools])) return;
    //---------------------------------

    //---------------------------------
    // Move elements to left
    this.fnPipelineLeft = function () {
        var $ul = $(p.classPipeline);
        var classString = tools.fnFindWord("[a]" + p.rangeNumber, $ul.attr("class")) || 'a0';
        var activeItem = parseInt(tools.fnFindWord(p.rangeNumber, classString)) + 1;
        if (p.active) return;
        if (this.fnShowButton(activeItem)) return;
        p.active = true;
        $ul.removeClass(classString);
        $ul.addClass("a" + (activeItem));
        setTimeout(function () { p.active = false }, 500);
    };
    //---------------------------------

    //---------------------------------
    // Move elements to right
    this.fnPipelineRight = function () {
        var $ul = $(p.classPipeline);
        var classString = tools.fnFindWord("[a]" + p.rangeNumber, $ul.attr("class")) || 'a0';
        var activeItem = parseInt(tools.fnFindWord(p.rangeNumber, classString)) - 1;
        if (p.active) return;
        if (this.fnShowButton(activeItem)) return;
        p.active = true;
        $ul.removeClass(classString);
        if (activeItem > 0) $ul.addClass("a" + (activeItem));
        setTimeout(function () { p.active = false }, 500);
    };
    //---------------------------------

    //---------------------------------
    // Show or fade the buttons(Left, Right)
    this.fnShowButton = function (activeItem) {
        if (activeItem == -1) { $(".btnRight").addClass("disable"); return true; }
        else if (activeItem == 0) $(".btnRight").addClass("disable");
        else $(".btnRight").removeClass("disable");
        if (activeItem > p.elementsFade) { $(".btnLeft").addClass("disable"); return true; }
        if (activeItem == p.elementsFade) $(".btnLeft").addClass("disable");
        else $(".btnLeft").removeClass("disable");
        return false;
    };
    //---------------------------------

    // Public API
    //---------------------------------
    // Show or hide the buttons of navigation Pipeline
    this.fnBtnMove = function () {
        var $button = $(this);
        if ($button.hasClass("disable")) return;
        if ($button.hasClass("btnLeft")) p.fnPipelineLeft();
        else if ($button.hasClass("btnRight")) p.fnPipelineRight();
    };
    //---------------------------------

    //---------------------------------
    // Init of plugin Pipeline
    this.fnInit = function (config) {
        //var pipeline = 
        // Set values to config and asing this to p for do small code
        $.extend(p, config);

        // Local variables for the funcionamiento del control
        p.active = false;
        var count = p.list.length;
        var backColors = (p.changeColorsPanel ? tools.fnGradientColors(p.backGradients[0], p.backGradients[1], count) : p.colorsPanel);
        var countFadeElements = 0;
        var elements = (count > p.maxElementsShow ? p.maxElementsShow : count);
        p.elementsFade = (count > p.maxElementsShow ? count - p.maxElementsShow : 0);
        var height = p.firtsHeight;
        var fontColors = (p.changeColorsFont ? tools.fnGradientColors(p.fontGradients[0], p.fontGradients[1], count) : p.colorsFont);
        var maxWidthElements = Math.round(p.width * 34.09 / 100);
        var paddingLeft = Math.round((p.width - maxWidthElements * elements) / 2);
        var perspective = Math.round(height * 151.51 / 100);
        var preBrowser = j.preBrowsers;
        p.rangeNumber = tools.fnGetERNumberRange(count.toString().length);
        var widthElements = Math.round(p.width / elements);
        var leftAnimation = p.elementsFade * widthElements;
        leftAnimation *= leftAnimation <= 0 ? -1 : 1;

        // Styles for the pipeline
        var css = [];
        css.push(p.classContent + "{width:" + p.width + "px}");
        var la = " init-pipeline{0%{left:100%;opacity:0;}100%{left:0;opacity:1;}}"; // left animation
        for (var i = 0; i < j.preBrowsers.length; i++) css.push("@" + j.preBrowsers[i] + "keyframes" + la);
        css.push(p.classPipeline + " {" + (paddingLeft < 0 ? '' : 'padding-left:' + paddingLeft + 'px;') + "width:" + p.width + "px;}");
        var pi = tools.fnGetTextPreBrowsers("transform: translateX(-" + leftAnimation + "px);");
        css.push(p.classPipeline + " li{max-width:" + maxWidthElements + "px;min-width:" + widthElements + "px;" + pi + "}")
        for (var i = 0; i < count; i++) {
            var i2 = i + 1;
            var b = count > 1 && ((i2 + i) == count || (i2) == count);
            var child = " li:nth-child(" + (i2) + ") ";
            if (p.elementsFade > countFadeElements) {
                var tx = tools.fnGetTextPreBrowsers("transform: translateX(-" + (widthElements * (p.elementsFade - i2)) + "px);");
                css.push(p.classPipeline + ".a" + i2 + " li {" + tx + "}");
                countFadeElements++;
            } // end if
            if (i != 0) height -= Math.round(height * 9.09 / 100);
            if (b) p.rotateY -= (p.rotateY * 25 / 100);
            css.push(p.classPipeline + child + ".content span{color:" + fontColors[i] + ";}");
            var tp = tools.fnGetTextPreBrowsers("transform:perspective(" + perspective.toString() + "px)rotate3d(0,1,0," + p.rotateY.toString() + "deg);");
            css.push(p.classPipeline + child + p.classPanel + "{background-color:" + backColors[i] + ";height:" + height + "px;" + ((count == i + 1) ? '' : tp) + (b ? 'width: 100%;' : '') + "}");
        } // end for
        var tp = tools.fnGetTextPreBrowsers("transform:perspective(" + perspective + "px)rotate3d(0,0,0,0);");
        css.push(p.classPipeline + " li:hover .second " + p.classPanel + "{" + tp + "}");
        // Background color for and color font for the button navigate
        css.push(".btnLeft, .btnRight {background-color: " + backColors[0] + "; border: 3px solid " + fontColors[0] + "; color: " + fontColors[0] + "; height:" + p.heightButtons + "px; width:" + p.widthButtons + "px;}");
        // Blob with the content css and created of tag link with src=blob
        var blob = blob || new Blob(css, { type: 'text/css; charset="utf-8"' });
        var csstag = document.createElement("link");
        csstag.setAttribute("href", URL.createObjectURL(blob));
        csstag.setAttribute("rel", 'stylesheet');
        $("head").append(csstag);
        // Events on Pipeline
        if (p.elementsFade == 0 || !p.showButtons) {
            $(".btnLeft").remove();
            $(".btnRight").remove();
        } // end if
        // Animation active init
        if (p.animations) {
            var $ul = $(p.classPipeline);
            $ul.addClass("init");
            p.active = true;
            setTimeout(function () { $(p.classPipeline).removeClass("init"); p.active = false; }, 2000, $ul);
        } // end if
        $(".btnLeft").click(p.fnBtnMove);
        $(".btnRight").click(p.fnBtnMove).addClass("disable");
        $('body').keydown(function (e) {
            if (e.keyCode == 37) p.fnPipelineLeft();
            else if (e.keyCode == 39) p.fnPipelineRight();
        });
    };
    //---------------------------------
}).apply(j.fnAddNS("pipeline"));
$.extend(j.pipeline, { Author: 'Julian Ruiz', Created: '2013-12-01', Page: 'Coming soon', Title: 'Pipeline' });
//---------------------------------

$(document).ready(function () {
    var j = window.j || fnImport(company);
    // Config for pipeline
    var configPipeline = {
        "actionLink": "#",
        "animations": true,
        "backGradients": ["#2d4862", "#00aced"],
        "changeColorsFont": true,
        "changeColorsPanel": true,
        'classPanel': ".panel",
        "classPipeline": ".pipeline",
        "classContent": ".contentPipeline",
        "colorsFont": ["#fff", "#fff", "#fff", "#fff", "#fff", "#444", "#444", "#444"],
        "colorsPanel": ["#01abc4", "#04b7d1", "#04c7e3", "#01d4f3", "#15e1ff", "#bcd8ff", "#ddebff", "#eef5ff"],
        "firtsHeight": 330,
        "fontGradients": ["#ffffff", "#ffffff"],
        "heightButtons": 50,
        "list":
            [
                { "Total": "1,123", "Id": "1", "Name": "Process 01" },
                { "Total": "600", "Id": "2", "Name": "Process 02" },
                { "Total": "510", "Id": "3", "Name": "Process 03" },
                { "Total": "395", "Id": "4", "Name": "Process 04" },
                { "Total": "173", "Id": "5", "Name": "Process 05" },
                { "Total": "132", "Id": "6", "Name": "Process 06" },
                { "Total": "100", "Id": "7", "Name": "Process 07" },
                { "Total": "32", "Id": "8", "Name": "Process 08" }
            ],
        "maxElementsShow": 4,
        "rotateY": 16,
        "showButtons": true,
        "width": 880,
        "widthButtons": 50
    };
    // Creación de HTML
    var template = Hogan.compile($("#templatePipeline").html());
    $("#contentPipeline").html(template.render(configPipeline));
    j.pipeline.fnInit(configPipeline);
});