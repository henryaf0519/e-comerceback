// src/products/dto/create-product.dto.ts

// Importamos decoradores para validación (se instalarán en el siguiente paso)
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString() // Asegura que 'name' sea un string
  @IsNotEmpty() // Asegura que 'name' no esté vacío
  @MaxLength(255) // Limita la longitud del string
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber() // Asegura que 'price' sea un número
  @Min(0) // Asegura que el precio sea al menos 0
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
