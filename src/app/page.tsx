"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import Loader from "@/components/Loader";
import "../styles/products.scss";
import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });

    const storedLikes = JSON.parse(localStorage.getItem("liked") || "[]");
    setLikedProducts(storedLikes);
  }, []);

  const addToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Product added to Buy page!");
  };

  const toggleLike = (product: Product) => {
    let updatedLikes;
    if (likedProducts.some((p) => p.id === product.id)) {
      updatedLikes = likedProducts.filter((p) => p.id !== product.id);
    } else {
      updatedLikes = [...likedProducts, product];
    }
    setLikedProducts(updatedLikes);
    localStorage.setItem("liked", JSON.stringify(updatedLikes));
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div className="new">
      <div className="insear">
        <div style={{ padding: "20px" }}>
          <h1 className="title">🛒 Products</h1>
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <select className="sort-select" onChange={(e) => setSort(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <div className="likes">
          <Link id="like" href="/liked">❤️ Liked</Link>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ul className="products-container">
          {filteredProducts.map((product) => (
            <li className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">💰 {product.price} USD</p>
              </div>
              <div className="product-actions">
                <button
                  className="like-button"
                  onClick={() => toggleLike(product)}
                >
                  {likedProducts.some((p) => p.id === product.id) ? "❤️" : "🤍"}
                </button>
                <button className="buy-button" onClick={() => addToCart(product)}>
                  Buy
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
