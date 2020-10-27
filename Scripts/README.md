# Scripts
Multpurpose Qlik Sense and Qlik View Scripts

## Create a Calendar Table from another Table.
Create a master calendar from another table dynamically.\
[See This Project](AutomaticCalendar)

**Instructions**

This script gets the dates from a 'Resident' table, therefore, the source table must be in memory.

1. Include the *AutomaticCalendar.inc* file in the script after loading the table containing the dates that will be used as the basis for generating the calendar table;
2. Configure the source and destination parameters (see examples below).

**Parâmetros:**

- *vTableTable* - Name of the 'Resident' table that contains the date field;
- *vCampoDataOrigem* - Name of the 'Resident' table field that contains the dates;
- *vTabelaDestino* - Name of the final calendar table;
- *vCampoDataDestino* - Name of the 'Key' field of the final calendar table;
- *vAutoCompletar* - Fill the missing dates (0 - Do not complete | 1 - Complete).

**Usage:**

```
LET vTabelaOrigem     = 'FACT_TABLE_NAME';
LET vCampoDataOrigem  = 'DATE_FIELD_NAME';
LET vTabelaDestino    = 'CALENDAR_TABLE_NAME';
LET vCampoDataDestino = 'DATE_FIELD_NAME';
LET vAutoCompletar    = 0;  

$(Include=LibName/CalendarioMestre.inc);

Store [CALENDAR_TABLE_NAME] into [lib://LibName/Folder/MastarCalendar.qvd](qvd);
Drop Field [CALENDAR_TABLE_NAME];
```

**Result**

![Resulte Data](img/AutomaticCalendar.PNG)
