type UpdateSheetData = {
    auth:any,
    spreadsheetId: string,
    sheetInstance: any,
    values: ValuesData[],
    googleSheetPage: string,
    range: string
}

type ValuesData = string[]

type FetchResponseData = { 
    ObjectName: string, 
    Year: number, 
    Month: number, 
    Plan: number, 
    Fact: number 
}