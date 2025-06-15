// import React, { useState, useEffect } from 'react';

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <header className={`header ${scrolled ? 'scrolled' : ''}`} style={{
//       position: 'fixed',
//       width: '100%',
//       top: 0,
//       left: 0,
//       backgroundColor: scrolled ? 'white' : 'transparent',
//       padding: '15px 0',
//       zIndex: 100,
//       boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
//       transition: 'all 0.3s ease'
//     }}>
//       <div className="container" style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <a href="#" className="logo" style={{
//           fontSize: '1.5rem',
//           fontWeight: 700,
//           color: 'var(--primary-color)'
//         }}>
//           Sreesh K Suresh
//         </a>

//         <div className="mobile-menu-btn" onClick={toggleMobileMenu} style={{
//           display: 'none',
//           cursor: 'pointer',
//           fontSize: '1.5rem',
//           '@media (max-width: 768px)': {
//             display: 'block'
//           }
//         }}>
//           <span>☰</span>
//         </div>

//         <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`} style={{
//           '@media (max-width: 768px)': {
//             position: 'absolute',
//             top: '100%',
//             left: 0,
//             width: '100%',
//             backgroundColor: 'white',
//             padding: '20px 0',
//             boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
//             opacity: mobileMenuOpen ? 1 : 0,
//             visibility: mobileMenuOpen ? 'visible' : 'hidden',
//             transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
//             transition: 'all 0.3s ease'
//           }
//         }}>
//           <ul style={{
//             display: 'flex',
//             gap: '30px',
//             '@media (max-width: 768px)': {
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: '15px'
//             }
//           }}>
//             <li><a href="#" style={{ fontWeight: 500 }}>Home</a></li>
//             <li><a href="#about" style={{ fontWeight: 500 }}>About</a></li>
//             <li><a href="#experience" style={{ fontWeight: 500 }}>Experience</a></li>
//             <li><a href="#skills" style={{ fontWeight: 500 }}>Skills</a></li>
//             <li><a href="#projects" style={{ fontWeight: 500 }}>Projects</a></li>
//             <li><a href="#certifications" style={{ fontWeight: 500 }}>Certifications</a></li>
//             <li><a href="#contact" style={{ fontWeight: 500 }}>Contact</a></li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header; 