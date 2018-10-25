exports.definition = {
	config: {
		columns: {
			"nota": "number",
			"avaliacao": "string",
			"restauranteID": "string"
		},
		adapter: {
			type: "properties",
			collection_name: "avaliacao"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			avaliar: function(cb){
				var md = this;
				var ws = require('webapi');
				ws.request({
					url: Alloy.Globals.Constantes.API_ENDPOINT + "avaliacao",
					metodo: "POST",
					args: JSON.stringify(md.toJSON())
				}, function(ret){
					if(ret.sucesso){
						Alloy.createCollection("reserva").apagar(function(e){
							if(e.sucesso){
								cb({sucesso: true, mensagem: ""});	
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
		});

		return Collection;
	}
};