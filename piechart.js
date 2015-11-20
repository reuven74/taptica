	$(document).ready(function(){
		$('#tabs').tabulous();	
		$('#tabs').tabulous({
			effect: 'scale'
		});	
	});
	google.load("visualization", "1", {packages:["corechart"]});
	google.setOnLoadCallback(drawChart);


	function drawChart() {
		//  JSON RETRIEVED FROM https://s3.amazonaws.com/taptica/test/geo.json
		var geoJson = '{"data":{"geo":[{"country":"US","count":4118233},{"country":"PH","count":3762823},{"country":"ID","count":2771340},{"country":"GB","count":1993545},{"country":"CA","count":1849068},{"country":"BR","count":1813882},{"country":"MY","count":1608374},{"country":"ME","count":1355175},{"country":"SG","count":1247119},{"country":"others","count":19037578}]},"time_frame":{"from":"2015-10-30T00:00:00.000Z","to":"2015-11-05T23:59:59.999Z"},"dsp":"all","type":"DSP","errors":[]}';

		var pieData = $.parseJSON(geoJson);
		var geoData = pieData.data.geo;

		var pieArray = [['country', 'count']];
		$.each( geoData, function( key, value ) { 
			buf = Array(geoData[key].country, geoData[key].count );
			pieArray.push(buf);		  
		});

		var data = google.visualization.arrayToDataTable(pieArray);
		var options = {title: 'Top Countries By Impression',pieHole: 0.5  };

		var chart = new google.visualization.PieChart(document.getElementById('piechart-div'));
		chart.draw(data, options);
	}

	google.load("visualization", "1.1", {packages:["table"]});
	google.setOnLoadCallback(drawTable);

	function drawTable() {
		var data = new google.visualization.DataTable();

		//  JSON RETRIEVED FROM https://s3.amazonaws.com/taptica/test/publishers.json 
		var publishersJson = '{"draw":1,"recordsTotal":74524,"recordsFiltered":74524,"data":[{"0":false,"1":"Inmobi","2":1,"3":null,"4":"2015-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":2,"3":null,"4":"2015-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":true,"1":"Inmobi","2":3,"3":null,"4":"2015-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":4,"3":null,"4":"2015-09-02","5":"2014-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":5,"3":null,"4":"2015-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":true},{"0":false,"1":"Inmobi","2":8,"3":null,"4":"2013-09-02","5":"2013-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":9,"3":null,"4":"2015-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":12,"3":null,"4":"2015-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":13,"3":null,"4":"2012-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":false},{"0":false,"1":"Inmobi","2":14,"3":null,"4":"2010-09-02","5":"2015-09-02","6":-1.0,"7":null,"8":[],"9":"active","10":true}]}';

		var publishersData = $.parseJSON(publishersJson);
		publishersData = publishersData.data;

		data.addColumn('boolean', 'publisher in USA');
		data.addColumn('string', 'Site Type');
		data.addColumn('number', 'Rank');
		data.addColumn('string', 'col4');
		data.addColumn('string', 'from');
		data.addColumn('string', 'to');
		data.addColumn('number', 'col7');
		data.addColumn('string', 'col8');
		data.addColumn('string', 'col9');
		data.addColumn('string', 'status');
		data.addColumn('boolean', 'new publisher');

		$.each( publishersData, function( key, value ) { 
			buf = Array();
			for(var k = 0; k < 11; k++){
				var currData = publishersData[key][k];
				if (currData == null || ($.isArray(currData) &&  currData.length == 0)) currData = " ";
				buf.push(currData);
			}

			var buff = Array();
			buff.push(buf);
			data.addRows(buff);	   
		});

		var table = new google.visualization.Table(document.getElementById('table_div'));

		table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
	}