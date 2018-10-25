// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.msgReserva.setText("Sua reserva no " + args.restaurante.get("nome") + " foi confirmada");

function avaliar(){
	var ctrlAvaliacao = Alloy.createController("avaliarRestaurante", {
		restaurante: args.restaurante, navigation: args.navigation, cb: args.cb});
	args.navigation.openWindow(ctrlAvaliacao.getView());
}
