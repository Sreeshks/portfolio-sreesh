import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gallery.css';

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const galleryImages = [
    // Certificates
    { image: '/DataAnalystwithpython.png', title: 'Data Analyst with Python', category: 'Certificates' },
    { image: '/flutter.png', title: 'Flutter Development', category: 'Certificates' },
    { image: '/Git.png', title: 'Git & GitHub', category: 'Certificates' },
    { image: '/digital_marketing.png', title: 'Digital Marketing', category: 'Certificates' },
    
    // Awards
    { image: '/tech.jpeg', title: 'TechPlus Hackathon - 2nd Prize', category: 'Awards' },
    { image: '/hackefx.jpeg', title: 'HakeFX Hackathon - 3rd Prize', category: 'Awards' },
    
    // Hackathons
    { image: '/bnglr1.png', title: 'Bengaluru Hackathon', category: 'Hackathons' },
    { image: '/bnglr2.png', title: 'Bengaluru Hackathon', category: 'Hackathons' },
    { image: '/proxy1.png', title: 'PROXY CSE GECT', category: 'Hackathons' },
    { image: '/proxy2.png', title: 'PROXY CSE GECT', category: 'Hackathons' },
    { image: '/proxy3.png', title: 'PROXY CSE GECT', category: 'Hackathons' },
    { image: '/proxy4.png', title: 'PROXY CSE GECT', category: 'Hackathons' },
    { image: '/cusat1.png', title: 'CUSAT Hackathon', category: 'Hackathons' },
    { image: '/cusat2.png', title: 'CUSAT Hackathon', category: 'Hackathons' },
    { image: '/cusat3.png', title: 'CUSAT Hackathon', category: 'Hackathons' },
    { image: '/cusat4.png', title: 'CUSAT Hackathon', category: 'Hackathons' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    navigate('/gallery');
  };

  return (
    <div className="gallery-preview">
      <div className="gallery-slideshow">
        <div className="slideshow-container">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            >
              <img src={item.image} alt={item.title} />
              <div className="slide-overlay">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="slideshow-dots">
          {galleryImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <button className="explore-gallery-btn" onClick={handleExploreClick}>
        Explore Gallery
        <span className="btn-arrow">→</span>
      </button>
    </div>
  );
};

export default Gallery; 