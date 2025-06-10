import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  }> = [];

  create(createProductDto: CreateProductDto) {
    const newProduct = { id: Date.now().toString(), ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    // Generar productos de prueba si la lista está vacía
    if (this.products.length === 0) {
      for (let i = 1; i <= 5; i++) {
        this.products.push({
          id: i.toString(),
          name: `Producto ${i}`,
          description: `Descripción del producto ${i}`,
          price: Math.floor(Math.random() * 100) + 1,
          stock: Math.floor(Math.random() * 50) + 1,
        });
      }
    }
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex > -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updateProductDto,
      };
      return this.products[productIndex];
    }
    return null;
  }

  remove(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
