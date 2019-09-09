var validators = {};
exports.validators = function() {
    return validators;
};

validators.RegexAlphaNumeric=function(txt){
    var isValid=false;
    var regex= /^[a-zA-Z0-9]*$/g;

    if(txt !== null && txt.trim() !== ""){
        if(txt.length >=3 && txt.length<=50 ) {
            if(regex.test(txt)==true){
                isValid=true;
            }
            else{
                isValid=false;
            }
        }
        return isValid;
    }
}


validators.RegexAlphaNumericWarranty=function(txt){
    var isValid = false;
    var regex= /([0-9a-zA-Z]){0,6}$/g;
    
    if(txt !== null && txt.trim() !== ""){
        if(txt.length <= 6 ) {
            if(regex.test(txt)==true){
                isValid=true;
            }
            else{
                isValid=false;
            }
        }
        return isValid;
    }
}

validators.RegexPrice = function(txt){
    var isValid = false;
    var regex = /([0-9])$/g;

    if(txt !== null && txt.trim() !== ""){
        if(txt.length <= 7){
            if(regex.test(txt) == true){
                isValid=true
            }
            else{
                isValid=false
            }
        }
        return isValid
    } 
}


validators.RegexPassword=function(txt){
    var isValid=false;
    var regex=/([0-9a-zA-Z])$/;

    if(txt !== null && txt.trim() !== ""){
        if(txt.length>8){
            if(regex.test(txt)==true){
                isValid=true;
            }
            else{
                isValid=false;
            }
        }
        return isValid;
    }
  
}

validators.RegexNames=function(txt){
    var isValid=false;
    var regex = /([a-zA-Z])$/g;
    console.log("Function called");
    if(txt !== null){
        
        if(regex.test(txt)==true){
            isValid=true;
            
        }
        else{
            isValid=false;
        }
    }
    
    return isValid;
}

validators.RegexEmail=function(txt){
    var isValid = false;
	var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	//var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	if (txt !== '' && txt !== null) {
		if (reg.test(txt) === false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
}

validators.RegexPhone=function(txt){
    var isValid = false;
    var regex=/^\d{10}$/;

    if(txt !== null && txt.trim() !== ""){
        if(regex.test(txt)==true){
            isValid = true;
        }
        else{
            isValid=false;
        }
    }
    return isValid;
}

validators.RegularExpressionMobileNumber = function(txt) {
	var isValid = false;
	var reg = /^\+?\d*$/;
	if (isNaN(txt) === false && txt !== null) {
		if (txt.length === 10) {
			if (txt.trim() !== '') {
				isValid = true;
			}
		}
	}

	return isValid;
};