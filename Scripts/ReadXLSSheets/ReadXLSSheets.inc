//CONFIGURAR CONEXÃO COM ARQUIVO
LET vFilePath = 'C:\Users\User\Desktop\Planilha.xlsx';
ODBC CONNECT TO 'XLSDatabase;DBQ=$(vFilePath)';

//OBTÉM LISTA DE PASTAS
[TABLES]:
SQLTables;

//CONCATENA PASTAS EM VARIÁVEL
[SHEETS]:
LOAD Chr(39) & Concat( [TABLE_NAME], Chr(39) & ',' & Chr(39) ) & Chr(39)  AS SHEETS
Resident [TABLES];
LET vSheets = Replace( FieldValue('SHEETS', 1), '$', '');

Drop Tables [SHEETS], [TABLES];
DisConnect;


//CARGA DE DADOS DAS PASTAS
For Each vSheet in $(vSheets)

  [DADOS]:
  LOAD
  	'$(vSheet)' as Pasta,
    User,
    Data
  FROM [lib://XLSFolder/Database.xlsx]
  (ooxml, embedded labels, table is '$(vSheet)');

Next;
