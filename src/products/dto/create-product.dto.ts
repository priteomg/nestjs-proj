import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonlydescription?: string;

  @IsNumber()
  readonly price: number;
}
