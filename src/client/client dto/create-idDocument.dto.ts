import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateIdDocumentDto {

  @MinLength(1)
  @IsString()
  encodedKey: string;

  @MinLength(1)
  @IsString()
  clientKey: string;

  @MinLength(1)
  @IsString()
  documentType: string;

  @MinLength(1)
  @IsString()
  documentId: string;

  @MinLength(1)
  @IsString()
  issuingAuthority: string;
  
  @Min(1)
  @IsInt()
  indexInList: number;
}
