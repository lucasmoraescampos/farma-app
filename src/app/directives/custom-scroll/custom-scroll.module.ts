import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomScrollDirective } from './custom-scroll.directive';

@NgModule({
    declarations: [CustomScrollDirective],
    imports: [
        CommonModule
    ],
    exports: [CustomScrollDirective],
})
export class CustomScrollModule { }