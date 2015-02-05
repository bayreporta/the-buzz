/* MASTER FUNCTIONS
==================================*/
var theBuzz = {
	data:[],
	date:'',
	processed:[],
	processData:function(data, tabletop){
		var thisData = [];
		$.each( tabletop.sheets("main").all(), function(i, main) {
			var insertRow = [];
			insertRow[0] = main.timestamp;
			insertRow[1] = main.yourname;
			insertRow[2] = main.editiedby;
			insertRow[3] = main.approved;
			insertRow[4] = main.typeofbuzzitem;
			insertRow[5] = main.buzzitemheadline;
			insertRow[6] = main.buzzitemtext;
			insertRow[7] = main.textnolinksource;
			insertRow[8] = main.textwithlinksource;
			insertRow[9] = main.textwithlinkurl;
			insertRow[10] = main.smallimagenolinksource;
			insertRow[11] = main.smallimagenoimageurl;
			insertRow[12] = main.smallimagewithlinksource;
			insertRow[13] = main.smallimagewithimageurl;
			insertRow[14] = main.smallimagewithlinkurl;
			insertRow[15] = main.largeimagenolinksource;
			insertRow[16] = main.largeimagenoimageurl;
			insertRow[17] = main.largeimagewithlinksource;
			insertRow[18] = main.largeimagewithimageurl;
			insertRow[19] = main.largeimagewithlinkurl;
			insertRow[20] = main.videosource;
			insertRow[21] = main.videoembedcode;
			insertRow[22] = main.videolinkurl;
			thisData.push(insertRow);
		});
		for (var i=0;i < thisData.length;i++){
			/* Date Issues */
			var date = thisData[i][0];
			theBuzz.processDate(date);
			/* Type Templates */
			switch(thisData[i][4]){
				case 'Text No Link':
					theBuzz.processed[i] = '<div class="bites" type="text"><div class="bites-time"><p>'+theBuzz.date+'</p></div><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">- '+thisData[i][7]+'</p></div>'
					break;
				case 'Text With Link':
					theBuzz.processed[i] = '<a target="_blank" href="'+ thisData[i][9] +'"><div class="bites" type="link"><div class="bites-time"><p>'+theBuzz.date+'</p></div><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">'+thisData[i][8]+'</p></div></a>'
					break;
				case 'Video':
					theBuzz.processed[i] = '<a target="_blank" href="'+ thisData[i][22] +'"><div class="bites" type="link"><div class="bites-time"><p>'+theBuzz.date+'</p></div><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">'+thisData[i][20]+'</p></div></a>'
					break;
				case 'Small Image No Link':
					theBuzz.processed[i] = '<div class="bites" type="text"><div class="bites-time"><p>'+theBuzz.date+'</p></div><img class="bites-simg" src="'+thisData[i][11]+'"><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">'+thisData[i][10]+'</p></div>'
					break;
				case 'Small Image With Link':
					theBuzz.processed[i] = '<a target="_blank" href="'+ thisData[i][14] +'"><div class="bites" type="link"><div class="bites-time"><p>'+theBuzz.date+'</p></div><img class="bites-simg" src="'+thisData[i][13]+'"><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">'+thisData[i][12]+'</p></div></a>'
					break;
				case 'Large Image No Link':
					theBuzz.processed[i] = '<div class="bites" type="text"><div class="bites-time"><p>'+theBuzz.date+'</p></div><img class="bites-limg" src="'+thisData[i][16]+'"><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">'+thisData[i][15]+'</p></div>'
					break;
				case 'Large Image With Link':
					theBuzz.processed[i] = '<a target="_blank" href="'+ thisData[i][19] +'"><div class="bites" type="link"><div class="bites-time"><p>'+theBuzz.date+'</p></div><img class="bites-limg" src="'+thisData[i][18]+'"><div class="bites-text"><p><strong class="bites-hed">'+thisData[i][5]+': </strong>'+thisData[i][6]+'</p><p class="bites-source">'+thisData[i][17]+'</p></div></a>'
					break;
			}
		}
		return theBuzz.populateBuzz(theBuzz.processed);
	},
	processDate:function(date){
		var today = new Date()
		var nowSec = Date.parse(today);
		var thisTime = Date.parse(date);
		var timeDif = nowSec - thisTime;
		var buzzTime;

		/* Check time difference */
		if (timeDif < 3600000){
			buzzTime = Math.round(timeDif / 60000) + ' minutes ago';
		}
		else if (timeDif < 86400000){
			buzzTime = Math.round(timeDif / 3600000) + ' hours ago';
		}
		else if (timeDif >= 86400000){
			var temp = Math.round(timeDif / 86400000);
			if (temp === 1){
				buzzTime = temp + ' day ago';
			}
			else {
				buzzTime = temp + ' days ago';
			}
		}
		return theBuzz.date = buzzTime;
	},
	populateBuzz:function(items){
		console.log(items)
		var j = items.length;

		for (var i=0; i < j; i++){
			$('#bites').prepend(items[i]);
			console.log(i)
		}
	}
}

/* TABLETOP
==================================*/
gsheet = "https://docs.google.com/spreadsheets/d/1U8sbVnQw4I9RMY91Bhlf5qYctJfZ7Bkyi1njLGGynrg/pubhtml";
$(document).ready(function(){
	Tabletop.init( { key: gsheet,
	                 callback: theBuzz.processData,
	                 wanted: ["main"],
					 proxy: "https://s3.amazonaws.com/edsource-the-buzz",
	                 debug: true } );
});
