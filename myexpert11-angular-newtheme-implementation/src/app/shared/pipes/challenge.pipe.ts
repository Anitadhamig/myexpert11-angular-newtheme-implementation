import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'challengeFilter'
})
export class ChallengeFilterPipe implements PipeTransform {
    transform(items: any, win: string, pay: string, size: string) {
        if (items && items.length &&(win||pay||size)) {
            return items.filter(item => {
                if (win) {
                   
                    var win_amount = this.stringToArray(win);
                    if (win_amount.length > 1) {
                        if (win_amount[0] >= item.win_amount  || item.win_amount >= win_amount[1])
                            return false;
                    } else {
                        if (win_amount[0] != item.win_amount)
                            return false;
                    }

                }
                if (pay) {
                    var entryfee = this.stringToArray(pay);
                    if (entryfee.length > 1) {
                        if (entryfee[0] >= item.entryfee || item.entryfee >= entryfee[1])
                            return false;
                    } else {
                        if (entryfee[0] != item.entryfee)
                            return false;
                    }

                }
                if (size) {
                    var maximum_user = this.stringToArray(size);
                    if (maximum_user.length > 1) {
                        if (maximum_user[0] >= item.maximum_user || item.maximum_user >= maximum_user[1])
                            return false;
                    } else {
                        if (maximum_user[0] != item.maximum_user)
                            return false;
                    }


                }
                return true;
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