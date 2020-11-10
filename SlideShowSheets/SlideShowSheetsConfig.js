define(['jquery', 'qlik', 'ng!$q', 'ng!$http'], 

	function ($, qlik, $q, $http) {
    'use strict';

    //obtendo instância do app
	var app = qlik.currApp();

	//função para listar todas as pastas existentes (por fé)
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
		label: 			"Duration (seconds)",
		ref: 			"timeDelay",
		defaultValue: 	20,
	};

	var progressBg = {
		type: 			"string",
		label: 			"Color",
		ref: 			"progressBg",
		defaultValue: 	"#CCCCCC",
	};

	var progressHeight = {
		type: 			"number",
		label: 			"Height",
		ref: 			"progressHeight",
		defaultValue: 	25,
	};
	
 	var progressAnimation = {
		type: 			"string",
		component: 		"dropdown",
		label: 			"Direction",
		ref: 			"progressAnimation",
		defaultValue: 	"fw",
		options:[
			 {value: "fw", label: "Right"}
			,{value: "bw", label: "Left"}
		]		
	};	

	var Options = {
		type: 	"items",
		label: 	"Options",
		items: 	{ 
			timeDelay: 			timeDelay, 
			sheetList: 			sheetList,
			progressAnimation: 	progressAnimation,
			progressBg: 		progressBg,
			progressHeight: 	progressHeight
		}
	};
		
    return {
        type: 		"items",
        component: 	"accordion",
        items: 		{ Options: Options }
    };
});