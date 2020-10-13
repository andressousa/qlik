# Scripts
Qlik multipurpose scripts.

## Measures from file
Load measures from a sheet file and use into master items.

1. Fill and load the sheet file with measures (See the example [sheet file here](MeasuresFromFile/Expressions.xlsx)).
2. And set master items for each measure like this example
	- Expression: $(vVariableName_E)
	- Expression label: =vVariableName_T
	- Description: =vVariableName_D

![alt text](MeasuresFromFile/MasterItemMeasure.PNG)
	
