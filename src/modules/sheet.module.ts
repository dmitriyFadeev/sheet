import { Module } from '@nestjs/common';
import { SheetController } from '../controllers/sheet.controller';
import { SheetService } from '../services/sheet.service';

@Module({
  imports: [],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
