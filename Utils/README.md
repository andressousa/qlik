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


## Date Functions
- Bimestre. 
  - eg. $(dataBimestre('01/01/2020')) -> 1
  - eg. $(dataBimestre('01/02/2020')) -> 1
  - eg. $(dataBimestre('01/03/2020')) -> 2
  - eg. $(dataBimestre('01/04/2020')) -> 2
  - eg. $(dataBimestre('01/05/2020')) -> 3
  - eg. $(dataBimestre('01/06/2020')) -> 3
  - eg. $(dataBimestre('01/07/2020')) -> 4
  - eg. $(dataBimestre('01/08/2020')) -> 4
  - eg. $(dataBimestre('01/09/2020')) -> 5
  - eg. $(dataBimestre('01/10/2020')) -> 5
  - eg. $(dataBimestre('01/11/2020')) -> 6
  - eg. $(dataBimestre('01/12/2020')) -> 6
- Trimestre
  - eg. $(dataTrimestre('01/01/2020')) -> 1
  - eg. $(dataTrimestre('01/02/2020')) -> 1
  - eg. $(dataTrimestre('01/03/2020')) -> 1
  - eg. $(dataTrimestre('01/04/2020')) -> 2
  - eg. $(dataTrimestre('01/05/2020')) -> 2
  - eg. $(dataTrimestre('01/06/2020')) -> 2
  - eg. $(dataTrimestre('01/07/2020')) -> 3
  - eg. $(dataTrimestre('01/08/2020')) -> 3
  - eg. $(dataTrimestre('01/09/2020')) -> 3
  - eg. $(dataTrimestre('01/10/2020')) -> 4
  - eg. $(dataTrimestre('01/11/2020')) -> 4
  - eg. $(dataTrimestre('01/12/2020')) -> 4
- Quadrimestre
  - eg. $(dataQuadrimestre('01/01/2020')) -> 1
  - eg. $(dataQuadrimestre('01/02/2020')) -> 1
  - eg. $(dataQuadrimestre('01/03/2020')) -> 1
  - eg. $(dataQuadrimestre('01/04/2020')) -> 1
  - eg. $(dataQuadrimestre('01/05/2020')) -> 2
  - eg. $(dataQuadrimestre('01/06/2020')) -> 2
  - eg. $(dataQuadrimestre('01/07/2020')) -> 2
  - eg. $(dataQuadrimestre('01/08/2020')) -> 2
  - eg. $(dataQuadrimestre('01/09/2020')) -> 3
  - eg. $(dataQuadrimestre('01/10/2020')) -> 3
  - eg. $(dataQuadrimestre('01/11/2020')) -> 3
  - eg. $(dataQuadrimestre('01/12/2020')) -> 3
- Semestre
  - eg. $(dataSemestre('01/01/2020')) -> 1
  - eg. $(dataSemestre('01/02/2020')) -> 1
  - eg. $(dataSemestre('01/03/2020')) -> 1
  - eg. $(dataSemestre('01/04/2020')) -> 1
  - eg. $(dataSemestre('01/05/2020')) -> 1
  - eg. $(dataSemestre('01/06/2020')) -> 1
  - eg. $(dataSemestre('01/07/2020')) -> 2
  - eg. $(dataSemestre('01/08/2020')) -> 2
  - eg. $(dataSemestre('01/09/2020')) -> 2
  - eg. $(dataSemestre('01/10/2020')) -> 2
  - eg. $(dataSemestre('01/11/2020')) -> 2
  - eg. $(dataSemestre('01/12/2020')) -> 2

**Usage**
1. Include script into yout app using *$(Include=filename)* or copy its content;
2. In load script, call the function *$(removeAcentos(FIELD_NAME)) AS FIELD_NAME*;
