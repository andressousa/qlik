define(['jquery','qlik','./SlideShowSheetsConfig', 'css!./SlideShowSheets.css'],
    function ($, qlik, props, css){
        'use strict';

		$('<style>').html(css).appendTo('head');

        return {
			definition: props,
			snapshot: 	{cantTakeSnapshot: true}, 
            paint: function($element, layout){

				var progressAnimation 	= layout.progressAnimation;
				var progressHeight		= layout.progressHeight + 'px';
				var progressBg 			= layout.progressBg;
				var selectedSheet 		= layout.selectedSheet;
				var timeToNext 			= layout.timeDelay;

				$element.empty();
				$element.append('<div id="progressCoutdown"><div class="'+progressAnimation+'"></div></div>');

				$('body').find('#progressCoutdown div').css('animation-duration', timeToNext + 's');
				$('body').find('#progressCoutdown div').css('ground-color', progressBg);
				$('body').find('#progressCoutdown').css('height', progressHeight);

				if (qlik.navigation.getMode() != 'edit' ){	
					setTimeout(
						function(){ qlik.navigation.gotoSheet(selectedSheet); }, 
						timeToNext * 1000
					);
				};

			}			
        }
    }
);