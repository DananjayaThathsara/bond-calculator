import { Module } from '@nestjs/common';
import { BondController } from './bond.controller';
import { BondService } from './bond.service';

@Module({
  controllers: [BondController],
  providers: [BondService],
  exports: [BondService],
})
export class BondModule {}
