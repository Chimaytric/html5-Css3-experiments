$(document).ready(function(){
	$('#accordion').find('li').each(function(){
		if(!$(this).hasClass('fixed')){
			$(this).find('h2').next().hide();
			$(this).find('h2 span').addClass('down');
		}
	});
	$('#accordion h1').click(function(){
		toggleAll();
	});
	$('#accordion li h2').click(function(){
		if(!$(this).parent().hasClass('fixed')){
			toggleElement($(this).parent());
		}
	});
});

function rotate($element, angle){
	$element.css({'-webkit-transform' : 'rotate('+ angle +'deg)'});
    return $element;
}

function checkState(){
	var state=false;
	$('#accordion li h2').next().each(function(){
		if($(this).is(':visible') && !$(this).parent().hasClass('fixed')){
			state = true;
		}
	});
	return state;
}

function toggleAll(){
	if(checkState()){
		$('#accordion li').each(function(){
			if($(this).find('h2').next().is(':visible') && !$(this).hasClass('fixed')){
				toggleElement($(this));
			}
		});
	}else{
		$('#accordion li').each(function(){
				if(!$(this).hasClass('fixed')){
					toggleElement($(this));
				}
		});
	}
}

function toggleElement($element){
	$element.find('h2').next().slideToggle(300);
	if($element.find('h2 span').hasClass('down'))
		rotate($element.find('h2 span'), -180);
	else
		rotate($element.find('h2 span'), 0);
	$element.find('span').toggleClass('up');
	$element.find('span').toggleClass('down');
}