# Utils
- Qlik multipurpose functions.

## Text Functions
- Remove Accent - Replace accentuation from words. 
  - eg. André -> Andre
- Slugfy - Turn single text into slug text.
  - eg. André Santos -> andre-santos

**Usage**
1. Include script into yout app using *$(Include=filename)* or copy its content;
2. In load script, call the function *$(removeAcentos(FIELD_NAME)) AS FIELD_NAME*;
