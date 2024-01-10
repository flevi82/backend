const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./productos.json";
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Los campos son obligatorios');
            return;
        }
    
        try {
            
            if (await fs.access(this.path).then(() => true).catch(() => false)) {
                const fileContent = await fs.readFile(this.path, 'utf8');
                products = JSON.parse(fileContent);
            }
    
            const newProduct = {
                id: this.products.length + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
    
            this.products.push(newProduct);
    
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log('Producto agregado exitosamente:', newProduct);
        } catch (error) {
            console.error('Error al agregar el producto', error);
        }
    }
    async getProducts() {
        try {
            const fileContent = await fs.readFile(this.path, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error al obtener los productos', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id);
        } catch (error) {
            console.error('Error al obtener el producto por ID', error);
            return null;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedFields };
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                return products[index];
            }
            throw new Error('Producto no encontrado');
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            throw new Error('No se pudo actualizar el producto');
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error('Error al eliminar el producto', error);
            throw new Error('No se pudo eliminar el producto');
        }
    }


}


