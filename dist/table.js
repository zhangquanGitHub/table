!function(t,a){"function"==typeof define&&define.amd?define(["$","handlebars","paging","query","dialog"],a):t.Table=a($,Handlebars,Paging,Query,Dialog)}(this,function(t,a,e,i,r){function n(a,e,i,r,n,s,o){this.search=n,this.table=a,this.page=i,this.filterCon=o,this.temp=e,this.template=null,this.pageData=null,this.ajaxurl=a.attr("ajaxurl"),this.ajaxDeleteItemUrl=a.attr("data-ajax-deleteitem-url"),this.currentPage=1,this._total=0,this.pageSize=i.attr("pagesize")||10,this.callback=s,this.param=t.extend(r,{})}return a.registerHelper("equalsten",function(t,a){return t%10==0&&0!=t?a.fn(this):a.inverse(this)}),a.registerHelper("equals",function(t,a,e){return t==a?e.fn(this):e.inverse(this)}),a.registerHelper("formatMoney",function(a){var e=a.split("-");return e.length>1?formatAmount.doFormat(t.trim(e[0]))+" - "+formatAmount.doFormat(t.trim(e[1])):formatAmount.doFormat(t.trim(e[0]))}),n.prototype={init:function(t){var e=this.temp.html();this.template=a.compile(e),this.settings=t||{type:"get"},this.search&&(this.param=this.getParam(this.search.closest(".form")),this.bindSearch()),this.bind(),this.event()},event:function(){var a=this;t(this.table).bind("reload",function(){a.gosearch()}),this.table.delegate("tr","click",function(){t(this).attr("href")&&!t(this).hasClass("dialog")&&(location.href=t(this).attr("href"))}),this.table.delegate(".js-ajax","click",function(){if(t(this).attr("href")){var e=t(this).attr("href"),i=t(this).attr("js-ajax-param")||{};t.post(e,i).done(function(e){e.status?a.gosearch():t.alert(e.msg)})}return!1}),t(this.table).on("click",".js-delete",function(e){var i=t(this).attr("href"),r=t(this).attr("js-ajax-param")||{};return t.confirm("是否确认删除？",[{yes:"确定"},{no:"取消"}],function(n){var s=this;if("yes"==n){var o={url:i,type:"POST",data:r,async:!1,dataType:"json"};t.when(t.ajax(o)).done(function(){t(e.target).closest("tr").remove(),s.hide(),setTimeout(function(){a.gosearch()},500)}).fail(function(){})}else s.hide()}),!1})},bindSearch:function(){var t=this;this.search.click(function(){t.gosearch()})},gosearch:function(){var a=this;a.currentPage=1,a.search&&(a.param=t.extend(a.param,a.getParam(a.search.closest(".form")))),a.param=t.extend(a.param,a.getParam(t(a.filterCon))),a.bind()},getParam:function(t){return i.getForm(t)},bind:function(){var a=this;if(this.param=t.extend(this.param,{page:this.currentPage,page_size:this.pageSize}),a.table.css("position","relative"),0==a.table.find(".loadingdata").size()){var e=a.table.height()/2-32;e=0>e?32:e,e=30;var i=a.table.width()/2-32;a.table.find("tbody,.tbody").html(""),a.page.hide(),a.table.append('<div class="loadingdata" style="position:absolute;left:'+i+"px;top:"+e+'px;"/>')}a.ajaxData(a.ajaxurl,a.param).done(function(e){if(a.page.show(),a.loading&&a.loading.remove(),t(".loadingdata").remove(),!e.hasError){var i=e.data,r=a.template(i);a.table.html(r),e.data&&(a._total=e.data.count.total||0),a.initPager(),a.callback?a.callback(a,a.table):null}})},initPager:function(){var t=this,a=t.page;a.data("pagesize")?t.pageSize=a.data("pagesize"):a.data("pagesize",t.pageSize),a.attr("pagesize",t.pageSize),0==t._total?(t.table.html('<p class="pdl10 nodata">没有符合条件的数据!</p>'),a.hide()):a.show(),this.pageData=null,this.page.html(""),this.pageData=new e,this.pageData.init({target:this.page,pagesize:t.pageSize,current:t.currentPage,count:t._total,callback:function(a){t.currentPage=a,t.bind()}})},ajaxData:function(a,e){e=t.extend({},e);var i=t.ajax({type:this.settings.type,url:a,data:e,dataType:"json"});return i}},n});