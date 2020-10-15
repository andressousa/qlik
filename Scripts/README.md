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
	
## Custom Report
Custom table export using default simple or pivot table.

You can download a [demo app here](CustomREport/CustomReport.qvf).

Step 1. Create a linine table with all dimensions to show

Step 2. Create a linine table with all measures to show

Step 3. Insert a single or pivot table in a sheet

Step 4. Include the dimensions and measures you want to show into table

Step 5. For each dimension and measure:
	
	- Go to column properties
	- Set the show condition like the example:
    
      e.g. IF(GetSelectedCount([Dimension]) = 0, 0, SubStringCount('|' & Concat([Dimension], '|') & '|', '1 - Year'))
      e.g. IF(GetSelectedCount([Measure]) = 0, 0, SubStringCount('|' & Concat([Measure], '|') & '|', '2 - Total Days'))
      
      In this example, I used the field 'Dimension' from inline dimension table and '1 - Year' value.
      This condition must be used in 'Year' dimension column.

Step 6. Optional - Insert a Calculation Condition.
	
	e.g. IF( GetSelectedCount([Dimension]) > 0 or GetSelectedCount([Measure]) > 0, 1, 0 )

Note:
1. The number in each dimension and measure are to prevent conflicts when similar names;
2. You may use a spreadsheet to create dimension and measure tables; Change inline to load statement;
