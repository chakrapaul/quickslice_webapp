import React, { useState } from 'react';
import axios from 'axios';

export default function DrinksDesserts(props) {
  const items = [
    { name: "Coke", price: 2.0, image: "/Coke.jpg" },
    { name: "Dr. Pepper", price: 2.0, image: "/Dr.Pepper.jpg" },
    { name: "Ginger Ale", price: 2.0, image: "/Gingerale.jpg" },
    { name: "Cheesecake", price: 4.0, image: "/Cheesecake.jpg" },
    { name: "Brownie", price: 3.0, image: "/Brownie.jpg" },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(false));

  const handleSelect = (index) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    setSelected(updated);
  };

  const addToCart = (item) => {
    const cartItem = {
      Name: item.name,
      Price: item.price,
      Quantity: 1,
      Image: item.image, // still storing relative path
    };
    axios.post("http://localhost:5000/build", cartItem)
      .then(() => alert(`${item.name} added to cart!`))
      .catch((err) => console.log("Error adding to cart", err));
  };

  return (
    <div style={{ marginTop: '80px', textAlign: 'center' }}>
      <h2 style={{ color: '#ff6600', fontWeight: 'bold' }}>
        🍹 Drinks <span style={{ color: '#D2691E' }}>&</span> 🍰 Desserts
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
        {items.map((item, idx) => (
          <div
            className="item-card"
            style={{
              backgroundColor: '#fffbe6',
              padding: '20px',
              border: '2px solid orange',
              borderRadius: '12px',
              width: '200px',
              margin: '20px',
              textAlign: 'center',
              boxShadow: '0 0 10px rgba(255, 165, 0, 0.2)',
            }}
            key={idx}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ height: '100px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <h5>{item.name}</h5>
            <p><strong>${item.price.toFixed(2)}</strong></p>

            <div>
              <input
                type="checkbox"
                checked={selected[idx]}
                onChange={() => handleSelect(idx)}
              />{" "}
              Choose
            </div>

            <button
              className="btn btn-warning btn-sm mt-2"
              onClick={() => addToCart(item)}
              disabled={!selected[idx]}
              style={{ marginTop: '10px' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
