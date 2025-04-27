import React from 'react';
import IngredientsLogo from '../images/IngredientsLogo.jpg';
import ChefLogo from '../images/ChefLogo.jpg';
import TimeLogo from '../images/TimeLogo.jpg';
import axios from 'axios';

export default class Homes extends React.Component {
  render() {
    const loggedIn = localStorage.getItem("loggedIn") === "1";
    const buttonStyle = {
      float: 'right',
      padding: '10px 20px',
      fontWeight: 'bold',
      fontSize: '16px',
      background: '#0ff',
      color: '#000',
      border: '2px solid #0ff',
      borderRadius: '8px',
      textShadow: '0 0 8px #0ff',
      boxShadow: '0 0 12px #0ff',
      margin: '20px',
      cursor: 'pointer'
    };

    return (
      <div style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', padding: '30px' }}>
        {/* Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#ff6600', fontWeight: 'bold' }}>🍕 QuickSlice</h2>
          <button
            style={buttonStyle}
            onClick={() => {
              if (loggedIn) {
                axios.get("http://localhost:5000/logout")
                  .then(() => this.props.history.push("/Homes"))
                  .catch((err) => console.log(err));
                localStorage.clear();
              } else {
                this.props.history.push("/Login");
              }
            }}
          >
            {loggedIn ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Welcome Message */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h1 style={{ fontSize: '38px', color: '#ff4747', fontWeight: 'bold' }}>
            🍕 Welcome to QuickSlice
          </h1>
          <h4 style={{ color: '#ffd700', marginBottom: '20px' }}>Where every bite tells a story</h4>
          <p style={{ fontSize: '18px', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
            Born from passion, perfected with flavor. At <b>QuickSlice</b>, we blend tradition with innovation— 
            from hand-crafted crusts to bold signature sauces. Each slice is more than food; it’s an experience.
            Whether you're cheering for your favorite team or sharing laughs with family, we’re here to bring 
            comfort and crave-worthy pizza right to your table.
          </p>
        </div>

        {/* Features Section */}
        <div className="container mt-5" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
          {/* Ingredients */}
          <div style={sectionCardStyle}>
            <img src={IngredientsLogo} alt="Ingredients" style={circleImgStyle} />
            <h3 style={{ color: '#00ff95' }}>🌿 Farm-Fresh Ingredients</h3>
            <p>
              Hand-picked, never processed. From vine-ripened tomatoes to creamy mozzarella, our ingredients 
              are always premium, always fresh. Because great pizza starts at the roots.
            </p>
          </div>

          {/* Chef */}
          <div style={sectionCardStyle}>
            <img src={ChefLogo} alt="Chefs" style={circleImgStyle} />
            <h3 style={{ color: '#29b6f6' }}>👨‍🍳 Artisan Pizza Makers</h3>
            <p>
              Every QuickSlice is a masterpiece. Our expert chefs combine heritage techniques with modern flair 
              to deliver that perfect bite every time. Crispy edges. Melty cheese. Bold flavors. Done right.
            </p>
          </div>

          {/* Delivery */}
          <div style={sectionCardStyle}>
            <img src={TimeLogo} alt="Delivery" style={circleImgStyle} />
            <h3 style={{ color: '#ffd54f' }}>🚚 Lightning-Fast Delivery</h3>
            <p>
              You’re hungry, we get it. That’s why we promise your pizza hot and ready in under 45 minutes.
              Timely. Tasty. Trusted. Get comfort food delivered, without the wait.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

// 🔧 Styling Blocks
const sectionCardStyle = {
  background: '#1c1c1c',
  borderRadius: '16px',
  padding: '20px',
  maxWidth: '300px',
  textAlign: 'center',
  color: '#fff',
  boxShadow: '0 0 12px rgba(255,255,255,0.1)',
};

const circleImgStyle = {
  width: '180px',
  height: '180px',
  objectFit: 'cover',
  borderRadius: '50%',
  marginBottom: '15px',
  boxShadow: '0 0 8px #333',
};
