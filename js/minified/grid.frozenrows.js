!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base"],r):r(jQuery)}(function(v){"use strict";v.jgrid.extend({setupFrozenRows:function(r){var u=v.extend({first:0,last:0,saveFirstLastId:!1,classes:""},r||{});return this.each(function(){if(!(!0===this.p.subGrid||!0===this.p.treeGrid||!0===this.p.cellEdit||this.p.scroll||!0===this.p.frozenColumns||!0===this.p.frozenRows||!0===this.p.grouping||u.first<=0&&u.last<=0&&0===u.rowids.length)){var r,s=this,i="border-box"===v("#gbox_"+v.jgrid.jqID(s.p.id)).css("box-sizing")?0:1,o="#"+v.jgrid.jqID(s.p.id),e="#gview_"+v.jgrid.jqID(s.p.id),t=v(".ui-jqgrid-htable",e).height(),n=v(e).width(),d=[],t=v('<div style="position:absolute;left:0px;top:'+(t+i)+'px;height:0px;overflow-x:hidden;" class="frozen-rdiv ui-jqgrid-rdiv"></div>');if(v(e).append(t),v(".frozen-rdiv",e).css("width",n-(v.jgrid.scrollbarWidth()+2)),d.push(v(".jqgfirstrow",o).clone(!0)),u.rowids&&0<u.rowids.length){for(r=0;r<u.rowids.length;r++)for(h=s.rows.length;h--;)if(s.rows[h].id===u.rowids[r]){d.push(v(s.rows[h]).clone(!0)),v(s.rows[h]).insertBefore(s.rows[r+1]);break}}else if(0<u.first)for(r=0;r<u.first;r++)d.push(v(s.rows[r+1]).clone(!0)),u.saveFirstLastId&&(u.rowids||(u.rowids=[]),u.rowids.push(s.rows[r+1].id));else{if(!(0<u.last))return;for(h=s.rows.length,r=0;r<u.last;r++)d.splice(1,0,v(s.rows[h-1]).clone(!0)),u.saveFirstLastId&&(u.rowids||(u.rowids=[]),u.rowids.unshift(s.rows[h-1].id)),v(s.rows[h-1]).insertBefore(s.rows[1])}t.css("height","auto");var f=v(o).clone(!0);f.children("tbody").empty();for(var h=0,l=d.length;h<l;h++)d[h].addClass(u.classes).appendTo(f);f.appendTo(t);var w=s.p.id+"_fr",i=(v(o,t).attr("id",w),w="#"+v.jgrid.jqID(w),v.jgrid.getMethod("getStyleUI")),n=s.p.styleUI+".common",a=i(n,"highlight",!0),c=i(n,"hover",!0);if(v(".frozen-rdiv",e).on("click","tr",function(){var r=v(this).index();v(this).addClass(a).siblings().removeClass(a),v(".frozen-rdiv tr").eq(r).addClass(a).siblings().removeClass(a)}),v(w).on("click",function(){v(".frozen-rdiv tbody").children("tr").each(function(){v(this).removeClass(a)})}),v(e+" .ui-jqgrid-bdiv").first().on("scroll",function(){var r=this.scrollLeft;v(".frozen-rdiv").scrollLeft(r)}),v(".frozen-rdiv tr").hover(function(){var r=v(this).index();v(".frozen-rdiv tr").eq(r).addClass(c)},function(){var r=v(this).index();v(".frozen-rdiv tr").eq(r).removeClass(c)}),s.p.rownumbers){var p=!1;try{if(v(s.rows[0].cells).each(function(r){if(v(this).hasClass("jqgrid-rownumber"))return p=r,!1}),!1!==p){for(h=s.rows.length,r=1;r<h;)v(s.rows[r].cells[p]).html(r),r++;for(h=v(w)[0].rows.length,r=1;r<h;)v(w)[0].rows[r].cells[p].innerHTML=r,r++}}catch(r){}}s.grid.frbDiv=t,s.p.frozenRows=!0,s.p.frozenRowsPrm=u}})},destroyFrozenRows:function(r){return this.each(function(){this.grid.frbDiv.remove(),this.p.frozenRows=!1,r&&(this.p.frozenRowsPrm=null)})},setFrozenRows:function(r){return this.each(function(){0<this.p.records&&v(this).jqGrid("setupFrozenRows",r),v(this).on("jqGridAfterGridComplete.setFrozenRows",function(){this.p.frozenRowsPrm&&!v.isEmptyObject(this.p.frozenRowsPrm)?(v(this).jqGrid("destroyFrozenRows"),v(this).jqGrid("setupFrozenRows",this.p.frozenRowsPrm)):v(this).jqGrid("setupFrozenRows",r)}),v(this).on("jqGridResizeStop.setFrozenRows",function(){if(this.p.frozenRowsPrm)try{v(this).jqGrid("destroyFrozenRows");var r=0<this.p.frozenRowsPrm.last&&!this.p.frozenRowsPrm.saveFirstLastId&&0===this.p.frozenRowsPrm.first;r&&(this.p.frozenRowsPrm.first=this.p.frozenRowsPrm.last),v(this).jqGrid("setupFrozenRows",this.p.frozenRowsPrm),r&&(this.p.frozenRowsPrm.first=0)}catch(r){}})})}})});