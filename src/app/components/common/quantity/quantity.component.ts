import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent implements OnInit {

  @Input() max: number = 999999999999999;

  @Input() min: number = 0;

  @Input() value: number = 0;

  @Input() lines: boolean = false;

  @Input() disabled: boolean = false;

  @Output() changeQty = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  public add() {

    if (this.max === null || this.value < this.max) {

      this.value++;

      this.changeQty.emit({
        qty: this.value,
        type: 'add'
      });

    }

  }

  public remove() {

    if (this.min !== null && this.value > this.min) {

      this.value--;

      this.changeQty.emit({
        qty: this.value,
        type: 'remove'
      });

    }

  }

}