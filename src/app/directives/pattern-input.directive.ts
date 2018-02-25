import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

const charTypes = {
  d: /\d/
};

@Directive({
  selector: '[appPatternInput]'
})
export class PatternInputDirective implements OnInit {
  @Input() appPatternInput: string;

  private input: HTMLInputElement;
  private previousValue: string;

  private pattern: Array<RegExp | string>;

  constructor(el: ElementRef) {
    this.input = el.nativeElement;
  }

  ngOnInit(): void {
    this.pattern = this.parsePattern(this.appPatternInput);
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const position = this.input.selectionStart;

    // console.log(this.input.value, event.key, this.input.selectionStart);
    console.log('keypress', event);

    return true;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log('keydown', event);

    return true;
  }

  @HostListener('input', ['$event'])
  onInput(event) {
    this.previousValue = this.input.value;

    console.log('input', this.input.value, event);

    if (this.input.value === '1') {
      this.input.value = '';
    }
    return true;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    console.log('paste', this.input.value, event);
    return true;
  }

  private parsePattern(patternString: string) {
    return patternString.split('').map(char => {
      return charTypes.hasOwnProperty(char) ? charTypes[char] : char;
    });
  }

  private validate(value: string, pattern: Array<RegExp | string>): boolean {
    if (value.length > pattern.length) {
      return false;
    }

    return value
      .split('')
      .every((char, index) => this.validateChar(char, pattern[index]));
  }

  private validateChar(char: string, patternToken: RegExp | string): boolean {
    return true;
    /*if (patternToken instanceof RegExp) {
    }*/
  }
}
