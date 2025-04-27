import React from "react";
import axios from "axios";

class OrderPizza extends React.Component {
  state = { menu: [] };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/getmenu")
      .then((res) => {
        const seen = new Set();
        const unique = res.data.filter((p) => {
          const key = p.id || (p._id && (p._id.$oid || String(p._id))) || p.name;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        this.setState({ menu: unique });
      })
      .catch((err) => console.log("Error fetching menu:", err));
  }

  addToCart = (pizza) => {
    axios
      .post("http://localhost:5000/addtocart", { ...pizza, Quantity: 1 })
      .then(() => alert(`${pizza.name} added to cart!`))
      .catch((err) => console.log("Error adding to cart:", err));
  };

  render() {
    const cardStyle = {
      background: "#fffbe6",
      border: "2px solid orange",
      borderRadius: 10,
      padding: "15px",
      margin: "10px",
      width: "230px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      flex: "0 0 auto",
    };

    const imageStyle = {
      width: "140px",
      height: "140px",
      objectFit: "cover",
      borderRadius: "50%",
      marginBottom: "10px",
    };

    const pizzaNameMapping = {
      "Paneer Tikka": "Spicy Paneer Treat",
      "Chicken Italiaona": "Creamy Chicken Bliss",
      "Veggie Supreme": "Garden Delight",
      "Tripple Chicken Feast": "Meat Lover's Madness",
      "Ultimate Chicken": "BBQ Chicken Glory"
    };

    const manualData = {
      "Paneer Tikka": {
        ingredients: ["dough/flour", "pizza sauce", "seasoning", "cheese"],
        toppings: ["Paneer", "Fried Onion", "Green olive", "Capsicum", "Red peprika"],
      },
      "Chicken Italiaona": {
        ingredients: ["deep dish pizza mix", "pizza sauce", "cheese", "sugar blend", "butter"],
        toppings: ["Pepperoni", "Chicken Sausage", "Mushroom", "Capsicum", "Black beans"],
      },
      "Veggie Supreme": {
        ingredients: ["deep dish mix", "pizza sauce", "cheese", "garlic herbs", "butter"],
        toppings: ["Fried Onion", "Sweet corn", "Mushroom", "Capsicum", "Black olive"],
      },
      "Tripple Chicken Feast": {
        ingredients: ["low carb dough", "pizza sauce", "cheese", "greek dressing", "cajun"],
        toppings: ["Chicken keema", "Fried Onion", "Meat ball", "Capsicum", "Sweet corn"],
      },
      "Ultimate Chicken": {
        ingredients: ["deep dish mix", "BBQ sauce", "cheese", "butter", "cajun"],
        toppings: ["Pepperoni", "Fried Onion", "Meat ball", "Sausage", "Chicken keema"],
      },
    };

    return (
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h2 style={{ color: "red", fontWeight: "bold", marginBottom: "30px" }}>
          🍕 Choose Your Slice
        </h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "nowrap", overflowX: "auto" }}>
          {this.state.menu.map((p, i) => {
            const key = p.id || (p._id && (p._id.$oid || String(p._id))) || i;
            const name = pizzaNameMapping[p.name] || p.name;
            const info = manualData[p.name] || { ingredients: [], toppings: [] };

            return (
              <div key={key} style={cardStyle}>
                <img
                  src={p.image || p.Image}
                  alt={name}
                  style={imageStyle}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/sliceFallback.jpg";
                  }}
                />
                <h5 style={{ fontWeight: "bold" }}>
                  {name}
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      marginLeft: 8,
                      borderRadius: "50%",
                      backgroundColor: (p.name === "Spicy Panner Treat" || p.name === "Garden Delight") ? "green" : "red",
                      
                      

                      display: "inline-block",
                    }}
                  />
                </h5>
                <p style={{ fontWeight: "600" }}>${p.price}</p>
                <p><b>Ingredients:</b> {info.ingredients.join(", ")}</p>
                <p><b>Toppings:</b> {info.toppings.join(", ")}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => this.addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default OrderPizza;
