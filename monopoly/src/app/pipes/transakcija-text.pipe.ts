import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transakcijaText'
})

export class TransakcijaTextPipe implements PipeTransform {

  transform(value: String): String {
    const splitBy = ':'
    const splittedText = value.split( splitBy );

    if(value[0]=="-"){
      return `<b class="text-danger">$ ${splittedText[0]}</b> --> <b>${splittedText[1]}:</b> ${splittedText[2]}`
    }else{
      return `<b class='text-success'>$ ${splittedText[0]}</b> --> <b>${splittedText[1]}:</b> ${splittedText[2]}`
    }
  }

}
