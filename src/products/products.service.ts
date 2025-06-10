
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';


@Injectable()

export class ProductsService implements OnModuleInit {
  private products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  }> = [];


  // Saves a new product in memory
  create(createProductDto: CreateProductDto) {
    const newProduct = { id: Date.now().toString(), ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  // Returns all products, generating examples when empty
  findAll() {
    // Generar productos de prueba si la lista está vacía

    if (this.products.length === 0) {
      for (let i = 1; i <= 5; i++) {
        const product: Product = {
          id: i.toString(),
          name: `Producto ${i}`,
          description: `Descripción del producto ${i}`,
          price: Math.floor(Math.random() * 100) + 1,
          stock: Math.floor(Math.random() * 50) + 1,
        };
        this.products.push(product);
      }
    }
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = { id: Date.now().toString(), ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  // Finds a product by id
  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // Updates an existing product
  update(id: string, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException('Product not found');

    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

  // Deletes a product by id
  remove(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    this.products.splice(productIndex, 1);
  }
}
