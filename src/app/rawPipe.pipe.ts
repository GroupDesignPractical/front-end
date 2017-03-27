import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rawPipe' })
export class RawPipe implements PipeTransform {
    transform(value: string, args: string[]): string {
        return value;
    }
}
