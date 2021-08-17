import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, args1: number, args2?: string): string {
        let limit = !args1 ? 100 : args1;
        let trail = !args2 ? '...' : args2;

        return value && value.length > limit ? value.substring(0, limit) + trail : value;
    }
}