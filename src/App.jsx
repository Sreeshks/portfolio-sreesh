import { useState, useEffect } from 'react';
import './styles/main.css';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <LoadingScreen onLoaded={() => setIsLoading(false)} />;
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="glass-effect fixed-top">
        <div className="nav-content">
          <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="profile-photo float-animation">
            <img src="/src/assets/sree (1).png" alt="Sreesh K Suresh" />
          </div>
          <h1 className="hero-title">Sreesh K Suresh</h1>
          <h2 className="hero-subtitle">Data Science Student & Flutter Developer</h2>
          <div className="hero-buttons">
            <a href="#contact" className="btn-premium">Get in Touch</a>
            <a href="#projects" className="btn-premium">View Projects</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="premium-card">
            <p>
              I am a passionate Data Science student at St. Thomas College, set to graduate in March 2025. 
              With a strong foundation in both data science and mobile development, I bring a unique 
              perspective to solving complex problems through technology.
            </p>
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
                name: 'HTML', 
                icon: '🌐', 
                animation: 'html-animation',
                description: 'Web Development & Design'
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
                name: 'MS Office', 
                icon: '📑', 
                animation: 'office-animation',
                description: 'Productivity Tools'
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
                  <img src="/techplus-award.jpg" alt="TechPlus Hackathon Award" />
                </div>
              </div>
            </div>
            <div className="award-card premium-card">
              <div className="award-content">
                <h3>3rd Prize - HakeFX Hackathon</h3>
                <p>Innovation in Technology</p>
                <div className="award-image">
                  <img src="/hakefx-award.jpg" alt="HakeFX Hackathon Award" />
                </div>
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
    </div>
  );
};

export default App;
