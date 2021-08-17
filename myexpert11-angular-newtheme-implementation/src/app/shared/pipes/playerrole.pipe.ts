import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'playerrole',
    pure: false
})
export class PlayerrolePipe implements PipeTransform {
    transform(items: any, playerrole: string) {
        if (items && items.length &&(playerrole)){
            return items.filter(item => {
				if(playerrole==item.role || playerrole=='fall'){
					return true;
				}else{
					return false;
				}
            })
        }
        else {
            return items;
        }
    }

    stringToArray(options) {
        options = (typeof options == "string" && options.indexOf("-") >= 0) ? options.split("-") : options.split(" ");
        if(options.length>1) {
            parseInt(options[0]);
            parseInt(options[1]);
        }else{
            parseInt(options[0]);
        }
        return options
    }
}