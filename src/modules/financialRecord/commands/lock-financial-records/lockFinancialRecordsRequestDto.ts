import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  IsInt,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';


export class LockFinancialRecordsRequestDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs of financial records to lock',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  readonly financialRecordIds: string[];
}
