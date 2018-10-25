// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.setRestaurante = function(restaurante){
	$.restaurante.set(restaurante);	
};

$.setRestaurante(args.restaurante);
