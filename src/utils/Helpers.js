
/**
* Global helpers
*/

export function slugify(str) {

	if(str){
    	str = str.toLowerCase().replace(/ /g, '-').replace(/:/g,'-').replace(/&/g,'-').replace(/--/g,'-');
    	str = str.replace(/--/g,'-');
    	return str;
	}else{
		return str;
	}
}

