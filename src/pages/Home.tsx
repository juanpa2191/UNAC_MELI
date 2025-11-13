import React from "react";
import type { Product } from "../types/Products";
import ProductForm from "../components/ProductForm";
import Button from "../components/Button";
import ProductList from "../components/ProductList";


const Home: React.FC = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState<Product | undefined>();

    const handleCreate = () => {
        setEditingProduct(undefined);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setEditingProduct(undefined);
        window.location.reload();
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(undefined);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-yellow-400 py-4 shadow-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Mercado Libre</h1>
                    <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white rounded">
                        Agregar Producto
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {showForm ? 
                    (
                        <ProductForm
                            product={editingProduct}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    )
                    : 
                    (
                        <ProductList onEdit={handleEdit} />
                    )
                }
                
            </main>

        </div>
    );

};

export default Home;