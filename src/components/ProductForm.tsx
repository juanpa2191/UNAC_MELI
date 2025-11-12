import { useState } from "react";
import type { Product } from "../types/Products";
import { createProduct, updateProduct } from "../utils/api";
import Input from "./Input";
import Textarea from "./Textarea";


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

            </form>

        </div>

        );
};
