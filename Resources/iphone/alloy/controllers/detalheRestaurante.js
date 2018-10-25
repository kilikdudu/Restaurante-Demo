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
	this.__controllerPath = 'detalheRestaurante';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.win = Ti.UI.createWindow(
	{ backgroundColor: "white", height: Titanium.UI.FILL, width: Titanium.UI.FILL, layout: "vertical", id: "win", title: "Detalhes" });

	$.__views.win && $.addTopLevelView($.__views.win);
	$.__views.__alloyId3 = Ti.UI.createView(
	{ height: Titanium.UI.SIZE, width: Titanium.UI.FILL, top: 15, id: "__alloyId3" });

	$.__views.win.add($.__views.__alloyId3);
	$.__views.infoRestaurante = Alloy.createController('itemRestaurante', { id: "infoRestaurante", __parentSymbol: $.__views.__alloyId3 });
	$.__views.infoRestaurante.setParent($.__views.__alloyId3);
	$.__views.descricao = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "black", left: 10, right: 10, top: 10, bottom: 10, textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, font: { fontSize: 14 }, id: "descricao" });

	$.__views.win.add($.__views.descricao);
	$.__views.__alloyId4 = Ti.UI.createButton(
	{ left: 10, right: 10, height: 40, borderRadius: 6, backgroundColor: Alloy.Globals.MainColor, color: "#fff", title: 'Reservar', id: "__alloyId4" });

	$.__views.win.add($.__views.__alloyId4);
	reservar ? $.addListener($.__views.__alloyId4, 'click', reservar) : __defers['$.__views.__alloyId4!click!reservar'] = true;exports.destroy = function () {};




	_.extend($, $.__views);



	var args = $.args;

	$.descricao.setText(args.restaurante.descricao);

	$.infoRestaurante.setRestaurante(args.restaurante);

	function reservar(e) {
		var mdRest = Alloy.createModel("restaurante", args.restaurante);
		mdRest.reservar(function (ret) {
			if (ret.sucesso) {
				args.cb && args.cb();
				args.navigation.closeWindow($.win);
			}
		});
	}





	__defers['$.__views.__alloyId4!click!reservar'] && $.addListener($.__views.__alloyId4, 'click', reservar);



	_.extend($, exports);
}

module.exports = Controller;