//IF YOU CHOOSE TO COMPLETE THE MISSING DATES
IF $(vAutoCompletar) = 1 THEN

  //table with the start and end date
  [CAL_TEMP_1]:
  LOAD Distinct 
     MIN(Num([$(vCampoDataOrigem)])) as INICIO
    ,MAX(Num([$(vCampoDataOrigem)])) as FIM
  Resident [$(vTabelaOrigem)]
  Where NOT IsNull([$(vCampoDataOrigem)]);

  //VERIFY IF THERE ARE DATES TO PROCESS
  IF NoOfRows('CAL_TEMP_1') > 0 THEN
  
    //getting the start and end date of the calendar
    LET vMinDate = peek('INICIO', 0, 'CAL_TEMP_1');
    LET vMaxDate = peek('FIM', 0, 'CAL_TEMP_1');

    //generating all dates between the start and end date
    [CAL_TEMP_2]:
    LOAD $(vMinDate) + IterNo() -1 AS [D] AutoGenerate 1
    While( $(vMinDate) + IterNo() -1 ) <= $(vMaxDate);
  
  ENDIF;
  
  Drop Table [CAL_TEMP_1];

//IF YOU DID NOT CHOOSE TO COMPLETE THE MISSING DATES
ELSE	 
 
  //getting the start and end date of the calendar
  [CAL_TEMP_2]:
  LOAD [$(vCampoDataOrigem)] AS [D]
  Resident [$(vTabelaOrigem)]
  Where NOT IsNull([$(vCampoDataOrigem)]);

END IF;

//generating the final calendar table
[$(vTabelaDestino)]:
LOAD 
   NULL() as [$(vCampoDataDestino)]
  ,NULL() as [Date]
  ,NULL() as [Year]
  ,NULL() as [Bimester]
  ,NULL() as [Quarter]
  ,NULL() as [FourMonths]
  ,NULL() as [Semester]
  ,NULL() as [Month]
  ,NULL() as [MonthName]
  ,NULL() as [MonthStart]
  ,NULL() as [MonthEnd]
  ,NULL() as [Day]
  ,NULL() as [WeekDay]
  ,NULL() as [NetWorkDay]
  ,NULL() as [Week]
  ,NULL() as [WeekName]
AutoGenerate 0;

IF NoOfRows('CAL_TEMP_2') > 0 THEN

  [$(vTabelaDestino)]:
  LOAD Distinct 
     [D] as [$(vCampoDataDestino)]
    ,Date([D]) as [Date]
    ,Num(Year([D]), '0000')	as [Year]
    ,Ceil(Num(Month([D]))/2) as [Bimester]
    ,Ceil(Num(Month([D]))/3) as [Quarter]
    ,Ceil(Num(Month([D]))/4) as [FourMonths]
    ,Ceil(Num(Month([D]))/6) as [Semester]
    ,Month([D]) as [Month]
    ,MonthName([D]) as [MonthName]
    ,if( Date([D]) = MonthStart([D]), 1, 0)	as [MonthStart]
    ,if( Date([D]) = MonthEnd([D]), 1, 0)	as [MonthEnd]
    ,Num(Day([D]), '00') as [Day]
    ,WeekDay([D]) as [WeekDay]
    ,NetWorkDays([D], [D]) as [NetWorkDay]
    ,Num(Week([D]), '00') as [Week]
    ,WeekName([D]) as [WeekName]
  Resident [CAL_TEMP_2];
  Drop Table [CAL_TEMP_2];

ENDIF;

//clearing the configuration variables
LET vTabelaOrigem     = '';
LET vCampoDataOrigem  = '';
LET vTabelaDestino    = '';
LET vCampoDataDestino = '';
LET vAutoCompletar    = '';  
