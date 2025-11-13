import { useState } from "react";
import type { Product } from "../types/Products";
import { createProduct, updateProduct } from "../utils/api";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";


interface ProductFormProps {
    product?: Product;
    onSave: () => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price.toString() || '',
        category: product?.category || '',
        image: product?.image || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image || undefined
        };

        if (product) {
            updateProduct(product.id, productData);
        }else {
            createProduct(productData);
        }
        onSave();
    };
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
                {product ? "Editar Producto" : "Crear Nuevo Producto"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre:
                    </label>
                    <Input
                        type="text"
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                        placeholder="Nombre del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripcion:
                    </label>
                    <Textarea
                        value={formData.description}
                        onChange={handleChange('description')}
                        required
                        placeholder="Descripcion del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio:
                    </label>
                    <Input
                        type="number"
                        value={formData.price}
                        onChange={handleChange('price')}
                        required
                        placeholder="0.00"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria:
                    </label>
                    <Input
                        type="text"
                        value={formData.category}
                        onChange={handleChange('category')}
                        required
                        placeholder="Categoria del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Url de imagen (opcional):
                    </label>
                    <Input
                        type="text"
                        value={formData.image}
                        onChange={handleChange('image')}
                        placeholder="https://"
                    />
                </div>

                <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                        {product ? "Actualizar" : "Crear"}
                    </Button>
                    <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
                        Cancelar
                    </Button>
                </div>
            </form>

        </div>

        );
};

export default ProductForm;
