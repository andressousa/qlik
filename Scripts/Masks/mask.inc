/**
	ÍNDICE

	- Máscara para CPF

*/



/**
	Máscara para CPF
    
    - Complementa com zeros a equerda caso a quantidade de dígito seja menor que 11.
    - Não efetua validação de CPF.
    
    Uso: 		$(vMascaraCPF([NUMERO_CPF]))
    Entrada: 	$(vMascaraCPF('12345678912'))
    Saída: 		123.456.789-12
*/
SET vMascaraCPF = "IF( Len( Trim( $1 ) ) = 11, Left( $1, 3 ) & '.' & Mid( $1, 4, 3 ) & '.' & Mid( $1, 7, 3 ) & '-' & Left( $1, 2 ), Left( Num( $1, '00000000000' ), 3 ) & '.' & Mid( Num( $1, '00000000000' ), 4, 3 ) & '.' & Mid( Num( $1, '00000000000' ), 7, 3 ) & '-' & Left( Num( $1, '00000000000' ), 2 ) )";