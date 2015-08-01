$(document).ready(function(){
	$('#sub-elements > ul > li').each(function(){
		$(this).hide();
	});
	$('#elements li').each(function(){
		$(this).click(function(){
			$('#elements li').each(function(){
				$(this).removeClass('selected');
			});
			$(this).addClass('selected');
			$('#sub-elements > ul > *').each(function(){
				$(this).hide();
			});
			$('#sub-elements li.sub-elements_'+$(this).attr('class').split(' ')[0].substr(8)).fadeIn(300);
		});
	});
});