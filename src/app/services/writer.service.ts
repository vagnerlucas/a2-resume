import { Injectable } from '@angular/core';

@Injectable()
export class WriterService {

  private writing = false;
	
	public isWriting = () => { 
		return this.writing;
	}
	
	public writeToElement(element: any, text: string, timeout: number, clearText?: boolean) {
		
		var el = document.getElementById(element);
		if (el == null || el === undefined)
			return;
			
		clearText = clearText || false;
		
		if (clearText)
			el.innerHTML = '';
		
		if (this.writing)
			return;
		else
			this.writing = true;
					
		timeout = timeout || 50;
		text.split('').forEach(function(s, i) {
			setTimeout(function() { 
				if (s === '\n')
					s = '<br>';
				el.innerHTML += s;
			}, i * timeout);
		});
		
		setTimeout(() => {
			this.writing = false;
		}, timeout * text.length + 50);
	}
}
