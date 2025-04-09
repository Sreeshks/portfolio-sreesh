import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-2" style={{
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Contact Info */}
          <div className="contact-info">
            <div className="card">
              <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Contact Information</h3>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontWeight: 600 }}>Email:</p>
                <a href="mailto:sreeshksureshh@gmail.com" style={{ color: 'var(--gray-color)' }}>
                  sreeshksureshh@gmail.com
                </a>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontWeight: 600 }}>Phone:</p>
                <a href="tel:+918129690147" style={{ color: 'var(--gray-color)' }}>
                  +91 8129690147
                </a>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <p style={{ fontWeight: 600 }}>Location:</p>
                <p style={{ color: 'var(--gray-color)' }}>Kerala, India</p>
              </div>
              
              {/* Social Links */}
              <div className="social-links" style={{
                display: 'flex',
                gap: '15px'
              }}>
                <a href="https://www.linkedin.com/in/sreeshksuresh/" target="_blank" rel="noopener noreferrer" className="btn">
                  LinkedIn
                </a>
                <a href="https://github.com/sreeshksureshh" target="_blank" rel="noopener noreferrer" className="btn" style={{
                  backgroundColor: '#333'
                }}>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <div className="card">
              <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 