"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import "@/styles/liked.scss"; 
const Page = () => {
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("liked") || "[]");
        setLikedProducts(storedLikes);
    }, []);

    const removeFromLiked = (productId: number) => {
        const updatedLikes = likedProducts.filter((product) => product.id !== productId);
        setLikedProducts(updatedLikes);
        localStorage.setItem("liked", JSON.stringify(updatedLikes));
    };

    return (
        <div className="liked-products-page">
            <div className="header">
                <h1>❤️ Liked Products</h1>
                <Link href="/" className="back-link">⬅ Back to Products</Link>
            </div>

            {likedProducts.length === 0 ? (
                <p className="empty-message">No liked products yet.</p>
            ) : (
                <ul className="products-container">
                    {likedProducts.map((product) => (
                        <li className="product-card" key={product.id}>
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-info">
                                <h2 className="product-title">{product.title}</h2>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="product-actions">
                                <button className="unlike-button" onClick={() => removeFromLiked(product.id)}>❤️</button>
                                <button className="delete-button" onClick={() => removeFromLiked(product.id)}>🗑 Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Page;
