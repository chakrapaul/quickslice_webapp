import React from 'react';
import axios from 'axios';
import CheckLogin from './CheckLogin';

export default class Cartt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/retrivetocart")
            .then((responce) => {
                console.log(responce);
                this.setState({
                    cart: responce.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        if (this.state.cart !== null)
            return (
                <div className='cartt-main-container'>

                    {/* ✅ Main success message box */}
                    <div style={{
                        border: '2px solid #ffa500',
                        padding: '30px',
                        borderRadius: '10px',
                        margin: '40px auto',
                        width: '70%',
                        textAlign: 'center',
                        backgroundColor: '#fffaf0',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        Hey Foodie, Order placed successfully!!
                    </div>

                    {/* ✅ Styled Proceed to Payment Button */}
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button
                            className="btn"
                            style={{
                                backgroundColor: '#ff5722',
                                color: 'white',
                                fontSize: '20px',
                                padding: '12px 32px',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={() => this.props.history.push("/Payment")}
                        >
                            🍕 Proceed to Payment
                        </button>
                    </div>

                    <CheckLogin />
                </div>
            );
        else {
            return (
                <div>
                    <h1>Nothing in Cart to CheckOut</h1>
                    <button className="btn btn-warning" style={{ marginLeft: '450px' }} onClick={() => {
                        this.props.history.push('./OrderPizza')
                    }}>
                        Menu
                    </button>
                </div>
            )
        }
    }
}
