$(document).ready(function(){
	$('#tabs li').each(function(){
		$(this).click(function(){
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
				$('#elements li').each(function(){
					if(!$(this).hasClass('selected')){
						$(this).addClass('selected');
						$(this).find('h1').fadeIn(300);
					}
				});
			} else{
				$('#tabs li').each(function(){
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
				$('#elements li').each(function(){
					$(this).removeClass('selected');
					$(this).find('h1').fadeOut(300);
				});
				$('#elements .element-'+$(this).attr('class').substr(4, 1)).each(function(){
					$(this).addClass('selected');
					$(this).find('h1').fadeIn(300);
				});
			}
		});
	});
});