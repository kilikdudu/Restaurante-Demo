

exports.request = function(params, cb){
	var xhr = Ti.Network.createHTTPClient();

	Ti.API.info("URL: " + params.url);
 	xhr.open(params.metodo, params.url);
 	xhr.setRequestHeader("Content-Type","application/json");
 	xhr.setRequestHeader("Authorization", 'Basic ' + Titanium.Utils.base64encode(Alloy.Globals.Constantes.API_KEY));

	xhr.onload = function() {
		Ti.API.info("Solicitação executada com sucesso, resposta: \n" + this.responseText);
		cb({
			sucesso: true, 
			mensagem: "",
			retorno: this.responseText && JSON.parse(this.responseText)
		});	
	};
	
	xhr.onerror = function(e) {
		Ti.API.info("Ocorreu um erro durante a solicitação, descrição: \n" + JSON.stringify(e));
		if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
			var dialog = Ti.UI.createAlertDialog({
				title : 'Atençao',
				message : 'Voce esta offline. Verifique sua conexao de rede.',
				buttonNames : ['Ir para configuraçoes de rede', 'Cancelar'],
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === 0) {
					if (OS_IOS)
						Ti.Platform.openURL('prefs:root=General&path=Network');
					else {
						var intent = Ti.Android.createIntent({
							action : "android.settings.NETWORK_OPERATOR_SETTINGS"
						});
						Ti.Android.currentActivity.startActivity(intent);
					}
				}
			});
			dialog.show();
			cb({
				sucesso : false,
				mensagem : "conexao"
			});
		} else {
			cb({
				status : false,
				mensagem : e.error,
				code: e.code
			});	
		}
		
	};
	
	if(params.args){
		Ti.API.info("Body da solicitação: " + params.args);
 		xhr.send(params.args);	
 	} else {
 		xhr.send();
 	}
};
