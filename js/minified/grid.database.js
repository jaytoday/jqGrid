!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base"],e):e(jQuery)}(function(l){"use strict";l.jgrid.extend({dbInit:function(e){return this.each(function(){"indexeddb"===e&&l(this).jqGrid("_initIndexedDB_")})},_initIndexedDB_:function(){this.each(function(){var s=this;indexedDB.databases().then(function(e){var o=indexedDB.open(s.p.dbconfig.dbname,s.p.dbconfig.dbversion);o.onupgradeneeded=e=>{console.info("Database created: "+s.p.dbconfig.dbname)},o.onsuccess=function(e){var e=e.target.result,o=parseInt(e.version),c=l.jgrid.getElemByAttrVal(s.p.colModel,"key",!0);async function n(i){"string"==typeof s.p.dbconfig.dataUrl?d=await(await fetch(s.p.dbconfig.dataUrl)).json():Array.isArray(s.p.dbconfig.dataUrl)&&(d=s.p.dbconfig.dataUrl),s.p.dbconfig.dbversion=o+1;var d,e=indexedDB.open(s.p.dbconfig.dbname,s.p.dbconfig.dbversion);e.onupgradeneeded=function(e){var o=e.target.result;if(!i){var n=o.createObjectStore(s.p.dbconfig.dbtable,{keyPath:c.name});for(let e=0;e<s.p.colModel.length;e++){var r=s.p.colModel[e];r.name===c.name?n.createIndex(r.name,r.name,{unique:!0}):n.createIndex(r.name,r.name,{unique:!1})}}var t,a=e.target.transaction.objectStore(s.p.dbconfig.dbtable);a.transaction.oncomplete=function(e){s.p.dbconfig.loadIfExists=!1},a.transaction.onerror=function(e){l.jgrid.info_dialog("Error",e.target.error.name+" : "+e.target.error.message,"Close")};for(t of d)s.p.dbconfig.isKeyInData||(t[c.name]=Math.random().toString(16).slice(2)),a.add(t);s.p.dbconfig.ready_req=!0,s.grid.populate()},e.onerror=e=>{l.jgrid.info_dialog("Error",e.target.error.name+" : "+e.target.error.message,"Close")}}l.isEmptyObject(c)?l.jgrid.info_dialog("Warning","Missed key: No uniquie key is set in colModel. Creating table fail","Close"):e.objectStoreNames.contains(s.p.dbconfig.dbtable)?s.p.dbconfig.loadIfExists?(e.close(),n(!0)):(e.close(),s.p.dbconfig.ready_req=!0,s.grid.populate()):(e.close(),n(!1))},o.onerror=e=>{l.jgrid.info_dialog("Error",e.target.error.name+" : "+e.target.error.message,"Close")}})})},updateStorageRecord:async function(d,c){let e=this[0],s=e.p.dbconfig,n=e.p.datatype;return new Promise(function(o,a){if(Array.isArray(d)||(d=[d]),c=c||e.p.keyName,d=l.jgrid.normalizeDbData.call(e,d,e.p.colModel),"indexeddb"===n){const i=window.indexedDB.open(s.dbname,s.dbversion);i.onsuccess=e=>{var n=i.result.transaction(s.dbtable,"readwrite"),r=(n.oncomplete=e=>{o(e),console.log("Transaction completed succefully")},n.onerror=e=>{a(e),console.log(e.target.error)},n.objectStore(s.dbtable));for(let o=0;o<d.length;o++){if(!d[o].hasOwnProperty(c)||""===d[o][c]){n.abort();break}var t=r.openCursor();t.onsuccess=e=>{e=e.target.result;e&&(e.value[c]===d[o][c]?e.update(d[o]):e.continue())},t.onerror=e=>{console.log(e.target.error)}}}}})},addStorageRecord:async function(i,d){let e=this[0],c=e.p.dbconfig,o=e.p.datatype;return new Promise(function(r,t){if(Array.isArray(i)||(i=[i]),d=d||e.p.keyName,i=l.jgrid.normalizeDbData.call(e,i,e.p.colModel),"indexeddb"===o){const a=window.indexedDB.open(c.dbname,c.dbversion);a.onsuccess=e=>{var o=a.result.transaction(c.dbtable,"readwrite"),n=(o.oncomplete=e=>{r(e),console.log("Transaction completed succefully")},o.onerror=e=>{t(e),console.log(e.target.error)},o.objectStore(c.dbtable));for(let e=0;e<i.length;e++)i[e].hasOwnProperty(d)&&""!==i[e][d]||(i[e][d]=Math.random().toString(16).slice(2)),n.add(i[e]).onsuccess=e=>{}}}})},deleteStorageRecord:async function(i,e){let o=this[0],d=o.p.dbconfig,n=o.p.datatype;return new Promise(function(r,t){if(Array.isArray(i)||(i=[i]),e=e||o.p.keyName,"indexeddb"===n){const a=window.indexedDB.open(d.dbname,d.dbversion);a.onsuccess=e=>{var o=a.result.transaction(d.dbtable,"readwrite"),n=(o.oncomplete=e=>{r(e),console.log("Transaction completed succefully")},o.onerror=e=>{t(e),console.log(e.target.error)},o.objectStore(d.dbtable));for(let e=0;e<i.length;e++)n.delete(i[e]).oncomplete=e=>{}}}})}})});