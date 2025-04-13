import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="grid" style={{
          gridTemplateColumns: '1fr 2fr',
          gap: '50px',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          <div className="about-img">
            <img src="/profile.png" alt="Sreesh K Suresh" style={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }} />
          </div>
          <div className="about-content">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Data Science Student & Flutter Developer</h3>
            <p style={{ marginBottom: '20px' }}>
              I'm currently pursuing a Bachelor of Vocation in Data Science at St. Thomas College (Autonomous) Thrissur, affiliated with the University of Calicut, with an expected graduation in March 2025.
            </p>
            <p style={{ marginBottom: '20px' }}>
              As a Flutter Developer Intern at EQSOFT Business Solutions, I've been contributing to real-world projects and expanding my skills in mobile app development. I'm passionate about creating innovative solutions that leverage technology to solve real-world problems.
            </p>
            <p style={{ marginBottom: '30px' }}>
              With experience in Flutter, React, Django, and various data science tools, I combine technical expertise with creative problem-solving to deliver effective solutions. I've also participated in hackathons, winning 2nd prize at the TechPlus Hackathon for "Best Idea Ignator."
            </p>
            <div className="about-info" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div>
                <strong>Email:</strong> sreeshksureshh@gmail.com
              </div>
              <div>
                <strong>Phone:</strong> +918129690147
              </div>
              <div>
                <strong>Education:</strong> B.Voc in Data Science
              </div>
              <div>
                <strong>Location:</strong> Kerala, India
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="https://www.linkedin.com/in/sreeshksuresh/" target="_blank" className="btn-premium">LinkedIn</a>
              <a href="https://github.com/sreeshksureshh" target="_blank" className="btn-premium">Github</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 