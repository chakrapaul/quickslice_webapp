import react from 'react'
import axios from 'axios';

export default class Cart extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            sum: 0,
            min: 0,
            itemsList: ''
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
    };
    totalPrice = () => {


        if (this.state.cart) {
            let temp = 0;
            for (var i = 0; i < this.state.cart.length; i++) {
                temp += this.state.cart[i].price
            }
            return temp
        }
        else
            return 0;
    }


    render() {
        const { cart } = this.state;
    
        return (
            <div style={{ margin: '70px', textAlign: "center", border: '1px solid yellow' }}>
                <br />
                <h1>Pizzeria Cart</h1>
    
                <div className='row' style={{ margin: '50px' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart && cart.map((pizza, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={pizza.Image} alt={pizza.name} style={{ height: '30px', width: '30px' }} />
                                    </td>
                                    <td>{pizza.name}</td>
                                    <td>{pizza.quantity}</td>
                                    <td>{pizza.price * pizza.quantity}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => {
                                            axios.post("http://localhost:5000/deletefromcart", pizza)
                                                .then((res) => window.location.reload())
                                                .catch((err) => console.log(err));
                                        }}>
                                            Delete Item
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    <div className='Bill' style={{ textAlign: 'left' }}>
                        <h2>Bill:</h2>
                        <hr />
                        <h6>Order Pizza: ${this.totalPrice()}</h6>
                        <h6>Total Cart: ${this.totalPrice()}</h6>
                    </div>
    
                    <div>
                        <br />
                        <button className="btn btn-warning" onClick={() => this.props.history.push('./Cartt')}>
                            Check Out
                        </button> &nbsp;
                        <button className="btn btn-warning" onClick={() => this.props.history.push('./OrderPizza')}>
                            Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}