var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
	var arg = null;
	if (obj) {
		arg = obj[key] || null;
	}
	return arg;
}

function Controller() {

	require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
	this.__controllerPath = 'alertaReserva';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.container = Ti.UI.createView(
	{ backgroundColor: Alloy.Globals.MainColor, height: 50, width: Titanium.UI.FILL, id: "container" });

	$.__views.container && $.addTopLevelView($.__views.container);
	avaliar ? $.addListener($.__views.container, 'click', avaliar) : __defers['$.__views.container!click!avaliar'] = true;$.__views.msgReserva = Ti.UI.createLabel(
	{ width: "90%", height: Ti.UI.SIZE, color: "#fff", textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, font: { fontSize: 16 }, id: "msgReserva" });

	$.__views.container.add($.__views.msgReserva);
	exports.destroy = function () {};




	_.extend($, $.__views);



	var args = $.args;

	$.msgReserva.setText("Sua reserva no " + args.restaurante.get("nome") + " foi confirmada");

	function avaliar() {
		var ctrlAvaliacao = Alloy.createController("avaliarRestaurante", {
			restaurante: args.restaurante, navigation: args.navigation, cb: args.cb });
		args.navigation.openWindow(ctrlAvaliacao.getView());
	}





	__defers['$.__views.container!click!avaliar'] && $.addListener($.__views.container, 'click', avaliar);



	_.extend($, exports);
}

module.exports = Controller;