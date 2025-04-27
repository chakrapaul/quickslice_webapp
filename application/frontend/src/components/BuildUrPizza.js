import React from 'react';
import axios from 'axios';
import Cart from './Cart';

class BuildUrPizza extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      total: 0,
      checkingredients: [],
    };
  }

  changeCheckingredients(ingredients) {
    this.setState({ checkingredients: ingredients });
  }

  changeTotal(price) {
    this.setState({ total: price });
  }

  onHandle = (pos) => {
    const selectedIngredient = this.state.ingredients[pos];
    const obj = {
      Name: selectedIngredient.tname,
      Price: selectedIngredient.price,
      Quantity: 1,
      Image: selectedIngredient.Image,
    };

    const updated = this.state.checkingredients.map((item, index) =>
      index === pos ? !item : item
    );

    this.changeCheckingredients(updated);

    const totalPrice = updated.reduce((sum, checked, index) =>
      checked ? sum + this.state.ingredients[index].price : sum, 0
    );

    this.changeTotal(totalPrice);

    axios.post("http://localhost:5000/build", obj)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getingredients')
      .then((res) => {
        const seen = new Set();
        const uniqueIngredients = res.data.filter((item) => {
          if (seen.has(item.tname)) return false;
          seen.add(item.tname);
          return true;
        });

        const temp = uniqueIngredients.map(() => false);
        this.setState({
          ingredients: uniqueIngredients,
          checkingredients: temp
        });
      })
      .catch((err) => {
        console.error("❌ Error fetching ingredients:", err);
      });
  }

  render() {
    const { ingredients, checkingredients } = this.state;

    return (
      <div style={{
        marginTop: '80px',
        textAlign: 'center',
        backgroundColor: '#fffdf5',
        padding: '40px'
      }}>
        <h1 style={{
          color: '#d35400',
          fontWeight: '700',
          marginBottom: '30px',
          fontFamily: 'cursive'
        }}>
          🍕 Build Your Own Pizza
        </h1>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '25px'
        }}>
          {ingredients.map((d, index) => (
            <div key={index} style={{
              backgroundColor: checkingredients[index] ? '#ffe6cc' : '#fff',
              border: '2px solid #ffa500',
              borderRadius: '20px',
              width: '180px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0px 3px 8px rgba(0,0,0,0.1)'
            }}>
              <img
                src={d.Image}
                alt={d.tname}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '10px'
                }}
              />
              <h5 style={{ color: '#333', marginBottom: '10px' }}>{d.tname}</h5>
              <p style={{ margin: 0, color: '#666' }}><strong>${d.price}</strong></p>
              <input
                type="checkbox"
                checked={checkingredients[index] || false}
                onChange={() => this.onHandle(index)}
                style={{ marginTop: '10px' }}
              />
            </div>
          ))}
        </div>

        <h4 style={{ marginTop: '40px', color: '#333' }}>
          🛒 Total: <span style={{ color: '#d35400' }}>${this.state.total}</span>
        </h4>

        <div style={{ marginTop: '20px' }}>
          <button
            className="btn btn-warning"
            onClick={() => this.props.history.push("/Cart")}
            style={{ fontSize: '1.1rem', padding: '10px 20px', marginRight: '10px' }}
          >
            Proceed to Cart
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => this.props.history.push("/DrinksDesserts")}
            style={{ fontSize: '1.1rem', padding: '10px 20px' }}
          >
            🍹 Explore Drinks & Desserts
          </button>
        </div>

        <div style={{ display: 'none' }}>
          <Cart total={this.state.total} />
        </div>
      </div>
    );
  }
}

export default BuildUrPizza;
