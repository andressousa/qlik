define(["qlik", "jquery", "text!./style.css"],
function (qlik, $, css) {
	'use strict';
	$( "<style>" ).html( css ).appendTo( "head" );
	return {
		paint: function ($element) {
			var html  = '<lui-button id="dark_button_normal" class="lui-button">&#9728;</lui-button>';
				html += '<lui-button id="dark_button_grey" class="lui-button">&#9872;</lui-button>';
				html += '<lui-button id="dark_button_dark" class="lui-button">&#9873;</lui-button>';
			$element.html('').append(html);

			$('body').find('#dark_button_normal').on( 'click', function(){
				$('html').removeClass('auto_dark_grey').removeClass('auto_dark_dark');
			});

			$('body').find('#dark_button_grey').on( 'click', function(){
				$('html').removeClass('auto_dark_grey').removeClass('auto_dark_dark').addClass('auto_dark_grey');
			});

			$('body').find('#dark_button_dark').on( 'click', function(){
				$('html').removeClass('auto_dark_grey').removeClass('auto_dark_dark').addClass('auto_dark_dark');
			});
			return qlik.Promise.resolve();
		}
	};

} );

