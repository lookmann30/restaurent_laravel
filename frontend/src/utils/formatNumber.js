import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  if(number % 1 != 0) return numeral(number / 100).format('0.0%');
  else return numeral(number / 100).format('0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fSocialNumber(number, decimal=true, str="") {
  // if (number >= 1000 && number <10000) return numeral(number).format('0.0a')
  if(number >= 1000) {
    if(decimal){
      return numeral(number).format('0.0'+str+'a').toString().toUpperCase();
    } else {
      return numeral(number).format('0'+str+'a').toString().toUpperCase();
    }
  }
  // else if(number >= 1000) return numeral(number).format('0.0 a')
  else return number
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
