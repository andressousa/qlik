/**
	ÍNDICE

	- Máscara para CPF
	- Máscara para CNPJ
	- Máscara para TELEFONE 8 ou 9 Dígitos com DDD

*/



/**
	Máscara para CPF
    
    - Complementa com zeros a equerda caso a quantidade de dígito seja menor que 11.
    - Não efetua validação de CPF.
    
    Uso: 	$(vMascaraCPF([NUMERO_CPF]))
    Entrada: 	$(vMascaraCPF('12345678912'))
    Saída: 	123.456.789-12
*/
SET vMascaraCPF = "IF( Len( Trim( $1 ) ) = 11, Left( $1, 3 ) & '.' & Mid( $1, 4, 3 ) & '.' & Mid( $1, 7, 3 ) & '-' & Left( $1, 2 ), Left( Num( $1, '00000000000' ), 3 ) & '.' & Mid( Num( $1, '00000000000' ), 4, 3 ) & '.' & Mid( Num( $1, '00000000000' ), 7, 3 ) & '-' & Left( Num( $1, '00000000000' ), 2 ) )";



/**
	Máscara para CNPJ
    
    - Complementa com zeros a equerda caso a quantidade de dígito seja menor que 14.
    - Não efetua validação de CNPJ.
    
    Uso: 	$(vMascaraCNPJ([NUMERO_CNPJ]))
    Entrada: 	$(vMascaraCNPJ('12345678912345'))
    Saída: 	12.345.678.9123-45
*/
SET vMascaraCNPJ = "IF( Len( Trim( $1 ) ) = 14, Left($1, 2) & '.' & Mid($1, 3, 3) & '.' & Mid($1, 6, 3) & '/' & Mid($1, 9, 4) & '-' &  Right($1, 2), Left( Num( $1, '00000000000000' ), 2 ) & '.' & Mid( Num( $1, '00000000000000' ), 3, 3 ) & '.' & Mid( Num( $1, '00000000000000' ), 6, 3 ) & '/' & Mid( Num( $1, '00000000000000' ), 9, 4 ) & '-' &  Right( Num( $1, '00000000000000' ), 2 ) )";



/**
	Máscara para TELEFONE 8 ou 9 Dígitos com DDD
    
    - Verifica se o número de telefone tem 8 ou 9 dígitos.
    
    Uso: 	$(vMascaraTelefone([NUMERO_DDD], [NUMERO_TELEFONE]))
    Entrada: 	$(vMascaraTelefone(81, 12345678))
    Saída: 	(81) 1234-5678
    Entrada: 	$(vMascaraTelefone(81, 123456789))
    Saída: 	(81) 1 2345-6789
*/
SET vMascaraTelefone = "'(' & $1 & ') ' & if( len( $2 ) = 8, left( $2, 4) & '-' & right( $2, 4),  if( len( $2 ) = 9, left( $2, 1) & ' ' & mid( $2, 2, 4) & '-' & right( $2, 4 ) ) )";



