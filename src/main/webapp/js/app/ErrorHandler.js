export function ErrorHandler (errorObject){
	return {
		publishErrors : function() {
			for(var index in errorObject.errors){				
				var error = errorObject.errors[index];				
				PubSub.publish("validation-errors-"+error.field,error.defaultMessage);
			}
		}
	};
}