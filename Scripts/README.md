# Scripts
- Qlik multipurpose scripts.

## Measures from file
- Load measures from a sheet file and use into master items.

	LOAD THE SHEET FILE EXAMPLE...
	> See the example [sheet file here](MeasuresFromFile/Expressions.xlsx).
	
	...AND CONFIGURE MASTER ITEM LIKE THIS EXAMPLE
	1. Expression: $(vCredit_E)
	2. Expression label: =vCredit_T
	3. Description: =vCredit_D
	
	![alt text](MeasuresFromFile/MasterItemMeasure.PNG)
	
