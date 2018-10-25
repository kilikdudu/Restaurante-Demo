// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var nota = 0;

$.cabecalho.setText("Conte como foi sua experiência no " + args.restaurante.get("nome") + ". Deixe também a sua avaliação !");

function marcarEstrela(e){
	nota = e.source.valor;
	for(var i = 0; i < 5; i++){
		if(i <= (e.source.valor - 1)){
			$["star" + i].image = "/images/avaliacaoMarcada.png";	
		} else {
			$["star" + i].image = "/images/avaliacaoDesmarcada.png";
		}
	}	
}

function confirmar(){
	Alloy.createModel("avaliacao", {
		nota: nota,
		avaliacao: $.comentario.getValue(),
		restauranteID: args.restaurante.get("id")
	}).avaliar(function(ret){
		if(ret.sucesso){
			args.cb && args.cb();
			args.navigation.closeWindow($.win);
		} else {
			alert(ret.mensagem);
		}
	});
}
