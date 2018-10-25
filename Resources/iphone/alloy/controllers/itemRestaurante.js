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
	this.__controllerPath = 'itemRestaurante';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};




	$.restaurante = Alloy.createModel('restaurante');


	$.__views.itemRestaurante = Ti.UI.createView(
	{ left: 10, right: 10, top: 9, bottom: 10, height: Titanium.UI.SIZE, backgroundColor: "white", viewShadowColor: "#787878", viewShadowOffset: 2, id: "itemRestaurante" });

	$.__views.itemRestaurante && $.addTopLevelView($.__views.itemRestaurante);
	$.__views.__alloyId12 = Ti.UI.createView(
	{ left: 5, right: 5, height: Titanium.UI.SIZE, id: "__alloyId12" });

	$.__views.itemRestaurante.add($.__views.__alloyId12);
	$.__views.__alloyId13 = Ti.UI.createImageView(
	{ height: 80, width: 80, borderRadius: 4, left: 0, top: 5, bottom: 5, id: "__alloyId13" });

	$.__views.__alloyId12.add($.__views.__alloyId13);
	$.__views.__alloyId14 = Ti.UI.createView(
	{ layout: "vertical", height: Titanium.UI.SIZE, left: 85, right: 0, id: "__alloyId14" });

	$.__views.__alloyId12.add($.__views.__alloyId14);
	$.__views.__alloyId15 = Ti.UI.createLabel(
	{ width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "black", font: { fontSize: 15, fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId15" });

	$.__views.__alloyId14.add($.__views.__alloyId15);
	$.__views.__alloyId16 = Ti.UI.createView(
	{ height: Titanium.UI.SIZE, width: Titanium.UI.FILL, layout: "horizontal", top: 2, id: "__alloyId16" });

	$.__views.__alloyId14.add($.__views.__alloyId16);
	$.__views.__alloyId17 = Ti.UI.createImageView(
	{ height: 17, width: 17, right: 3, image: "/images/restaurante/tipo.png", id: "__alloyId17" });

	$.__views.__alloyId16.add($.__views.__alloyId17);
	$.__views.__alloyId18 = Ti.UI.createLabel(
	{ width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "darkgray", font: { fontSize: 13 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId18" });

	$.__views.__alloyId16.add($.__views.__alloyId18);
	$.__views.__alloyId19 = Ti.UI.createView(
	{ height: Titanium.UI.SIZE, width: Titanium.UI.FILL, layout: "horizontal", top: 2, id: "__alloyId19" });

	$.__views.__alloyId14.add($.__views.__alloyId19);
	$.__views.__alloyId20 = Ti.UI.createImageView(
	{ height: 17, width: 17, right: 3, image: "/images/restaurante/horario.png", id: "__alloyId20" });

	$.__views.__alloyId19.add($.__views.__alloyId20);
	$.__views.__alloyId21 = Ti.UI.createLabel(
	{ width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "darkgray", font: { fontSize: 13 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId21" });

	$.__views.__alloyId19.add($.__views.__alloyId21);
	$.__views.__alloyId22 = Ti.UI.createView(
	{ height: Titanium.UI.SIZE, width: Titanium.UI.FILL, layout: "horizontal", top: 2, id: "__alloyId22" });

	$.__views.__alloyId14.add($.__views.__alloyId22);
	$.__views.__alloyId23 = Ti.UI.createImageView(
	{ height: 17, width: 17, right: 3, image: "/images/restaurante/nota.png", id: "__alloyId23" });

	$.__views.__alloyId22.add($.__views.__alloyId23);
	$.__views.__alloyId24 = Ti.UI.createLabel(
	{ width: Titanium.UI.FILL, height: Titanium.UI.SIZE, color: "darkgray", font: { fontSize: 13 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "__alloyId24" });

	$.__views.__alloyId22.add($.__views.__alloyId24);
	var __alloyId25 = function () {$['restaurante'].__transform = _.isFunction($['restaurante'].transform) ? $['restaurante'].transform() : $['restaurante'].toJSON();$.__alloyId13.image = $['restaurante']['__transform']['imagem'];$.__alloyId15.text = $['restaurante']['__transform']['nome'];$.__alloyId18.text = $['restaurante']['__transform']['tipo'];$.__alloyId21.text = $['restaurante']['__transform']['horarioFuncionamento'];$.__alloyId24.text = $['restaurante']['__transform']['nota'];};$['restaurante'].on('fetch change destroy', __alloyId25);exports.destroy = function () {$['restaurante'] && $['restaurante'].off('fetch change destroy', __alloyId25);};




	_.extend($, $.__views);



	var args = $.args;

	$.setRestaurante = function (restaurante) {
		$.restaurante.set(restaurante);
	};

	$.setRestaurante(args.restaurante);









	_.extend($, exports);
}

module.exports = Controller;