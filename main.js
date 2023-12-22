class ProductManager {
    constructor() {
      this.products = [];
      this.productId = 1; 
    }
  
    addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;
  
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Los campos son obligatorios');
      }
  
      const codigoExistente = this.products.some((prod) => prod.code === code);
      if (codigoExistente) {
        console.log('El código ya existe');
      }
  
      const newProduct = {
        id: this.productId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      this.productId++; 
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((prod) => prod.id === id);
      if (product) {
        return product;
      } else {
        console.log('Producto no encontrado');
      }
    }
  }