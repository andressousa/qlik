# Utils
- Qlik multipurpose functions.

## Text Functions
- Remove Accent - Replace accentuation from words. 
  - eg. $(removeAcentos(André)) -> Andre
- Slugfy - Turn single text into slug text.
  - eg. $(slugfy(André Santos)) -> andre-santos

## Masks
- CPF Mask - Make a brazilian CPF mask. 
  - eg. $(mascaraCPF(99999999999)) -> 999.999.999.99
- CNPJ Mask - Make a brazilian CPF mask. 
  - eg. $(mascaraCNPJ(99999999999999)) -> 99.999.999/9999-99

**Usage**
1. Include script into yout app using *$(Include=filename)* or copy its content;
2. In load script, call the function *$(removeAcentos(FIELD_NAME)) AS FIELD_NAME*;
