import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--dark-color)',
      color: 'white',
      padding: '40px 0 20px'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div className="social-links" style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <a href="https://www.linkedin.com/in/sreeshksuresh/" target="_blank" rel="noopener noreferrer" style={{
              color: 'white',
              fontSize: '1.5rem',
              transition: 'var(--transition)',
              '&:hover': {
                color: 'var(--primary-color)'
              }
            }}>
              LinkedIn
            </a>
            <a href="https://github.com/sreeshksureshh" target="_blank" rel="noopener noreferrer" style={{
              color: 'white',
              fontSize: '1.5rem',
              transition: 'var(--transition)',
              '&:hover': {
                color: 'var(--primary-color)'
              }
            }}>
              GitHub
            </a>
          </div>
          
          <div className="footer-nav" style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '30px',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '15px',
              textAlign: 'center'
            }
          }}>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="copyright" style={{
            textAlign: 'center',
            color: 'var(--gray-color)',
            fontSize: '0.9rem'
          }}>
            <p>&copy; {new Date().getFullYear()} Sreesh K Suresh. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 