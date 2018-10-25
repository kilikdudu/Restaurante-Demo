exports.definition = {
	config: {
		columns: {
			"id": "number",
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
				
				md.horarioFuncionamento = "Das " + md.horarioFuncionamento; 
				md.imagem = md.urlfoto;
				md.nota = parseFloat(md.nota).toFixed(1);
				
				md.copia = md;
				return md;
			},
			reservar: function(cb) { 
				Alloy.Globals.restaurante = this.toJSON();
				cb({sucesso: true, mensagem: "Reserva efetuada"});
			},
			buscaRestauranteReserva: function(cb){
				if(Alloy.Globals.restaurante){
					this.set(Alloy.Globals.restaurante);
					cb({sucesso: true, mensagem: ""});	
				} else {
					cb({sucesso: false, mensagem: ""});
				}
				
			},
			avaliar: function(nota, comentario, cb){
				Alloy.Globals.restaurante = false;
				cb({sucesso: true, mensagem: ""});
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
				
				/*var colTemp = [];
				colTemp.push({
					id: 1,
					nome: "Restaurante 01",
					horaAbertura: "20:00:00",
					horaEncerramento: "00:00:00",
					nota: 5,
					tipo: "Italiano",
					imagem: "https://media-cdn.tripadvisor.com/media/photo-s/10/3d/3b/ba/rs.jpg",
					descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus cursus interdum. Vivamus nec efficitur ex. Integer commodo sapien sed mattis venenatis. Duis nibh metus, convallis ut imperdiet ac, maximus eu velit. Suspendisse potenti. Nullam tristique sagittis auctor. Aenean viverra condimentum varius. Maecenas elementum erat quis mi consectetur, at vehicula augue laoreet."
				});
				
				colTemp.push({
					id: 2,
					nome: "Restaurante 02",
					horaAbertura: "21:00:00",
					horaEncerramento: "01:00:00",
					nota: 3.5,
					tipo: "Francês",
					imagem: "https://www.baressp.com.br/barreporter/imgs/Le_french_restaurantes_franceses_sp.jpg",
					descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus cursus interdum. Vivamus nec efficitur ex. Integer commodo sapien sed mattis venenatis. Duis nibh metus, convallis ut imperdiet ac, maximus eu velit. Suspendisse potenti. Nullam tristique sagittis auctor. Aenean viverra condimentum varius. Maecenas elementum erat quis mi consectetur, at vehicula augue laoreet."
				});
				
				colTemp.push({
					id: 3,
					nome: "Restaurante 03",
					horaAbertura: "22:00:00",
					horaEncerramento: "02:00:00",
					nota: 2.4,
					tipo: "Churrascaria",
					imagem: "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000ocj65MAA/59d241f2e4b0a48c96c8c2a7.jpg&w=620&h=400",
					descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus cursus interdum. Vivamus nec efficitur ex. Integer commodo sapien sed mattis venenatis. Duis nibh metus, convallis ut imperdiet ac, maximus eu velit. Suspendisse potenti. Nullam tristique sagittis auctor. Aenean viverra condimentum varius. Maecenas elementum erat quis mi consectetur, at vehicula augue laoreet."
				});*/
				
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