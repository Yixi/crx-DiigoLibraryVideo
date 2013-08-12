/*content js*/

var Util={};
Util={
	config: {
        logLevel: "never",
        logLevels: ['debug', 'info', 'error']
    },

    /*Debug module */
    log: function (params, level) {
        var z = this;
        if (z.config.logLevel == "never") return;
        var i = z.config.logLevels.indexOf(level);
        var j = z.config.logLevels.indexOf(z.config.logLevel);
        if (i > -1 && j > -1 && i >= j) {
            console.log.apply(console, params);
        }
    },
    debug: function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[DiigoLibraryVedio Debug]:');
        this.log(args, 'debug');
    },
    info: function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[DiigoLibraryVedio Info]:');
        this.log(args, 'info');
    },
    error: function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[DiigoLibraryVedio Error!!!]:');
        this.log(args, 'error');
    }
};

Util.info("Extension work...");

var D_V={};

D_V={


	init:function(){
		var BookmarkTitlesLink = $('.ditemItem .ditemTitle .bookmarkTitle a');
		Util.debug(BookmarkTitlesLink,BookmarkTitlesLink.length);
		this.AnalyticLink(BookmarkTitlesLink);
	},

	AnalyticLink:function(LinkArray){
		var array = LinkArray;
		for(var i=0,len=LinkArray.length;i<len;i++){
			var link = array[i].href;
			Util.debug(link);
			if(link.indexOf("youku.com")>=0){
				this.Youku(array[i],link);
			}else if(link.indexOf("youtube.com")>=0){
				this.YouTube(array[i],link);
			}else if(link.indexOf("tudou.com")>=0){
                this.Tudou(array[i],link);
            }
		};
	},


	Youku:function(element,link){
		var match = link.match(/id_(.*?)\.html/);
		if(match[1]!=undefined){
			var vedioid = match[1];
			var insertHTML = '<iframe height=498 width=510 frameborder=0 src="http://player.youku.com/embed/'+vedioid+'" allowfullscreen></iframe>';
			Util.debug(insertHTML);
			this.insertVedio(element,insertHTML);
		}
	},

	YouTube:function(element,link){
		var match = link.match(/[&|\?]v=(.*?)(&|$|#)/);
		if(match[1]!=undefined){
			var vedioid = match[1];
			var insertHTML = '<iframe width="560" height="315" src="http://www.youtube.com/embed/'+vedioid+'" frameborder="0" allowfullscreen></iframe>';
			this.insertVedio(element,insertHTML);
		}
	},

    Tudou:function(element,link){
        var match = link.match(/\/view\/(.*?)\//);
        if(match[1]!=undefined){
            var vedioid = match[1];
            var insertHTML = '<embed src="http://player.opengg.me/td.php/v/'+vedioid+'/&resourceId=0_05_05_99&bid=05/v.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="480" height="400"></embed>';
            this.insertVedio(element,insertHTML);
        }
    },

	insertVedio:function(element,html){
		Util.debug($(element),html);
		var $div = $('<div class="diigoVedio_vedioframe"></div>');
		$div.html(html);
		var $ditem = $(element).closest(".ditemItem");
		var $ditemItemDisplayTemp = $ditem.find('.ditemItemDisplayTemp');
		Util.debug($ditem);
		Util.debug($ditemItemDisplayTemp);
		$ditemItemDisplayTemp.after($div);
	}

}

var LibraryExtend = {
    init:function(){
        this.insertFavicon();
    },
    insertFavicon:function(){
        var BookmarkTitleLinksInner = $('.ditemItem .ditemTitle .bookmarkTitle a');
        Util.debug(BookmarkTitleLinksInner);
        for(var i =0 ,len=BookmarkTitleLinksInner.length;i<len;i++){
            var link = BookmarkTitleLinksInner[i]
            if(link.previousElementSibling && link.previousElementSibling.className == 'noteIcon') {
                $(link).css("padding-left","0");
                continue;
            }
            var href = link.href;
            Util.debug(href);
            var regex = /.*\:\/\/([^\/]*).*/;
            var match = href.match(regex);
            if(typeof match != "undefined" && null != match)  var host= match[1];
            if(host){
                var faviconUrl = "https://www.google.com/s2/favicons?domain=" + host;
                $(link).css({
                    "background-image":"url("+faviconUrl+")"
                });
            }
        }
    }
}




D_V.init();
LibraryExtend.init();