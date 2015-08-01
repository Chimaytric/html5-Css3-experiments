$(document).ready(function(){
	$("article").click(function(){
		$(this).find('ul li a').toggle(500);
	});
});