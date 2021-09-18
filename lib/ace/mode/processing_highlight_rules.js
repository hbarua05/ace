define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ProcessingHighlightRules = function() {

    // taken from http://download.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
    // and https://forum.processing.org/one/topic/reserved-keywords-wiki-page.html
    var keywords = (
    "abstract|continue|for|new|switch|" +
    "assert|default|goto|package|synchronized|" +
    "boolean|do|if|private|this|" +
    "break|double|implements|protected|throw|" +
    "byte|else|import|public|throws|" +
    "case|enum|instanceof|return|transient|" +
    "catch|extends|int|short|try|" +
    "char|final|interface|static|void|" +
    "class|finally|long|strictfp|volatile|" +
    "const|float|native|super|while|" +
    "var|"+
    
    "color|hex"
    );

    var buildinConstants = ("null|Infinity|NaN|undefined|ARGS_DENSITY|ARGS_DISPLAY|ARGS_EDITOR_LOCATION|ARGS_EXTERNAL|ARGS_HIDE_STOP|ARGS_LOCATION|ARGS_PRESENT|ARGS_SKETCH_FOLDER|ARGS_STOP_COLOR|ARGS_WINDOW_COLOR|DEFAULT_HEIGHT|DEFAULT_WIDTH|EXTERNAL_MOVE|EXTERNAL_STOP|ADD|ALPHA|ALT|AMBIENT|ARC|ARGB|ARROW|BACKSPACE|BASELINE|BEVEL|BEZIER_VERTEX|BLEND|BLUR|BOTTOM|BOX|BREAK|BURN|CENTER|CHATTER|CHORD|CLAMP|CLOSE|CODED|COMPLAINT|CONTROL|CORNER|CORNERS|CROSS|CURVE_VERTEX|CUSTOM|DARKEST|DEG_TO_RAD|DELETE|DIAMETER|DIFFERENCE|DILATE|DIRECTIONAL|DISABLE_ASYNC_SAVEFRAME|DISABLE_BUFFER_READING|DISABLE_DEPTH_MASK|DISABLE_DEPTH_SORT|DISABLE_DEPTH_TEST|DISABLE_KEY_REPEAT|DISABLE_NATIVE_FONTS|DISABLE_OPENGL_ERRORS|DISABLE_OPTIMIZED_STROKE|DISABLE_STROKE_PERSPECTIVE|DISABLE_STROKE_PURE|DISABLE_TEXTURE_MIPMAPS|DODGE|DOWN|DXF|ELLIPSE|ENABLE_ASYNC_SAVEFRAME|ENABLE_BUFFER_READING|ENABLE_DEPTH_MASK|ENABLE_DEPTH_SORT|ENABLE_DEPTH_TEST|ENABLE_KEY_REPEAT|ENABLE_NATIVE_FONTS|ENABLE_OPENGL_ERRORS|ENABLE_OPTIMIZED_STROKE|ENABLE_STROKE_PERSPECTIVE|ENABLE_STROKE_PURE|ENABLE_TEXTURE_MIPMAPS|ENTER|EPSILON|ERODE|ESC|EXCLUSION|GIF|GRAY|GROUP|HALF_PI|HAND|HARD_LIGHT|HINT_COUNT|HSB|IMAGE|INVERT|JPEG|LANDSCAPE|LEFT|LIGHTEST|LINE|LINE_LOOP|LINE_STRIP|LINES|LINUX|MACOSX|MAX_FLOAT|MAX_INT|MIN_FLOAT|MIN_INT|MITER|MODEL|MODELVIEW|MOVE|MULTIPLY|NORMAL|OPAQUE|OPEN|OPENGL|ORTHOGRAPHIC|OTHER|OVERLAY|PATH|PDF|PERSPECTIVE|PI|PIE|POINT|POINTS|POLYGON|PORTRAIT|POSTERIZE|PROBLEM|PROJECT|PROJECTION|QUAD|QUAD_BEZIER_VERTEX|QUAD_STRIP|QUADRATIC_VERTEX|QUADS|QUARTER_PI|RAD_TO_DEG|RADIUS|RECT|REPEAT|REPLACE|RETURN|RGB|RIGHT|ROUND|SCREEN|SHAPE|SHIFT|SOFT_LIGHT|SPAN|SPHERE|SPOT|SQUARE|SUBTRACT|SVG|TAB|TARGA|TAU|TEXT|THIRD_PI|THRESHOLD|TIFF|TOP|TRIANGLE|TRIANGLE_FAN|TRIANGLE_STRIP|TRIANGLES|TWO_PI|UP|VERTEX|WAIT|WHITESPACE|WINDOWS|AB|AG|AR|BEEN_LIT|DA|DB|DEFAULT_VERTICES|DG|DR|EB|EDGE|EG|ER|HAS_NORMAL|NX|NY|NZ|SA|SB|SG|SHINE|SPB|SPG|SPR|SR|SW|TX|TY|TZ|VERTEX_FIELD_COUNT|VW|VX|VY|VZ|ALPHA_MASK|BLUE_MASK|GREEN_MASK|RED_MASK|GEOMETRY|INSIDE_BEGIN_END_ERROR|NO_SUCH_VERTEX_ERROR|NO_VERTICES_ERROR|PATH|GEOMETRY|NOT_A_SIMPLE_VERTEX|OUTSIDE_BEGIN_END_ERROR|PATH|PER_VERTEX_UNSUPPORTED|PRIMITIVE|MIN_WINDOW_HEIGHT|MIN_WINDOW_WIDTH|CATEGORY|DOUBLE|FLOAT|INT|LONG|STRING|ALT|CTRL|KEY|META|MOUSE|SHIFT|TOUCH|PRESS|RELEASE|TYPE|CLICK|DRAG|ENTER|EXIT|MOVE|PRESS|RELEASE|WHEEL|CAP_BUTT|CAP_ROUND|CAP_SQUARE|JOIN_BEVEL|JOIN_MITER|JOIN_ROUND|SEG_CLOSE|SEG_LINETO|SEG_MOVETO|WIND_EVEN_ODD|WIND_NON_ZERO|FRAMEBUFFER_ERROR|MISSING_FBO_ERROR|MISSING_GLFUNC_ERROR|GL|MISSING_GLSL_ERROR|GLSL|NONPRIMARY_ERROR|PGL|TEXUNIT_ERROR|UNSUPPORTED_GLPROF_ERROR|WIKI|PJOGL|AWT|NEWT|DIRECTION|NORMAL|OFFSET|POSITION|TEXCOORD|MAX_BUFFER_CACHE_SIZE");


    var langClasses = (
        "AbstractMethodError|AssertionError|ClassCircularityError|"+
        "ClassFormatError|Deprecated|EnumConstantNotPresentException|"+
        "ExceptionInInitializerError|IllegalAccessError|"+
        "IllegalThreadStateException|InstantiationError|InternalError|"+
        "NegativeArraySizeException|NoSuchFieldError|Override|Process|"+
        "ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|"+
        "SuppressWarnings|TypeNotPresentException|UnknownError|"+
        "UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|"+
        "InstantiationException|IndexOutOfBoundsException|"+
        "ArrayIndexOutOfBoundsException|CloneNotSupportedException|"+
        "NoSuchFieldException|IllegalArgumentException|NumberFormatException|"+
        "SecurityException|Void|InheritableThreadLocal|IllegalStateException|"+
        "InterruptedException|NoSuchMethodException|IllegalAccessException|"+
        "UnsupportedOperationException|Enum|StrictMath|Package|Compiler|"+
        "Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|"+
        "NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|"+
        "NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|"+
        "Character|Boolean|StackTraceElement|Appendable|StringBuffer|"+
        "Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|"+
        "StackOverflowError|OutOfMemoryError|VirtualMachineError|"+
        "ArrayStoreException|ClassCastException|LinkageError|"+
        "NoClassDefFoundError|ClassNotFoundException|RuntimeException|"+
        "Exception|ThreadDeath|Error|Throwable|System|ClassLoader|"+
        "Cloneable|Class|CharSequence|Comparable|String|Object|"+
        
        "DoubleDict|DoubleList|Event|"+
        "FloatDict|FloatList|FrameBuffer|IntDict|IntList|"+
        "JSONArray|JSONObject|KeyEvent|LinePath|LinePath.PathIterator|"+
        "LineStroker|LongDict|LongList|MouseEvent|PApplet|"+
        "PConstants|PFont|PGL|PGraphics|PGraphics2D|"+
        "PGraphics3D|PGraphicsFX2D|PGraphicsJava2D|PGraphicsOpenGL|PImage|"+
        "PJOGL|PMatrix|PMatrix2D|PMatrix3D|PShader|"+
        "PShape|PShapeJava2D|PShapeOBJ|PShapeOpenGL|PShapeSVG|"+
        "PShapeSVG.Font|PShapeSVG.FontGlyph|PShapeSVG.Gradient|PShapeSVG.LinearGradient|PShapeSVG.LineOfText|"+
        "PShapeSVG.RadialGradient|PShapeSVG.Text|PStyle|PSurface|PSurfaceAWT|"+
        "PSurfaceFX|PSurfaceFX.PApplicationFX|PSurfaceJOGL|PSurfaceNone|PVector|"+
        "Sort|StringDict|StringList|Table|TableRow|"+
        "Texture|Texture.Parameters|ThinkDifferent|TouchEvent|VertexBuffer|"+
        "XML|"+
        
        "delay|draw|exit|loop|noLoop|"+
        "popStyle|pushStyle|redraw|setup|size|"+
        "cursor|focused|frameCount|frameRate|frameRate|"+
        "height|noCursor|online|screen|width|"+
        "Array|ArrayList|HashMap|Object|String|"+
        "XMLElement|binary|str|unbinary|unhex|"+
        "join|match|matchAll|nf|nfc|"+
        "nfp|nfs|split|splitTokens|trim|"+
        "Array Functions|append|arrayCopy|concat|expand|"+
        "reverse|shorten|sort|splice|subset|"+
        "PShape|arc|ellipse|line|point|"+
        "quad|rect|triangle|bezier|bezierDetail|"+
        "bezierPoint|bezierTangent|curve|curveDetail|curvePoint|"+
        "curveTangent|curveTightness|box|sphere|sphereDetail|"+
        "ellipseMode|noSmooth|rectMode|smooth|strokeCap|"+
        "strokeJoin|strokeWeight|beginShape|bezierVertex|curveVertex|"+
        "endShape|texture|textureMode|vertex|loadShape|"+
        "shape|shapeMode|mouseButton|mouseClicked|mouseDragged|"+
        "mouseMoved|mousePressed|mousePressed|mouseReleased|mouseX|"+
        "mouseY|pmouseX|pmouseY|key|keyCode|"+
        "keyPressed|keyPressed|keyReleased|keyTyped|BufferedReader|"+
        "createInput|createReader|loadBytes|loadStrings|open|"+
        "selectFolder|selectInput|link|param|status|"+
        "day|hour|millis|minute|month|"+
        "second|year|print|println|save|"+
        "saveFrame|PrintWriter|beginRaw|beginRecord|createOutput|"+
        "createWriter|endRaw|endRecord|saveBytes|saveStream|"+
        "saveStrings|selectOutput|applyMatrix|popMatrix|printMatrix|"+
        "pushMatrix|resetMatrix|rotate|rotateX|rotateY|"+
        "rotateZ|scale|shearX|shearY|translate|"+
        "ambientLight|directionalLight|lightFalloff|lightSpecular|lights|"+
        "noLights|normal|pointLight|spotLight|beginCamera|"+
        "camera|endCamera|frustum|ortho|perspective|"+
        "printCamera|printProjection|modelX|modelY|modelZ|"+
        "screenX|screenY|screenZ|ambient|emissive|"+
        "shininess|specular|background|colorMode|fill|"+
        "noFill|noStroke|stroke|alpha|blendColor|"+
        "blue|brightness|color|green|hue|"+
        "lerpColor|red|saturation|PImage|createImage|"+
        "image|imageMode|loadImage|noTint|requestImage|"+
        "tint|blend|copy|filter|get|"+
        "loadPixels|pixels[]|set|updatePixels|PGraphics|"+
        "createGraphics|hint|PFont|Loading & Displaying|createFont|"+
        "loadFont|text|textFont|textAlign|textLeading|"+
        "textMode|textSize|textWidth|textAscent|textDescent|"+
        "PVector|abs|ceil|constrain|dist|"+
        "exp|floor|lerp|log|mag|"+
        "map|max|min|norm|pow|"+
        "round|sq|sqrt|acos|asin|"+
        "atan|atan2|cos|degrees|radians|"+
        "sin|tan|noise|noiseDetail|noiseSeed|"+
        "random|randomSeed|transform"


    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "constant.language": buildinConstants,
        "support.function": langClasses
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "constant.numeric", // hex
                regex : /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
            }, {
                token : "constant.numeric", // float
                regex : /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
            }, {
                token : "constant.language.boolean",
                regex : "(?:true|false)\\b"
            }, {
                regex: "(open(?:\\s+))?module(?=\\s*\\w)",
                token: "keyword",
                next: [{
                    regex: "{",
                    token: "paren.lparen",
                    next: [{
                        regex: "}",
                        token: "paren.rparen",
                        next: "start"
                    }, {
                        // From Section 3.9 of http://cr.openjdk.java.net/~mr/jigsaw/spec/java-se-9-jls-diffs.pdf
                        regex: "\\b(requires|transitive|exports|opens|to|uses|provides|with)\\b",
                        token: "keyword" 
                    }]
                }, {
                    token : "text",
                    regex : "\\s+"
                }, {
                    token : "identifier",
                    regex : "\\w+"
                }, {
                    token : "punctuation.operator",
                    regex : "."
                }, {
                    token : "text",
                    regex : "\\s+"
                }, {
                    regex: "", // exit if there is anything else
                    next: "start"
                }]
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token : "lparen",
                regex : "[[({]"
            }, {
                token : "rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ]
    };

    
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(ProcessingHighlightRules, TextHighlightRules);

exports.ProcessingHighlightRules = ProcessingHighlightRules;
});

