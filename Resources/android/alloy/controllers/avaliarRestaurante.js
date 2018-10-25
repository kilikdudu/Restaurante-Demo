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
	this.__controllerPath = 'avaliarRestaurante';
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
	{ backgroundColor: "white", height: Titanium.UI.FILL, width: Titanium.UI.FILL, layout: "vertical", id: "win", title: "Avaliação" });

	$.__views.win && $.addTopLevelView($.__views.win);
	$.__views.cabecalho = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "black", left: 10, right: 10, top: 10, bottom: 10, textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, font: { fontSize: 14 }, id: "cabecalho" });

	$.__views.win.add($.__views.cabecalho);
	$.__views.__alloyId0 = Ti.UI.createView(
	{ width: "90%", height: Titanium.UI.SIZE, id: "__alloyId0" });

	$.__views.win.add($.__views.__alloyId0);
	$.__views.__alloyId1 = Ti.UI.createView(
	{ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, layout: "horizontal", id: "__alloyId1" });

	$.__views.__alloyId0.add($.__views.__alloyId1);
	$.__views.star0 = Ti.UI.createImageView(
	{ image: "/images/avaliacaoDesmarcada.png", width: 42, left: 0, id: "star0", valor: 1 });

	$.__views.__alloyId1.add($.__views.star0);
	marcarEstrela ? $.addListener($.__views.star0, 'click', marcarEstrela) : __defers['$.__views.star0!click!marcarEstrela'] = true;$.__views.star1 = Ti.UI.createImageView(
	{ image: "/images/avaliacaoDesmarcada.png", width: 42, left: 5, id: "star1", valor: 2 });

	$.__views.__alloyId1.add($.__views.star1);
	marcarEstrela ? $.addListener($.__views.star1, 'click', marcarEstrela) : __defers['$.__views.star1!click!marcarEstrela'] = true;$.__views.star2 = Ti.UI.createImageView(
	{ image: "/images/avaliacaoDesmarcada.png", width: 42, left: 5, id: "star2", valor: 3 });

	$.__views.__alloyId1.add($.__views.star2);
	marcarEstrela ? $.addListener($.__views.star2, 'click', marcarEstrela) : __defers['$.__views.star2!click!marcarEstrela'] = true;$.__views.star3 = Ti.UI.createImageView(
	{ image: "/images/avaliacaoDesmarcada.png", width: 42, left: 5, id: "star3", valor: 4 });

	$.__views.__alloyId1.add($.__views.star3);
	marcarEstrela ? $.addListener($.__views.star3, 'click', marcarEstrela) : __defers['$.__views.star3!click!marcarEstrela'] = true;$.__views.star4 = Ti.UI.createImageView(
	{ image: "/images/avaliacaoDesmarcada.png", width: 42, left: 5, id: "star4", valor: 5 });

	$.__views.__alloyId1.add($.__views.star4);
	marcarEstrela ? $.addListener($.__views.star4, 'click', marcarEstrela) : __defers['$.__views.star4!click!marcarEstrela'] = true;$.__views.comentario = Ti.UI.createTextField(
	{ left: 10, right: 10, hintText: "Comentário", height: 50, color: "black", id: "comentario" });

	$.__views.win.add($.__views.comentario);
	$.__views.__alloyId2 = Ti.UI.createButton(
	{ left: 10, right: 10, height: 40, borderRadius: 6, backgroundColor: Alloy.Globals.MainColor, title: 'Confirmar', id: "__alloyId2" });

	$.__views.win.add($.__views.__alloyId2);
	confirmar ? $.addListener($.__views.__alloyId2, 'click', confirmar) : __defers['$.__views.__alloyId2!click!confirmar'] = true;exports.destroy = function () {};




	_.extend($, $.__views);



	var args = $.args;
	var nota = 0;

	$.cabecalho.setText("Conte como foi sua experiência no " + args.restaurante.get("nome") + ". Deixe também a sua avaliação !");

	function marcarEstrela(e) {
		nota = e.source.valor;
		for (var i = 0; i < 5; i++) {
			if (i <= e.source.valor - 1) {
				$["star" + i].image = "/images/avaliacaoMarcada.png";
			} else {
				$["star" + i].image = "/images/avaliacaoDesmarcada.png";
			}
		}
	}

	function confirmar() {
		args.restaurante.avaliar(nota, $.comentario.getValue(), function (ret) {
			if (ret.sucesso) {
				args.cb && args.cb();
				args.navigation.closeWindow($.win);
			}
		});
	}





	__defers['$.__views.star0!click!marcarEstrela'] && $.addListener($.__views.star0, 'click', marcarEstrela);__defers['$.__views.star1!click!marcarEstrela'] && $.addListener($.__views.star1, 'click', marcarEstrela);__defers['$.__views.star2!click!marcarEstrela'] && $.addListener($.__views.star2, 'click', marcarEstrela);__defers['$.__views.star3!click!marcarEstrela'] && $.addListener($.__views.star3, 'click', marcarEstrela);__defers['$.__views.star4!click!marcarEstrela'] && $.addListener($.__views.star4, 'click', marcarEstrela);__defers['$.__views.__alloyId2!click!confirmar'] && $.addListener($.__views.__alloyId2, 'click', confirmar);



	_.extend($, exports);
}

module.exports = Controller;