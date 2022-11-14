import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateAddressDto {
    
  @MinLength(1)
  @IsString()
  encodedKey: string;

  @MinLength(1)
  @IsString()
  parentKey: string;

  @MinLength(1)
  @IsString()
  line1: string;

  @MinLength(1)
  @IsString()
  line2: string;

  @MinLength(1)
  @IsString()
  city: string;

  @MinLength(1)
  @IsString()
  region: string;

  @MinLength(1)
  @IsString()
  postcode: string;

  @MinLength(1)
  @IsString()
  country: string;

  @Min(1)
  @IsInt()
  indexInList: number;
}
