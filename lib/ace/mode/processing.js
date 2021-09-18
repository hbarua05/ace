define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var JavaScriptMode = require("./javascript").Mode;
var ProcessingHighlightRules = require("./processing_highlight_rules").ProcessingHighlightRules;
var JavaFoldMode = require("./folding/java").FoldMode;

var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = ProcessingHighlightRules;
    this.foldingRules = new JavaFoldMode();
};
oop.inherits(Mode, JavaScriptMode);

(function() {
    
    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/processing";
}).call(Mode.prototype);

exports.Mode = Mode;
});
