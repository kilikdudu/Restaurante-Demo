exports.definition = {
	config: {
		columns: {
			"id": "string",
			"nome": "string",
			"horarioFuncionamento": "string",
			"nota": "number",
			"tipo": "string",
			"urlfoto": "string",
			"descricao": "string"	
		},
		adapter: {
			type: "properties",
			collection_name: "restaurante",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			transform: function(){
				var md = this.toJSON();
				 
				md.imagem = md.urlfoto;
				md.nota = parseFloat(md.nota).toFixed(1);
				
				md.copia = md;
				return md;
			},
			buscarPorID: function(id, cb){
				var md = this;
				var ws = require('webapi');
				ws.request({
					url: Alloy.Globals.Constantes.API_ENDPOINT + "restaurante/" + id,
					metodo: "GET"
				}, function(ret){
					if(ret.sucesso){
						md.set(ret.retorno.restaurante);
						cb({sucesso: true, mensagem: ""});
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
			buscar: function(cb){
				
				var col = this;
				col.reset();
				
				var ws = require('webapi');
				ws.request({
					url: Alloy.Globals.Constantes.API_ENDPOINT + "restaurante",
					metodo: "GET"
				}, function(ret){
					if(ret.sucesso){
						col.add(ret.retorno.restaurantes, {silent: true});
						col.trigger("change");
						cb({sucesso: true, mensagem: ""});
					} else {
						cb(ret);
					}
				});
				
			}
		});

		return Collection;
	}
};