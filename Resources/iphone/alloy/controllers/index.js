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
		this.__controllerPath = 'index';
		this.args = arguments[0] || {};

		if (arguments[0]) {
				var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
				var $model = __processArg(arguments[0], '$model');
				var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
		}
		var $ = this;
		var exports = {};
		var __defers = {};




		$.restaurantes = Alloy.createCollection('restaurante');


		$.__views.win = Ti.UI.createWindow(
		{ backgroundColor: "white", height: Titanium.UI.FILL, width: Titanium.UI.FILL, id: "win", title: "Restaurante Demo" });

		$.__views.atividade = Ti.UI.createActivityIndicator(
		{ id: "atividade", indicatorColor: "red" });

		$.__views.win.add($.__views.atividade);
		$.__views.tabela = Ti.UI.createTableView(
		{ height: Titanium.UI.FILL, width: Titanium.UI.FILL, backgroundColor: "transparent", separatorColor: "transparent", id: "tabela" });

		$.__views.win.add($.__views.tabela);
		var __alloyId10 = Alloy.Collections['$.restaurantes'] || $.restaurantes;function __alloyId11(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId11.opts || {};var models = __alloyId10.models;var len = models.length;var rows = [];for (var i = 0; i < len; i++) {var __alloyId5 = models[i];__alloyId5.__transform = _.isFunction(__alloyId5.transform) ? __alloyId5.transform() : __alloyId5.toJSON();var __alloyId7 = Ti.UI.createTableViewRow(
						{ height: Titanium.UI.SIZE, width: Titanium.UI.FILL, index: __alloyId5.__transform.id });

						rows.push(__alloyId7);
						var __alloyId9 = Alloy.createController('itemRestaurante', { restaurante: __alloyId5.__transform.copia, $model: __alloyId5, __parentSymbol: __alloyId7 });
						__alloyId9.setParent(__alloyId7);
				}$.__views.tabela.setData(rows);};__alloyId10.on('fetch destroy change add remove reset', __alloyId11);detalhar ? $.addListener($.__views.tabela, 'click', detalhar) : __defers['$.__views.tabela!click!detalhar'] = true;$.__views.navigation = (require("xp.ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)(
		{ window: $.__views.win, id: "navigation" });

		$.__views.navigation && $.addTopLevelView($.__views.navigation);
		exports.destroy = function () {__alloyId10 && __alloyId10.off('fetch destroy change add remove reset', __alloyId11);};




		_.extend($, $.__views);




		$.win.addEventListener("open", function (e) {
				$.atividade.show();
				$.restaurantes.buscar(function (ret) {
						if (ret.sucesso) {
								$.atividade.hide();
								refreshReserva();
						}
				});
		});

		function detalhar(e) {
				var mdRestaurante = $.restaurantes.where({ id: e.row.index })[0];
				var ctrlDetalhes = Alloy.createController("detalheRestaurante", { restaurante: mdRestaurante.toJSON(),
						navigation: $.navigation, cb: refreshReserva });
				$.navigation.openWindow(ctrlDetalhes.getView());
		}

		function refreshReserva() {
				var mdRest = Alloy.createModel("restaurante");
				mdRest.buscaRestauranteReserva(function (ret) {
						if (ret.sucesso) {
								var vwAlerta = Alloy.createController("alertaReserva", {
										restaurante: mdRest, navigation: $.navigation, cb: function () {
												$.win.remove(vwAlerta);
										} }).getView();
								animacaoReserva(vwAlerta);
								$.win.add(vwAlerta);
						}
				});
		}

		function animacaoReserva(vw) {
				vw.setBottom(vw.getHeight() * -1);
				var animacao = Ti.UI.createAnimation({
						duration: 450,
						bottom: 0 });

				vw.animate(animacao);
		}

		$.navigation.open();





		__defers['$.__views.tabela!click!detalhar'] && $.addListener($.__views.tabela, 'click', detalhar);



		_.extend($, exports);
}

module.exports = Controller;