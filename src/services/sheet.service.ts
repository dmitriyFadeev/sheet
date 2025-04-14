import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');

@Injectable()
export class SheetService {
  async writeData(): Promise<string> {
    const data = await fetch(process.env.URL)
    const json = await data.json() as FetchResponseData[]

    const googleSheetPageBA = 'ВА';  
    const googleSheetPageB = 'Б';
    const headRange = 'G2:BB4'
    const bodyRange = 'G8:BB10'

    const auth = await this.getAuth()

    const sheetInstance = await google.sheets({ version: 'v4', auth});

    const bDataB1 = []
    const bDataB2 = []
    const bDataB3 = []

    const baDataBA1 = []
    const baDataBA2 = []
    const baDataBA3 = []

    json.forEach(elem=>{
      switch(elem.ObjectName){
        case 'Б1': 
          bDataB1.push(elem)
          break
        case 'Б2': 
          bDataB2.push(elem)
          break
        case 'Б3': 
          bDataB3.push(elem)
          break
        case 'ВА1': 
          baDataBA1.push(elem)
          break
        case 'ВА2': 
          baDataBA2.push(elem)
          break
        case 'ВА3': 
          baDataBA3.push(elem)
          break
      }
    })

    const headData = []
    const bBodyData = []
    const baBodyData = []

    const yearData = []
    const monthData = []
    const planFactData = []

    const minYear = bDataB1[0].Year
    const maxYear = bDataB1[bDataB1.length-1].Year

    let bDataB1Iter = 0
    let bDataB2Iter = 0
    let bDataB3Iter = 0

    let baDataBA1Iter = 0
    let baDataBA2Iter = 0
    let baDataBA3Iter = 0

    const bDataB1Values = []
    const bDataB2Values = []
    const bDataB3Values = []

    const baDataBA1Values = []
    const baDataBA2Values = []
    const baDataBA3Values = []

    for(let year = minYear; year <= maxYear; year++){
      for(let month = 1; month <= 12; month++){
        yearData.push(year)
        yearData.push(year)
        monthData.push(month)
        monthData.push(month)
        planFactData.push('План')
        planFactData.push('Факт')

        if(bDataB1[bDataB1Iter] && bDataB1[bDataB1Iter].Month === month){
          bDataB1Values.push(bDataB1[bDataB1Iter].Plan ? bDataB1[bDataB1Iter].Plan : 0)
          bDataB1Values.push(bDataB1[bDataB1Iter].Fact ? bDataB1[bDataB1Iter].Fact : 0)
          bDataB1Iter++
        }
        else{
          bDataB1Values.push(0)
          bDataB1Values.push(0)
        }

        if(bDataB2[bDataB2Iter] && bDataB2[bDataB2Iter].Month === month){
          bDataB2Values.push(bDataB2[bDataB2Iter].Plan ? bDataB2[bDataB2Iter].Plan : 0)
          bDataB2Values.push(bDataB2[bDataB2Iter].Fact ? bDataB2[bDataB2Iter].Fact : 0)
          bDataB2Iter++
        }
        else{
          bDataB2Values.push(0)
          bDataB2Values.push(0)
        }

        if(bDataB3[bDataB3Iter] && bDataB3[bDataB3Iter].Month === month){
          bDataB3Values.push(bDataB3[bDataB3Iter].Plan ? bDataB3[bDataB3Iter].Plan : 0)
          bDataB3Values.push(bDataB3[bDataB3Iter].Fact ? bDataB3[bDataB3Iter].Fact : 0)
          bDataB3Iter++
        }
        else{
          bDataB3Values.push(0)
          bDataB3Values.push(0)
        }

        if(baDataBA1[baDataBA1Iter] && baDataBA1[baDataBA1Iter].Month === month){
          baDataBA1Values.push(baDataBA1[baDataBA1Iter].Plan ? baDataBA1[baDataBA1Iter].Plan : 0)
          baDataBA1Values.push(baDataBA1[baDataBA1Iter].Fact ? baDataBA1[baDataBA1Iter].Fact : 0)
          baDataBA1Iter++
        }
        else{
          baDataBA1Values.push(0)
          baDataBA1Values.push(0)
        }

        if(baDataBA2[baDataBA2Iter] && baDataBA2[baDataBA2Iter].Month === month){
          baDataBA2Values.push(baDataBA2[baDataBA2Iter].Plan ? baDataBA2[baDataBA2Iter].Plan : 0)
          baDataBA2Values.push(baDataBA2[baDataBA2Iter].Fact ? baDataBA2[baDataBA2Iter].Fact : 0)
          baDataBA2Iter++
        }
        else{
          baDataBA2Values.push(0)
          baDataBA2Values.push(0)
        }

        if(baDataBA3[baDataBA3Iter] && baDataBA3[baDataBA3Iter].Month === month){
          baDataBA3Values.push(baDataBA3[baDataBA3Iter].Plan ? baDataBA2[baDataBA3Iter].Plan : 0)
          baDataBA3Values.push(baDataBA3[baDataBA3Iter].Fact ? baDataBA3[baDataBA3Iter].Fact : 0)
          baDataBA3Iter++
        }
        else{
          baDataBA3Values.push(0)
          baDataBA3Values.push(0)
        }
      }
    }

    headData.push(yearData)
    headData.push(monthData)
    headData.push(planFactData)

    bBodyData.push(bDataB1Values)
    bBodyData.push(bDataB2Values)
    bBodyData.push(bDataB3Values)

    baBodyData.push(baDataBA1Values)
    baBodyData.push(baDataBA2Values)
    baBodyData.push(baDataBA3Values)

    const updateHeadDataBA = {
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      sheetInstance,
      values: headData,
      googleSheetPage: googleSheetPageBA,
      range: headRange
    }

    const updateHeadDataB = {
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      sheetInstance,
      values: headData,
      googleSheetPage: googleSheetPageB,
      range: headRange
    }

    const updateBodyDataBA = {
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      sheetInstance,
      values: baBodyData,
      googleSheetPage: googleSheetPageBA,
      range: bodyRange
    }

    const updateBodyDataB = {
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      sheetInstance,
      values: bBodyData,
      googleSheetPage: googleSheetPageB,
      range: bodyRange
    }
    
    await this.updateSheet(updateHeadDataBA)
    await this.updateSheet(updateHeadDataB)

    await this.updateSheet(updateBodyDataBA)
    await this.updateSheet(updateBodyDataB)

    return 'OK';
  }

  async getAuth(): Promise<unknown> {
    const clientEmail = process.env.EMAIL;
    const privateKey = process.env.PRIVATE_KEY;

    const googleAuth = new google.auth.JWT(
      clientEmail,
      null,
      privateKey.replace(/\\n/g, '\n'),
      'https://www.googleapis.com/auth/spreadsheets'
    );

    return googleAuth
  }

  async updateSheet(data: UpdateSheetData): Promise<void> {
    await data.sheetInstance.spreadsheets.values.update({
      auth: data.auth,
      spreadsheetId: data.spreadsheetId,
      range: `${data.googleSheetPage}!${data.range}`,
      valueInputOption: 'RAW',
      resource: {
        values: data.values,
      },
    });
  }
}
