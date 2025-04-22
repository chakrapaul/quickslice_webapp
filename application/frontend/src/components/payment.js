import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Payment() {
    const [method, setMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvv: '' });
    const history = useHistory();

    const handlePayment = (e) => {
        e.preventDefault();
        alert("🍕 Payment Successful!");
        history.push("/Homes");
    };

    return (
        <div
            style={{
                backgroundColor: '#fff4e6',
                minHeight: '100vh',
                padding: '50px 20px',
                fontFamily: 'Comic Sans MS, cursive',
                textAlign: 'center'
            }}
        >
            <h1
                style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#ff6600',
                    textShadow: '2px 2px #ffcc99',
                    marginBottom: '40px'
                }}
            >
                🔐 Secure Payment
            </h1>

            <form
                onSubmit={handlePayment}
                style={{
                    maxWidth: '550px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '15px',
                    border: '3px dashed #ffa500',
                    boxShadow: '0 5px 20px rgba(255, 102, 0, 0.2)',
                    textAlign: 'left'
                }}
            >
                <div style={{ marginBottom: '25px' }}>
                    <label style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Select Payment Method:</label>
                    <br />
                    <input
                        type="radio"
                        name="method"
                        value="card"
                        onChange={(e) => setMethod(e.target.value)}
                    /> <strong>Credit/Debit Card</strong><br />
                    <input
                        type="radio"
                        name="method"
                        value="paypal"
                        onChange={(e) => setMethod(e.target.value)}
                    /> <strong>PayPal</strong>
                </div>

                {method === 'card' && (
                    <div>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '1.2rem' }}>Cardholder Name</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                                value={cardDetails.name}
                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '1.2rem' }}>Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '1.2rem' }}>Expiry Date</label>
                            <input
                                type="month"
                                className="form-control"
                                required
                                style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '1.2rem' }}>CVV</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {method === 'paypal' && (
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        🧾 Redirecting to PayPal (mock)...
                    </p>
                )}

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#ff6600',
                            color: 'white',
                            fontSize: '1.5rem',
                            padding: '15px 35px',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            cursor: 'pointer'
                        }}
                    >
                        🍕 Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
}
