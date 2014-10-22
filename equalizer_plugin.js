(function( $ ){
			//функция анимации
			function animate_col (shgt,line,timeout,contin) {
				if($(line).parent().data('stop') == '+') return;
				
				var colHeight = Math.round(shgt * Math.random());
				if(contin){ colHeight = $(line).height(); } //продолжение после паузы
				
				$(line).animate(
					{height: colHeight},
					timeout/2,
					'linear',
					function(){
						$(line).animate(
							{height: Math.round(shgt/2)},
							timeout/2,
							'linear',
							function () {
								animate_col(shgt, line, timeout);
							}
						);
					}
				);
			}
			
			var settings = []; //параметры
			
			//методы плагина
			var methods = {
				//создание эквалайзера
				start: function(options) {
					if($(this).data('equaliz') == '+') return;
					
					settings = $.extend( {
					  'timeout': '1000',
					  'colWidth': '2'
					}, options);
					
					//ставим дату о том, что наш элемент - эквалайзер
					$(this).data('equaliz','+');
					
					//ставим высоту в переменную. Прямо здесь, ведь не было требований к изменению размера блока во время анимации, верно?
					var hgt = $(this).height();
					
					//ставим параметры самому блоку
					$(this).css({
						  verticalAlign: 'bottom',
						  lineHeight: hgt + 'px'
					 });
					
					var colQuantity = Math.ceil($(this).width()/settings['colWidth']);
					var cols = new Array(colQuantity);
					for (var i = 0; i < cols.length; i++) {
						var span = $('<span/>').appendTo(this);
						span.css({
							  verticalAlign: 'bottom',
							  display: 'inline-block',
				  
							  fontSize: 0,
							  lineHeight: 0,
				  
							  width: settings['colWidth'],
							  background: 'pink',
							  borderTop: '2px solid red'
						});
					}
					
					$(this).children('span').each(function (i) {
						animate_col(hgt,this,parseInt(settings['timeout']));
						//  animate_line(hgt, this, timeout);
					});
				},
				//пауза
				stop: function(){
					$(this).data('stop','+');
				},
				//продолжить
				contin: function(){
					var hgt = $(this).height();
					$(this).data('stop','-');
					$(this).children('span').each(function (i) {
						animate_col(hgt,this,parseInt(settings['timeout']),true);
					});
				},
				//удаление эквалайзера
				del: function(){
					$(this).data('stop','+');
					$(this).children('span').remove();
					$(this).data('stop','-');
					$(this).data('equaliz','-');
				}
			}
			
			//плагин
			$.fn.equalizer = function( method ) {
				if ( methods[method] ) {
				  return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
				} else if ( typeof method === 'object' || ! method ) {
				  return methods.start.apply( this, arguments );
				} else {
				  $.error( 'Неверно задан метод' );
				}    
		    };
			
		})( jQuery );
