exports.definition = {
	config: {
		columns: {
			"datahora": "string",
			"quantidade": "number",
			"restauranteID": "string"	
		},
		adapter: {
			type: "properties",
			collection_name: "reserva"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			reservar: function(cb) { 
				var md = this;
				var ws = require('webapi');
				ws.request({
					url: Alloy.Globals.Constantes.API_ENDPOINT + "reserva",
					metodo: "POST",
					args: JSON.stringify(md.toJSON())
				}, function(ret){
					if(ret.sucesso){
						cb({sucesso: true, mensagem: "Reserva efetuada"});
					} else {
						cb(ret);
					}
				});
				
			},
			buscaRestauranteReserva: function(cb){
				var md = this;
				var ws = require('webapi');
				ws.request({
					url: Alloy.Globals.Constantes.API_ENDPOINT + "reserva",
					metodo: "GET"
				}, function(ret){
					if(ret.sucesso){
						
						if(ret.retorno.reservas.length == 0){
							cb({sucesso: false, mensagem: "Nenhuma reserva"});
							return;
						}
						
						md.set(ret.retorno.reservas[0]);
						
						var mdRestaurante = Alloy.createModel("restaurante");
						mdRestaurante.buscarPorID(md.get("restauranteID"), function(e){
							
							if(e.sucesso){
								cb({sucesso: true, mensagem: "", restaurante: mdRestaurante});	
							} else {
								cb(ret);
							}
						});
						
					} else {
						cb(ret);
					}
				});
				
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
			apagar: function(cb){
				var md = this;
				var ws = require('webapi');
				ws.request({
					url: Alloy.Globals.Constantes.API_ENDPOINT + "reserva",
					metodo: "DELETE"
				}, function(ret){
					if(ret.sucesso){
						cb({sucesso: true, mensagem: "Reservas apagadas"});
					} else {
						cb(ret);
					}
				});
			}
		});

		return Collection;
	}
};