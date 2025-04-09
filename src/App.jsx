import { useState, useEffect } from 'react';
import './styles/main.css';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (isLoading) {
    return <LoadingScreen onLoaded={() => setIsLoading(false)} />;
  }

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div 
        className="cursor" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px` 
        }} 
      />
      <div 
        className="cursor-follower" 
        style={{ 
          left: `${followerPosition.x}px`, 
          top: `${followerPosition.y}px` 
        }} 
      />

      {/* Particles */}
      <div className="particles-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Navigation */}
      <nav className="nav-content">
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            About
          </a>
          <a 
            href="#experience" 
            className={activeSection === 'experience' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('experience');
            }}
          >
            Experience
          </a>
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('skills');
            }}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('projects');
            }}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Contact
          </a>
        </div>
        
        {isMobileMenuOpen && (
          <div 
            className="nav-overlay active"
            onClick={toggleMobileMenu}
          />
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-flex-container">
            <div className="profile-section">
              <div className="profile-photo float-animation">
                <img src="/src/assets/sree (1).png" alt="Sreesh K Suresh" />
              </div>
            </div>
            <div className="code-editor-container">
              <div className="editor-header">
                <div className="window-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <div className="tab">about.tsx</div>
              </div>
              <div className="editor-content">
                <div className="line-numbers">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
                <div className="code-content">
                  <div className="typing-effect">
                    <span className="code-keyword">const</span>
                    <span className="code-variable"> AboutMe</span>
                    <span className="code-operator"> = </span>
                    <span className="code-keyword">{`() => `}</span>
                    <span className="code-operator">{'{'}</span>
                    <br />
                    <span className="code-return">  return (</span>
                    <br />
                    <span className="code-text">    "I am a passionate Front End Developer,</span>
                    <br />
                    <span className="code-text">     specializing in creating beautiful and</span>
                    <br />
                    <span className="code-text">     interactive user interfaces with modern</span>
                    <br />
                    <span className="code-text">     web technologies."</span>
                    <br />
                    <span className="code-return">  );</span>
                    <span className="code-operator">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="hero-title">
            {['S', 'r', 'e', 'e', 's', 'h', ' ', 'K', ' ', 'S', 'u', 'r', 'e', 's', 'h'].map((letter, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{letter}</span>
            ))}
          </h1>
          <h2 className="hero-subtitle">Front End Developer</h2>
          <div className="hero-buttons">
            <a href="#contact" className="btn-premium">Get in Touch</a>
            <a href="#projects" className="btn-premium">View Projects</a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="premium-card">
            <h3>Flutter Developer Intern</h3>
            <h4>EQSOFT Business Solutions</h4>
            <p>Developed and maintained Flutter applications using Bloc pattern for state management.</p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="section">
        <div className="container">
          <h2 className="section-title">Awards & Achievements</h2>
          <div className="awards-grid">
            <div className="award-card premium-card">
              <div className="award-content">
                <h3>2nd Prize - TechPlus Hackathon</h3>
                <p>Best Idea Ignator</p>
                <div className="award-image">
                  <img src="/src/assets/tech.jpeg" alt="TechPlus Hackathon Award" />
                </div>
              </div>
            </div>
            <div className="award-card premium-card">
              <div className="award-content">
                <h3>3rd Prize - HakeFX Hackathon</h3>
                <p>Innovation in Technology</p>
                <div className="award-image">
                  <img src="/src/assets/hackefx.jpeg" alt="HakeFX Hackathon Award" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {[
              { 
                name: 'Python', 
                icon: '🐍', 
                animation: 'python-animation',
                description: 'Python Programming & Data Science'
              },
              { 
                name: 'SAS', 
                icon: '📊', 
                animation: 'sas-animation',
                description: 'Statistical Analysis System'
              },
              { 
                name: 'Flutter', 
                icon: '📱', 
                animation: 'flutter-animation',
                description: 'Mobile App Development'
              },
              { 
                name: 'Django', 
                icon: '⚡', 
                animation: 'django-animation',
                description: 'Backend Development'
              },
              { 
                name: 'React', 
                icon: '⚛️', 
                animation: 'react-animation',
                description: 'Frontend Development'
              },
              { 
                name: 'MySQL', 
                icon: '🗄️', 
                animation: 'mysql-animation',
                description: 'Database Management'
              },
              { 
                name: 'Tableau', 
                icon: '📊', 
                animation: 'tableau-animation',
                description: 'Data Visualization'
              },
              { 
                name: 'R', 
                icon: '📈', 
                animation: 'r-animation',
                description: 'Statistical Analysis'
              },
              { 
                name: 'AI', 
                icon: '🤖', 
                animation: 'ai-animation',
                description: 'Artificial Intelligence'
              },
              { 
                name: 'UI/UX Design', 
                icon: '🎨', 
                animation: 'design-animation',
                description: 'User Interface Design'
              }
            ].map((skill) => (
              <div key={skill.name} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
                <div className={`skill-animation ${skill.animation}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="section">
        <div className="container">
          <h2 className="section-title">Connect With Me</h2>
          <div className="social-profiles">
            {/* LinkedIn Profile */}
            <div className="social-profile linkedin-card glass-effect">
              <div className="linkedin-header">
                <div className="linkedin-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </div>
              </div>
              <div className="linkedin-profile-section">
                <div className="profile-photo-large">
                  <img src="/src/assets/sree (1).png" alt="Sreesh K Suresh" />
                </div>
                <div className="social-info">
                  <h3>Sreesh K Suresh</h3>
                  <p className="linkedin-headline">Data Science Student & Flutter Developer</p>
                  <p className="linkedin-location">Thrissur, Kerala, India</p>
                  <p className="linkedin-education">student@st thomas college,thrissur</p>
                  <p className="linkedin-education">Bvoc Datascience</p>
                  <p className="linkedin-email">sreeshksureshh@gmail.com</p>
                </div>
                <div className="social-stats">
                  <div className="stat-item">
                    <h4>500+</h4>
                    <p>Connections</p>
                  </div>
                </div>
                <div className="linkedin-post">
                  <div className="post-header">
                    <div className="post-author">
                      <img src="/src/assets/sree (1).png" alt="Sreesh K Suresh" />
                      <div className="post-author-info">
                        <h4>Sreesh K Suresh</h4>
                        <p>Data Science Student & Flutter Developer</p>
                        <span className="post-time">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>Excited to share that I've won 2nd prize in the TechPlus Hackathon! 🏆 Our team developed an innovative AI-based attendance system. Looking forward to more such opportunities to innovate and grow. #Hackathon #Innovation #AI #Flutter</p>
                  </div>
                  <div className="post-image">
                    <img src="/src/assets/tech.jpeg" alt="Hackathon Award" />
                  </div>
                </div>
                <div className="social-buttons">
                  <a href="https://www.linkedin.com/in/sreesh-k-suresh/" className="social-btn linkedin-btn" target="_blank" rel="noopener noreferrer">
                    View LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Profile */}
            <div className="social-profile github-profile glass-effect">
              <div className="github-header">
                <div className="github-logo">
                  <svg height="32" viewBox="0 0 16 16" width="32" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </div>
                <div className="social-avatar">
                  <img src="/src/assets/sree (1).png" alt="Sreesh K Suresh" />
                </div>
                <div className="social-info">
                  <h3>Sreesh K Suresh</h3>
                  <p>@Sreeshks</p>
                  <p className="github-bio">CODE-EAT-SLEEP-REPEAT</p>
                </div>
              </div>
              <div className="github-stats">
                <div className="github-stat">
                  <h4>41</h4>
                  <p>Repositories</p>
                </div>
                <div className="github-stat">
                  <h4>56</h4>
                  <p>Commits</p>
                </div>
                <div className="github-stat">
                  <h4>2</h4>
                  <p>Stars</p>
                </div>
              </div>
              <div className="github-repos">
                <h4>Featured Repositories</h4>
                <div className="repo-list">
                  <div className="repo-item">
                    <h5>movemark-frontend</h5>
                    <p>AI-based attendance system (Hackathon Winner)</p>
                    <div className="repo-meta">
                      <span>⭐ 2</span>
                      <span>🔄 Dart</span>
                    </div>
                  </div>
                  <div className="repo-item">
                    <h5>MTCNN-based-Deepfake-Detection</h5>
                    <p>Deep learning model for detecting deepfake videos</p>
                    <div className="repo-meta">
                      <span>⭐ 2</span>
                      <span>🐍 Python</span>
                    </div>
                  </div>
                  <div className="repo-item">
                    <h5>Xception-based-Cnn</h5>
                    <p>CNN model for image classification</p>
                    <div className="repo-meta">
                      <span>⭐ 1</span>
                      <span>🐍 Python</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="social-buttons">
                <a href="https://github.com/Sreeshks" className="social-btn github-btn" target="_blank" rel="noopener noreferrer">
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <img src="/relief-medicals.jpg" alt="Relief Medicals" className="project-image" />
              <div className="project-content">
                <h3>Relief Medicals Delivery App</h3>
                <p>Flutter/Bloc based medical delivery application</p>
              </div>
            </div>
            <div className="project-card">
              <img src="/insightpro.jpg" alt="InsightPro" className="project-image" />
              <div className="project-content">
                <h3>InsightPro App</h3>
                <p>Flutter/Bloc based analytics application</p>
              </div>
            </div>
            <div className="project-card">
              <img src="/movemark.jpg" alt="Movemark" className="project-image" />
              <div className="project-content">
                <h3>Movemark Attendance System</h3>
                <p>AI-based attendance system (Hackathon Winner)</p>
              </div>
            </div>
            <div className="project-card">
              <img src="/exaima.jpg" alt="Exaima" className="project-image" />
              <div className="project-content">
                <h3>Exaima Online Proctoring</h3>
                <p>React/Vite based online examination system</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <div className="premium-card">
            <div className="contact-info">
              <p>Email: sreeshksureshh@gmail.com</p>
              <p>Phone: +918129690147</p>
              <div className="social-links">
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder="Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-premium">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Sreesh K Suresh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
