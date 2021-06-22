!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(a){"use strict";a.extend(a.jgrid,{isJSON:function(e){"string"!=typeof e&&(e=JSON.stringify(e));try{return JSON.parse(e),!0}catch(e){return!1}},stringify:function(e){return JSON.stringify(e,function(e,n){return"function"==typeof n?n.toString():n})},parseFunc:function(e){return JSON.parse(e,function(e,n){if("string"!=typeof n||-1===n.indexOf("function"))return n;var t=n.split(" ");return t[0]=a.jgrid.trim(t[0].toLowerCase()),0===t[0].indexOf("function")&&"}"===n.trim().slice(-1)?a.jgrid.runCode(n):n})},encode:function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},jsonToXML:function(e,n){function d(e,n){return"#text"===e?f.encode?l.encode(n):n:"function"==typeof n?"<"+e+"><![CDATA["+n+"]]></"+e+">\n":""===n?"<"+e+">__EMPTY_STRING_</"+e+">\n":"<"+e+">"+(f.encode?l.encode(n):n)+"</"+e+">\n"}var f=a.extend({xmlDecl:'<?xml version="1.0" encoding="UTF-8" ?>\n',attr_prefix:"-",encode:!0},n||{}),l=this,u=function(e,n){for(var t=[],r=0;r<n.length;r++){var o=n[r];void 0===o||null==o?t[t.length]="<"+e+" />":"object"==typeof o&&o.constructor==Array?t[t.length]=u(e,o):t[t.length]=("object"==typeof o?s:d)(e,o)}return t.length||(t[0]="<"+e+">__EMPTY_ARRAY_</"+e+">\n"),t.join("")},s=function(e,n){var t,r,o=[],i=[];for(t in n)n.hasOwnProperty(t)&&(r=n[t],t.charAt(0)!==f.attr_prefix?null==r?o[o.length]="<"+t+" />":"object"==typeof r&&r.constructor===Array?o[o.length]=u(t,r):o[o.length]=("object"==typeof r?s:d)(t,r):i[i.length]=" "+t.substring(1)+'="'+(f.encode?l.encode(r):r)+'"');var c=i.join(""),a=o.join("");return null==e||(a=0<o.length?a.match(/\n/)?"<"+e+c+">\n"+a+"</"+e+">\n":"<"+e+c+">"+a+"</"+e+">\n":"<"+e+c+" />\n"),a},e=s(null,e);return f.xmlDecl+e},xmlToJSON:function(e,n){var d=a.extend({force_array:[],attr_prefix:"-"},n||{});if(e){var o={};if(d.force_array)for(var t=0;t<d.force_array.length;t++)o[d.force_array[t]]=1;"string"==typeof e&&(e=a.parseXML(e)),e.documentElement&&(e=e.documentElement);var f=function(e,n,t,r){if("string"==typeof r)if(-1!==r.indexOf("function"))r=a.jgrid.runCode(r);else switch(r){case"__EMPTY_ARRAY_":r=[];break;case"__EMPTY_STRING_":r="";break;case"false":r=!1;break;case"true":r=!0}o[n]?(1===t&&(e[n]=[]),e[n][e[n].length]=r):1===t?e[n]=r:2===t?e[n]=[e[n],r]:e[n][e[n].length]=r},l=function(e){if(7!==e.nodeType){if(3===e.nodeType||4===e.nodeType)return null==e.nodeValue.match(/[^\x00-\x20]/)?void 0:e.nodeValue;var n,t,r,o={};if(e.attributes&&e.attributes.length)for(n={},c=0;c<e.attributes.length;c++)"string"==typeof(t=e.attributes[c].nodeName)&&(r=e.attributes[c].nodeValue)&&(void 0===o[t=d.attr_prefix+t]&&(o[t]=0),o[t]++,f(n,t,o[t],r));if(e.childNodes&&e.childNodes.length){for(var i=n?!1:!0,c=0;c<e.childNodes.length&&i;c++){var a=e.childNodes[c].nodeType;3!==a&&4!==a&&(i=!1)}if(i)for(n=n||"",c=0;c<e.childNodes.length;c++)n+=e.childNodes[c].nodeValue;else for(n=n||{},c=0;c<e.childNodes.length;c++)"string"==typeof(t=e.childNodes[c].nodeName)&&(r=l(e.childNodes[c]))&&(void 0===o[t]&&(o[t]=0),o[t]++,f(n,t,o[t],r))}return n}},r=l(e);return o[e.nodeName]&&(r=[r]),11!==e.nodeType&&((n={})[e.nodeName]=r,r=n),r}},saveAs:function(e,n,t){t=a.extend(!0,{type:"plain/text;charset=utf-8"},t||{});var r,o,i,c=[];n=null==n||""===n?"jqGridFile.txt":n,Array.isArray(e)?c=e:c[0]=e;try{r=new File(c,n,t)}catch(e){r=new Blob(c,t)}window.navigator&&window.navigator.msSaveOrOpenBlob?window.navigator.msSaveOrOpenBlob(r,n):(o=URL.createObjectURL(r),(i=document.createElement("a")).href=o,i.download=n,document.body.appendChild(i),i.click(),setTimeout(function(){document.body.removeChild(i),window.URL.revokeObjectURL(o)},0))}})});