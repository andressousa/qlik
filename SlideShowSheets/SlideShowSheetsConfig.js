define(['jquery','qlik','ng!$q','ng!$http'], function ($, qlik, $q, $http) {
    'use strict';
	var app = qlik.currApp();
	var getSheetList = function (){
		var defer = $q.defer();
		app.getAppObjectList(function(data){
			var sheets = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function(item){
				return item.qData.rank;
			});
			_.each(sortedData, function(item){
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				});
			});
			return defer.resolve(sheets);
		} );
		return defer.promise;
	};

	var sheetList = {
		type: 		"string",
		component: 	"dropdown",
		label: 		"Go to Sheet",
		ref: 		"selectedSheet",
		options: 	function(){ return getSheetList().then(function(items){ return items; }); }
	};

 	var timeDelay = {
		type: 			"number",
		component: 		"dropdown",
		label: 			"Duration",
		ref: 			"timeDelay",
		defaultValue: 	20000,
		options:[
			 {value: 5,  label: "05 seconds"}
			,{value: 10, label: "10 seconds"}
			,{value: 15, label: "15 seconds"}
			,{value: 20, label: "20 seconds"}
			,{value: 25, label: "25 seconds"}
			,{value: 30, label: "30 seconds"}
			,{value: 35, label: "35 seconds"}
			,{value: 40, label: "40 seconds"}
			,{value: 45, label: "45 seconds"}
			,{value: 50, label: "50 seconds"}
			,{value: 55, label: "55 seconds"}
			,{value: 60, label: "01 minute"}
		]		
	};	

	var progressBg = {
		type: 			"string",
		label: 			"Color",
		ref: 			"progressBg",
		defaultValue: 	'#CCCCCC',
	};

	var progressHeight = {
		type: 			"string",
		label: 			"Height",
		ref: 			"progressHeight",
		defaultValue: 	'25',
	};
	
 	var progressAnimation = {
		type: 			"string",
		component: 		"dropdown",
		label: 			"Direction",
		ref: 			"progressAnimation",
		defaultValue: 	'fw',
		options:[
			 {value: 'fw', label: "Right"}
			,{value: 'bw', label: "Left"}
		]		
	};	

	var Options = {
		type: 	"items",
		label: 	"Options",
		items: 	{ 
			timeDelay:timeDelay, 
			sheetList:sheetList,
			progressAnimation:progressAnimation,
			progressBg:progressBg,
			progressHeight:progressHeight
		}
	};
		
    return {
        type: 		"items",
        component: 	"accordion",
        items: 		{ Options: Options }
    };
});