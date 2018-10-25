

$.win.addEventListener("open", function(e){
	$.atividade.show();
	$.restaurantes.buscar(function(ret){
		if(ret.sucesso){
			$.atividade.hide();
			refreshReserva();
		}
	});
});

function detalhar(e){
	var mdRestaurante = $.restaurantes.where({id: e.row.index})[0];
	var ctrlDetalhes = Alloy.createController("detalheRestaurante", {restaurante: mdRestaurante.toJSON(), 
		navigation: $.navigation, cb: refreshReserva});
	$.navigation.openWindow(ctrlDetalhes.getView());
}

function refreshReserva(){
	var mdRest = Alloy.createModel("restaurante");
	mdRest.buscaRestauranteReserva(function(ret){
		if(ret.sucesso){
			var vwAlerta = Alloy.createController("alertaReserva", {
				restaurante: mdRest, navigation: $.navigation, cb: function(){
					$.win.remove(vwAlerta);
				}}).getView();
			animacaoReserva(vwAlerta);
			$.win.add(vwAlerta);
		}
	});
}

function animacaoReserva(vw){
	vw.setBottom(vw.getHeight() * -1);
	var animacao = Ti.UI.createAnimation({
		duration: 450,
		bottom: 0
	});
	vw.animate(animacao);
}

$.navigation.open();