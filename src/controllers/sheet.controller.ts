import { Controller, Post } from '@nestjs/common';
import { SheetService } from '../services/sheet.service';

@Controller('/sheet')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Post('/write')
  async writeDataToSheet(): Promise<string> {
    try{
      const response = await this.sheetService.writeData();
      return response
    }
    catch(e){
      const error = e as Error
      return error.message
    }
  }
}
