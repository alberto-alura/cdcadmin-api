var ErrorHandler = function(errorObject){
	return {
		publishErrors : function() {
			for(index in errorObject.errors){				
				var error = errorObject.errors[index];				
				PubSub.publish("validation-errors-"+error.field,error.defaultMessage);
			}
		}
	};
}