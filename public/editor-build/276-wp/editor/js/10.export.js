"use strict";
exports.id = 10;
exports.ids = [10];
exports.modules = {

/***/ 7605:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vue": () => (/* binding */ vue),
/* harmony export */   "vueLanguage": () => (/* binding */ vueLanguage)
/* harmony export */ });
/* harmony import */ var _codemirror_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5409);
/* harmony import */ var _codemirror_lang_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5490);
/* harmony import */ var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5485);
/* harmony import */ var _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5411);
/* harmony import */ var _lezer_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5410);
/* harmony import */ var _lezer_lr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5484);







// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = /*@__PURE__*/_lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LRParser.deserialize({
  version: 14,
  states: "%pOVOWOOObQPOOOpOSO'#C_OOOO'#Cp'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO'#CiO#RO`O'#CiQOQPOOO#ZO#tO'#CmO#fO!bO'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO'#Cr'#CrO#{O#tO,59XOOQO,59X,59XOOOO'#Cs'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q",
  stateData: "$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~",
  goto: "!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso",
  nodeNames: "⚠ Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity",
  maxTerm: 36,
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "'y~RdXY!aYZ!a]^!apq!ars!rwx!w}!O!|!O!P#t!Q![#y![!]$s!_!`%g!b!c%l!c!}#y#R#S#y#T#j#y#j#k%q#k#o#y%W;'S#y;'S;:j$m<%lO#y~!fSj~XY!aYZ!a]^!apq!a~!wOm~~!|Oo~!b#RX`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|!b#qP;=`<%l!|~#yOl~%W$QXY#t`!b}!O!|!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y%W$pP;=`<%l#y~$zXX~`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|~%lO[~~%qOZ~%W%xXY#t`!b}!O&e!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y!b&jX`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|!b'^XW!b`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|",
  tokenizers: [6, 7, /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LocalTokenGroup("b~RP#q#rU~XP#q#r[~aOT~~", 17, 4), /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LocalTokenGroup("!k~RQvwX#o#p!_~^TU~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOU~~![P;=`<%lm~!bP#o#p!e~!jOk~~", 72, 2), /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LocalTokenGroup("[~RPwxU~ZOp~~", 11, 15), /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LocalTokenGroup("[~RPrsU~ZOn~~", 11, 14), /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LocalTokenGroup("!e~RQvwXwx!_~^Tc~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOc~~![P;=`<%lm~!dOt~~", 66, 35), /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__.LocalTokenGroup("!e~RQrsXvw^~^Or~~cTb~Oprq!]r!^;'Sr;'S;=`!^<%lOr~uUOprq!]r!]!^!X!^;'Sr;'S;=`!^<%lOr~!^Ob~~!aP;=`<%lr~", 66, 33)],
  topRules: {"Content":[0,1],"Attribute":[1,7]},
  tokenPrec: 157
});

const exprParser = /*@__PURE__*/_codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_3__.javascriptLanguage.parser.configure({
    top: "SingleExpression"
});
const baseParser = /*@__PURE__*/parser.configure({
    props: [
        /*@__PURE__*/(0,_lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.styleTags)({
            Text: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.content,
            Is: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.definitionOperator,
            AttributeName: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.attributeName,
            VueAttributeName: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.keyword,
            Identifier: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.variableName,
            "AttributeValue ScriptAttributeValue": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.attributeValue,
            Entity: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.character,
            "{{ }}": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.brace,
            "@ :": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__.tags.punctuation
        })
    ]
});
const exprMixed = { parser: exprParser };
const textParser = /*@__PURE__*/baseParser.configure({
    wrap: /*@__PURE__*/(0,_lezer_common__WEBPACK_IMPORTED_MODULE_1__.parseMixed)((node, input) => node.name == "InterpolationContent" ? exprMixed : null),
});
const attrParser = /*@__PURE__*/baseParser.configure({
    wrap: /*@__PURE__*/(0,_lezer_common__WEBPACK_IMPORTED_MODULE_1__.parseMixed)((node, input) => node.name == "AttributeScript" ? exprMixed : null),
    top: "Attribute"
});
const textMixed = { parser: textParser }, attrMixed = { parser: attrParser };
/**
A language provider for Vue templates.
*/
const vueLanguage = /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_4__.LRLanguage.define({
    name: "vue",
    parser: /*@__PURE__*/_codemirror_lang_html__WEBPACK_IMPORTED_MODULE_5__.htmlLanguage.parser.configure({
        dialect: "selfClosing",
        wrap: /*@__PURE__*/(0,_lezer_common__WEBPACK_IMPORTED_MODULE_1__.parseMixed)(mixVue)
    }),
    languageData: {
        closeBrackets: { brackets: ["{", '"'] }
    }
});
function mixVue(node, input) {
    switch (node.name) {
        case "Attribute":
            return /^(@|:|v-)/.test(input.read(node.from, node.from + 2)) ? attrMixed : null;
        case "Text":
            return textMixed;
    }
    return null;
}
/**
Vue template support.
*/
function vue() {
    return new _codemirror_language__WEBPACK_IMPORTED_MODULE_4__.LanguageSupport(vueLanguage);
}




/***/ })

};
;