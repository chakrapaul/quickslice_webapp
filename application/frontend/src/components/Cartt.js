import React from "react";
import axios from "axios";
import CheckLogin from "./CheckLogin";

export default class Cartt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/retrivetocart")
      .then((res) => this.setState({ cart: res.data }))
      .catch((err) => console.log(err));
  }

  /* delete 1 item (backend + state) */
  removeItem(item, index) {
    axios
      .post("http://localhost:5000/deletefromcart", { name: item.name })
      .then(() => {
        const updated = [...this.state.cart];
        updated.splice(index, 1);
        this.setState({ cart: updated });
      })
      .catch((err) => console.log(err));
  }

  grandTotal() {
    return this.state.cart.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    );
  }

  /* ---------- RENDER ---------- */
  render() {
    /* ////////////////// SUCCESS VIEW ////////////////// */
    if (this.state.cart !== null) {
      return (
        <div className="cartt-main-container" style={{ textAlign: "center" }}>
          {/* === wrapper flexbox ================================= */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              border: "2px solid #ffa500",
              padding: "30px",
              borderRadius: "10px",
              margin: "40px auto",
              width: "90%",
              backgroundColor: "#fffaf0",
            }}
          >
            {/* -------- LEFT PANEL -------------------------------- */}
            <div style={{ flex: "1 1 480px" }}>
              {/* colourful greeting */}
              <h2
                style={{
                  background:
                    "linear-gradient(90deg,#ff5722 0%,#ff9800 100%)",
                  WebkitBackgroundClip: "text",
                  color: "#e53935",
                  fontWeight: "800",
                  textAlign: "center",
                  marginBottom: "25px",
                }}
              >
                Hey Foodie, order placed successfully!!
              </h2>

              {/* order summary heading */}
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "14px",
                  color: "#ff6600",
                  textAlign: "center",
                }}
              >
                📜 Order Summary
              </h3>

              {/* list */}
              <ul style={{ listStyle: "none", padding: 0, fontSize: "18px" }}>
                {this.state.cart.map((it, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span>
                      <strong>{it.name}</strong> × {it.quantity} — $
                      {(it.price * it.quantity).toFixed(2)}
                    </span>

                    {/* delete checkbox */}
                    <input
                      type="checkbox"
                      title="Un‑tick to remove"
                      checked={true}
                      onChange={() => this.removeItem(it, idx)}
                      style={{ transform: "scale(1.2)" }}
                    />
                  </li>
                ))}
              </ul>

              <hr />
              <h4 style={{ textAlign: "right", marginTop: "10px" }}>
                Total:&nbsp;
                <span style={{ color: "#ff5722" }}>
                  ${this.grandTotal().toFixed(2)}
                </span>
              </h4>
            </div>

            {/* -------- RIGHT PANEL (GIF + slogan) --------------- */}
            <div style={{ flex: "1 1 320px", textAlign: "center" }}>
              <img
                src="/pizza.gif"
                alt="Piping‑hot pizza animation"
                style={{
                  width: "260px",
                  maxWidth: "100%",
                  borderRadius: "14px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                }}
              />
              <h3
                style={{
                  marginTop: "20px",
                  color: "#ff5722",
                  fontWeight: "900",
                  letterSpacing: "1px",
                }}
              >
                🍕 Your slice of happiness is on the way—stay cheesy! 🤌
              </h3>
            </div>
          </div>

          {/* === proceed button =============================== */}
          <button
            className="btn"
            style={{
              backgroundColor: "#ff5722",
              color: "#fff",
              fontSize: "20px",
              padding: "14px 36px",
              borderRadius: "12px",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              border: "none",
              cursor: "pointer",
              marginBottom: "40px",
            }}
            onClick={() => this.props.history.push("/Payment")}
          >
            🍕 Proceed to Payment
          </button>

          {/* unchanged helper */}
          <CheckLogin />
        </div>
      );
    }

    /* ////////////////// EMPTY VIEW ////////////////// */
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Nothing in Cart to Check Out</h1>
        <button
          className="btn btn-warning"
          onClick={() => this.props.history.push("/OrderPizza")}
        >
          Back to Menu
        </button>
      </div>
    );
  }
}
