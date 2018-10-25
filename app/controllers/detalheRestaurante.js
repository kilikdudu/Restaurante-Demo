// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.descricao.setText(args.restaurante.descricao);

$.infoRestaurante.setRestaurante(args.restaurante);

function reservar(e){
	var mdRest = Alloy.createModel("restaurante", args.restaurante);
	mdRest.reservar(function(ret){
		if(ret.sucesso){
			args.cb && args.cb();
			args.navigation.closeWindow($.win);
		}
	});
}
