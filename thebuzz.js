/* GLOBALS
==================================*/





/* MASTER FUNCTIONS
==================================*/
var theBuzz = {
	data:[],
	date:'',
	processed:[],
	processData:function(data){
		for (var i=1;i < data.length;i++){
			/* Date Issues */
			var date = data[i][0];
			this.processDate(date);

			/* Type Templates */
			switch(data[i][4]){
				case 'Text No Link':
					this.processed[i-1] = '<div class="bites" type="text"><div class="bites-time"><p>'+this.date+'</p></div><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">- '+data[i][7]+'</p></div>'
					break;
				case 'Text With Link':
					this.processed[i-1] = '<a href="'+ data[i][9] +'"><div class="bites" type="link"><div class="bites-time"><p>'+this.date+'</p></div><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][8]+'</p></div></a>'
					break;
				case 'Video':
					this.processed[i-1] = '<a href="'+ data[i][22] +'"><div class="bites" type="link"><div class="bites-time"><p>'+this.date+'</p></div><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][20]+'</p></div></a>'
					//this.processed[i-1] = '<a href="'+ data[i][22] +'"><div class="bites" type="link"><div class="bites-time"><p>'+this.date+'</p></div>'+data[i][21]+'<div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][20]+'</p></div></a>'
					break;
				case 'Small Image No Link':
					this.processed[i-1] = '<div class="bites" type="text"><div class="bites-time"><p>'+this.date+'</p></div><img class="bites-simg" src="'+data[i][11]+'"><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][10]+'</p></div>'
					break;
				case 'Small Image With Link':
					this.processed[i-1] = '<a href="'+ data[i][14] +'"><div class="bites" type="link"><div class="bites-time"><p>'+this.date+'</p></div><img class="bites-simg" src="'+data[i][13]+'"><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][12]+'</p></div></a>'
					break;
				case 'Large Image No Link':
					this.processed[i-1] = '<div class="bites" type="text"><div class="bites-time"><p>'+this.date+'</p></div><img class="bites-limg" src="'+data[i][16]+'"><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][15]+'</p></div>'
					break;
				case 'Large Image With Link':
					this.processed[i-1] = '<a href="'+ data[i][19] +'"><div class="bites" type="link"><div class="bites-time"><p>'+this.date+'</p></div><img class="bites-limg" src="'+data[i][18]+'"><div class="bites-text"><p><strong class="bites-hed">'+data[i][5]+': </strong>'+data[i][6]+'</p><p class="bites-source">'+data[i][17]+'</p></div></a>'
					break;
			}
		}
		return theBuzz.populateBuzz(this.processed);
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





/* SUMMON CSV
==================================*/
d3.text('data.csv', 'text/csv', function(text) {
	theBuzz.data = d3.csv.parseRows(text);
	theBuzz.processData(theBuzz.data);
});