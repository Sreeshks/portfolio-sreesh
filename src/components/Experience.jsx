import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="experience" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="container">
        <h2 className="section-title">Experience & Education</h2>
        
        <div className="timeline" style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            width: '4px',
            backgroundColor: 'var(--primary-color)',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            '@media (max-width: 768px)': {
              left: '20px',
              transform: 'none'
            }
          }}></div>
          
          {/* Experience item */}
          <div className="timeline-item" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '50%',
            position: 'relative',
            marginBottom: '50px',
            '@media (max-width: 768px)': {
              paddingRight: '0',
              paddingLeft: '60px',
              justifyContent: 'flex-start'
            }
          }}>
            <div className="timeline-dot" style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'var(--primary-color)',
              borderRadius: '50%',
              position: 'absolute',
              right: 'calc(50% - 10px)',
              top: '20px',
              zIndex: 2,
              '@media (max-width: 768px)': {
                left: '12px',
                right: 'auto'
              }
            }}></div>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <h3 className="card-title">Flutter Developer Intern</h3>
              <p style={{ fontWeight: 600, marginBottom: '10px' }}>EQSOFT Business Solutions, Thrissur</p>
              <p style={{ color: 'var(--gray-color)', marginBottom: '15px' }}>December 2024 – June 2025</p>
              <p>Working on Flutter development projects, gaining hands-on experience in mobile application development and contributing to real-world business solutions.</p>
            </div>
          </div>
          
          {/* Education item 1 */}
          <div className="timeline-item" style={{
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: '50%',
            position: 'relative',
            marginBottom: '50px',
            '@media (max-width: 768px)': {
              paddingLeft: '60px',
              paddingRight: '0'
            }
          }}>
            <div className="timeline-dot" style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'var(--primary-color)',
              borderRadius: '50%',
              position: 'absolute',
              left: 'calc(50% - 10px)',
              top: '20px',
              zIndex: 2,
              '@media (max-width: 768px)': {
                left: '12px'
              }
            }}></div>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <h3 className="card-title">Bachelor of Vocation in Data Science</h3>
              <p style={{ fontWeight: 600, marginBottom: '10px' }}>St. Thomas College (Autonomous) Thrissur</p>
              <p style={{ color: 'var(--gray-color)', marginBottom: '15px' }}>June 2022 - March 2025 (Expected)</p>
              <p>Affiliated with University of Calicut. Studying comprehensive data science curriculum including programming, statistics, big data, and AI.</p>
            </div>
          </div>
          
          {/* Education item 2 */}
          <div className="timeline-item" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '50%',
            position: 'relative',
            '@media (max-width: 768px)': {
              paddingRight: '0',
              paddingLeft: '60px',
              justifyContent: 'flex-start'
            }
          }}>
            <div className="timeline-dot" style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'var(--primary-color)',
              borderRadius: '50%',
              position: 'absolute',
              right: 'calc(50% - 10px)',
              top: '20px',
              zIndex: 2,
              '@media (max-width: 768px)': {
                left: '12px',
                right: 'auto'
              }
            }}></div>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
              <h3 className="card-title">Higher Secondary Education</h3>
              <p style={{ fontWeight: 600, marginBottom: '10px' }}>Government Higher Secondary School, Palakkad</p>
              <p style={{ color: 'var(--gray-color)', marginBottom: '15px' }}>June 2020 - March 2022</p>
              <p>Completed Biology Science stream under Kerala Board of Public Examinations.</p>
            </div>
          </div>
        </div>
        
        {/* Achievement section */}
        <div className="achievements" style={{ marginTop: '70px' }}>
          <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '30px' }}>Achievements</h3>
          <div className="card" style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--primary-color)' }}>2nd Prize at TechPlus Hackathon</h4>
            <p>Awarded 2nd prize for "Best Idea Ignator" at the TechPlus Hackathon, demonstrating innovation and technical excellence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 