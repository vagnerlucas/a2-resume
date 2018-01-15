import { Injectable } from '@angular/core';

@Injectable()
export class WriterService {

  private writing = false;

  public isWriting = () => {
    return this.writing;
  }

  public writeToElement(element: any, text: string, timeout: number = 25, clearText: boolean = true, skipAnimation = false): WriterService {
    const el = document.getElementById(element);

    if (el == null || el === undefined) {
      return this;
    }

    if (clearText) {
      el.innerHTML = '';
    }

    if (!skipAnimation) {
      if (this.writing) {
        return this;
      } else {
        this.writing = true;
      }
    }

    text.split('').forEach((s, i) => {
      setTimeout(() => {
        if (s === '\n') {
          s = '<br>';
        }
        el.innerHTML += s;
      }, i * timeout);
    });

    setTimeout(() => {
      this.writing = false;
    }, timeout * text.length + 50);

    return this;
  }
}
