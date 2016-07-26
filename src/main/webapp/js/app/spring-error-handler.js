var ErrorHandler = function(errorObject){
	return {
		findMessage : function(fieldName) {
			for(index in errorObject.errors){
				var error = errorObject.errors[index];
				if(error.field === fieldName){
					return error.defaultMessage;
				}
			}
			
			return "nao achou nada";
		}
	};
}