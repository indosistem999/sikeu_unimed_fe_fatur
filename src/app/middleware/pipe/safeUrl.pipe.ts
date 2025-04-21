import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safeUrl',
    standalone: true
})
export class SafeUrlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string, type: 'url' | 'resourceUrl' = 'url'): SafeUrl | any {
        if (type === 'url') {
            return this.sanitizer.bypassSecurityTrustUrl(value);
        } else {
            return this.sanitizer.bypassSecurityTrustResourceUrl(value);
        }
    }
}
