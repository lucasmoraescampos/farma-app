import { Directive } from '@angular/core';

@Directive({
  selector: '[customScroll]',
  host: {
  }
})
export class CustomScrollDirective {

  constructor() { }

  ngAfterViewInit() {

    const elements = document.getElementsByTagName('ion-content');

    const elmt = elements[elements.length - 1];

    const stylesheet = `
      @media (pointer: fine) {
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: var(--ion-color-light-shade);
        }
      }
    `;

    const styleElmt = elmt.shadowRoot.querySelector('style');

    if (styleElmt) {
      styleElmt.append(stylesheet);
    }
    
    else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      elmt.shadowRoot.appendChild(barStyle);
    }

  }

}
