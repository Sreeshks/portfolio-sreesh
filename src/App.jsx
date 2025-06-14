import { useState, useEffect, useRef } from 'react';
import './styles/main.css';
import LoadingScreen from './components/LoadingScreen';
import emailjs from '@emailjs/browser';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Refs for parallax effects and form
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const formRef = useRef(null);

  // Handle scroll progress for progress indicator
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Scroll handling with smooth visibility animations
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['home', 'experience', 'education', 'awards', 'skills', 'social', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Update active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }

      // Handle section visibility for animations
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (isVisible) {
              newSet.add(section);
            }
            return newSet;
          });
        }
      });

          // Handle project visibility with staggered animations
      const projectElements = document.querySelectorAll('.project-card');
      projectElements.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          setTimeout(() => {
            setVisibleProjects(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
              }, index * 150);
            }
          });
          
          // Parallax effects
          if (heroRef.current) {
            const scrollY = window.scrollY;
            const heroElements = heroRef.current.querySelectorAll('.parallax');
            heroElements.forEach((el, index) => {
              const speed = el.dataset.speed || 0.08;
              el.style.transform = `translateY(${scrollY * speed * (index + 1)}px)`;
            });
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Enhanced cursor effects with magnetic attraction
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Simplified cursor movement for better performance
      requestAnimationFrame(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 3D tilt effect for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-effect');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', handleTilt);
      card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / (rect.height / 2);
      const tiltY = -(x - centerX) / (rect.width / 2);
      
      this.style.transform = `perspective(1000px) rotateX(${tiltX * 8}deg) rotateY(${tiltY * 8}deg) scale3d(1.03, 1.03, 1.03)`;
      
      const glare = this.querySelector('.card-glare');
      if (glare) {
        glare.style.opacity = '0.15';
        glare.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
    
    function resetTilt() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      const glare = this.querySelector('.card-glare');
      if (glare) {
        glare.style.opacity = '0';
      }
    }
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleTilt);
        card.removeEventListener('mouseleave', resetTilt);
      });
    };
  }, [visibleSections, visibleProjects]);

  // Optimized navigation handling with touch support
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  // Touch-friendly mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  // EmailJS form submission handler
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_y1oo008', 'template_ef1muua', formRef.current, 'uysO6IreArGmMYxST')
      .then(
        (result) => {
          alert('Message sent successfully!');
          formRef.current.reset();
        },
        (error) => {
          alert('Failed to send message. Please try again.');
          console.error('EmailJS error:', error.text);
        }
      );
  };

  const handleResumePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResumeModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeResumeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResumeModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (isLoading) {
    return <LoadingScreen onLoaded={() => setIsLoading(false)} />;
  }

  return (
    <div className="app">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      
      {/* Custom Cursor */}
      <div 
        className="cursor" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out'
        }} 
      />
      <div 
        className="cursor-follower" 
        style={{ 
          left: `${followerPosition.x}px`, 
          top: `${followerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease-out'
        }} 
      />

      {/* Enhanced Particles with consistent slow animation */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${i % 4}`}
            style={{
              animationDuration: `${15 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 4}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              opacity: Math.random() * 0.3 + 0.2
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="animated-gradient-bg"></div>

      {/* Resume Preview Modal */}
      {isResumeModalOpen && (
        <div className="resume-modal-overlay" onClick={closeResumeModal}>
          <div className="resume-modal-content" onClick={e => e.stopPropagation()}>
            <button className="resume-modal-close" onClick={closeResumeModal}>
              <span>×</span>
            </button>
            <iframe 
              src="/SREESH_K_SURESH_RESUME.pdf" 
              className="resume-preview"
              title="Resume Preview"
            />
          </div>
        </div>
      )}

      {/* Enhanced Navigation */}
      <nav className="nav-content enhanced-nav">
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          onTouchEnd={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div 
          className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {['home', 'experience', 'education', 'awards', 'skills', 'projects', 'certificates', 'contact'].map(section => (
            <a 
              key={section}
              href={`#${section}`} 
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={(e) => handleNavClick(section, e)}
              onTouchEnd={(e) => handleNavClick(section, e)}
            >
              <span className="nav-text">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </a>
          ))}
          <div className="resume-buttons">
            <a 
              href="#" 
              className="nav-link resume-preview-btn"
              onClick={handleResumePreview}
              onTouchEnd={handleResumePreview}
            >
              <span className="nav-text">View Resume</span>
            </a>
            <a 
              href="/SREESH_K_SURESH_RESUME.pdf" 
              className="nav-link resume-download-btn"
              target="_blank" 
              rel="noopener noreferrer"
              download
            >
              <span className="nav-text">Download Resume</span>
            </a>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div 
            className="nav-overlay active"
            onClick={toggleMobileMenu}
            onTouchEnd={toggleMobileMenu}
          />
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className={`section hero-section ${visibleSections.has('home') ? 'visible' : ''}`}
        ref={heroRef}
      >
        <div className="container">
        <div className="hero-content">
            <div className="hero-flex-container parallax" data-speed="0.1">
            <div className="profile-section">
              <div className="profile-photo float-animation">
                <img src="/sree (1).png" alt="Sreesh K Suresh" />
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
                      <span className="code-text">    "I am a Flutter developer with a strong foundation in Data Science, having completed my degree from St. Thomas College. My expertise lies in mobile application development, UI/UX design, and data analysis. I specialize in building high-performance business applications using Flutter and have hands-on experience integrating AI-driven solutions.

With proficiency in Python programming, web development, and database management, I bring a versatile skill set to every project. My passion lies in creating intuitive, user-friendly digital experiences and solving real-world problems with the power of data and technology.

</span>
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
                <span key={index} style={{ animationDelay: `${index * 0.04}s` }}>{letter}</span>
            ))}
          </h1>
            <h2 className="hero-subtitle">Developer</h2>
          <div className="hero-buttons">
              <a href="#contact" className="btn-premium magnetic" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
                Get in Touch
              </a>
              {/* <a href="#projects" className="btn-premium magnetic" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>
                View Projects
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        className={`section ${visibleSections.has('experience') ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Experience
            <span className="title-decoration"></span>
          </h2>
          <div className="premium-card tilt-effect">
            <div className="card-glare"></div>
            <h3>Flutter Developer</h3>
            <h4>EQSOFT Business Solutions</h4>
            <p>Developed and maintained Flutter applications using Bloc pattern for state management, enhancing user experience and performance.</p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section 
  id="education" 
  className={`section ${visibleSections.has('education') ? 'visible' : ''}`}
>
  <div className="container">
    <h2 className="section-title">
      <span className="title-decoration"></span>
      Education
      <span className="title-decoration"></span>
    </h2>
    
    <div className="premium-card tilt-effect">
      <div className="card-glare"></div>
      <h3>B.Voc Data Science</h3>
      <h4>St. Thomas College, Thrissur</h4>
      <p>2022 - 2025</p>
      <p>Pursuing a Bachelor of Vocation in Data Science, focusing on statistical analysis, machine learning, and data visualization.</p>
      <p className="cgpa">CGPA: 8.57</p>
    </div>

    {/* Spacer of height 5px */}
    <div style={{ height: '20px' }}></div>
    {/* or <div className="h-5"></div> if using Tailwind */}

    <div className="premium-card tilt-effect">
      <div className="card-glare"></div>
      <h3>Higher Secondary Education</h3>
      <h4>GHSS Kizhakkenchery, Palakkad</h4>
      <p>2020 - 2022</p>
      <p>Completed higher secondary education with a focus on Science</p>
    </div>
  </div>
</section>


      {/* Awards Section */}
      <section 
        id="awards" 
        className={`section ${visibleSections.has('awards') ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Awards & Achievements
            <span className="title-decoration"></span>
          </h2>
          <div className="awards-grid">
            {[
              {
                title: '2nd Prize - TechPlus Hackathon',
                description: 'Best Idea Ignator',
                image: '/tech.jpeg',
                alt: 'TechPlus Hackathon Award'
              },
              {
                title: '3rd Prize - HakeFX Hackathon',
                description: 'Innovation in Technology',
                image: '/hackefx.jpeg',
                alt: 'HakeFX Hackathon Award'
              }
            ].map((award, index) => (
              <div key={index} className="award-card premium-card tilt-effect">
                <div className="card-glare"></div>
              <div className="award-content">
                  <h3>{award.title}</h3>
                  <p>{award.description}</p>
                <div className="award-image">
                    <img src={award.image} alt={award.alt} />
            </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className={`section ${visibleSections.has('skills') ? 'visible' : ''}`}
        ref={skillsRef}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Skills
            <span className="title-decoration"></span>
          </h2>
          <div className="skills-grid">
            {[
              { name: 'Python', icon: '🐍', animation: 'python-animation', description: 'Python Programming & Data Science' },
              { name: 'SAS', icon: '📊', animation: 'sas-animation', description: 'Statistical Analysis System' },
              { name: 'Flutter', icon: '📱', animation: 'flutter-animation', description: 'Mobile App Development' },
              { name: 'Django', icon: '⚡', animation: 'django-animation', description: 'Backend Development' },
              { name: 'React', icon: '⚛️', animation: 'react-animation', description: 'Frontend Development' },
              { name: 'MySQL', icon: '🗄️', animation: 'mysql-animation', description: 'Database Management' },
              { name: 'Tableau', icon: '📊', animation: 'tableau-animation', description: 'Data Visualization' },
              { name: 'R', icon: '📈', animation: 'r-animation', description: 'Statistical Analysis' },
              { name: 'AI', icon: '🤖', animation: 'ai-animation', description: 'Artificial Intelligence' },
              { name: 'UI/UX Design', icon: '🎨', animation: 'design-animation', description: 'User Interface Design' },
              { name: 'Machine Learning', icon: '🧠', animation: 'ml-animation', description: 'ML Algorithms & Model Development' },
              { name: 'HTML', icon: '🌐', animation: 'html-animation', description: 'Web Development & Markup' }
            ].map((skill, index) => (
              <div key={skill.name} className="skill-card premium-card tilt-effect" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="card-glare"></div>
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
                <div className={`skill-animation ${skill.animation}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`section ${visibleSections.has('projects') ? 'visible' : ''}`}
        ref={projectsRef}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Featured Projects
            <span className="title-decoration"></span>
          </h2>
          <div className="projects-grid">
            {[
              {
                title: 'InsightPro',
                desc: 'Flutter app for real-time business monitoring with live sales tracking, inventory management, and branch performance analytics',
                image: '/InsightPro.jpg',
                tech: ['Flutter', 'Bloc', 'Firebase'],
                links: [
                  { url: 'https://play.google.com/store/apps/details?id=com.eqsoftonline.live_app', label: 'Play Store' }
                ]
              },
              {
                title: 'exAIma',
                desc: 'AI-powered proctoring platform designed to secure exams anywhere, anytime',
                image: '/exaima.jpg',
                tech: ['React', 'AI', 'Vite'],
                links: [
                  { url: 'https://github.com/Sreeshks/exAIma_frontend', label: 'GitHub' }
                ]
              },
              {
                title: 'DrMail',
                desc: 'Flutter app for sharing daily reports with AI-powered text import and EmailJS integration',
                image: '/DrMail.jpg',
                tech: ['Flutter', 'AI', 'EmailJS'],
                links: [
                  { url: 'https://drmail.vercel.app/', label: 'Demo' }
                ]
              },
              {
                title: 'Movemark Attendance System',
                desc: 'AI-based attendance system using facial recognition (TechPlus Hackathon 2nd Prize Winner)',
                image: '/Movemark.jpeg',
                tech: ['Flutter', 'Python', 'TensorFlow'],
                links: [
                  { url: 'https://github.com/Sreeshks/movemark-frontend', label: 'GitHub' }
                ]
              },
              {
                title: 'Deepfake Video Detection',
                desc: 'Advanced AI system for detecting manipulated videos using deep learning techniques',
                image: '/Deepfake.png',
                tech: ['Python', 'TensorFlow', 'MadNet'],
                links: [
                  { url: 'https://github.com/Sreeshks/', label: 'GitHub' }
                ]
              },
              {
                title: 'DevExy - Project Visualizer',
                desc: 'React/Vite based web app that generates structure diagrams from project zip files (HackeFX 3rd Prize Winner)',
                image: '/DevExy.png',
                tech: ['React', 'Vite'],
                links: [
                  { url: 'https://github.com/Sreeshks/devexy', label: 'GitHub' }
                ]
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className={`project-card premium-card tilt-effect ${visibleProjects.has(index) ? 'visible' : ''}`}
                style={{ 
                  opacity: 0, 
                  transform: 'translateY(20px)', 
                  animation: `fadeInUp 0.5s ease forwards ${index * 0.2}s` 
                }}
              >
                <div className="card-glare"></div>
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.links.map(link => (
                      <a 
                        key={link.label} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link magnetic"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-projects">
            <a href="https://github.com/Sreeshks" className="view-projects-btn premium-btn magnetic" target="_blank" rel="noopener noreferrer">
              View All Projects <i className="fas fa-arrow-right"></i>
              <div className="btn-glow"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section 
        id="certificates" 
        className={`section ${visibleSections.has('certificates') ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Certificates
            <span className="title-decoration"></span>
          </h2>
          <p className="section-subtitle">Featured Certificates - View all on LinkedIn</p>
          <div className="certificates-grid">
            {[
              {
                title: 'Data Analyst with Python',
                image: '/DataAnalystwithpython.png',
                alt: 'Data Analyst with Python Certificate',
                link: 'https://www.linkedin.com/in/sreesh-k-suresh/details/certifications/'
              },
              {
                title: 'Flutter Development',
                image: '/flutter.png',
                alt: 'Flutter Development Certificate',
                link: 'https://www.linkedin.com/in/sreesh-k-suresh/details/certifications/'
              },
              {
                title: 'Git & GitHub',
                image: '/Git.png',
                alt: 'Git & GitHub Certificate',
                link: 'https://www.linkedin.com/in/sreesh-k-suresh/details/certifications/'
              },
              {
                title: 'Digital Marketing',
                issuer: 'Google',
                image: '/digital_marketing.png',
                alt: 'Digital Marketing Certificate',
                link: 'https://www.linkedin.com/in/sreesh-k-suresh/details/certifications/'
              }
            ].map((certificate, index) => (
              <div
                key={index}
                className={`certificate-card premium-card tilt-effect ${
                  visibleProjects.has(index) ? 'visible' : ''
                }`}
              >
                <div className="card-glare"></div>
                <img
                  src={certificate.image}
                  alt={certificate.alt}
                  className="certificate-image"
                />
                <div className="certificate-content">
                  <h3>{certificate.title}</h3>
                  <p>{certificate.issuer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-certificates">
            <a 
              href="https://www.linkedin.com/in/sreesh-k-suresh/details/certifications/" 
              className="view-certificates-btn premium-btn magnetic" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View All Certificates <i className="fas fa-arrow-right"></i>
              <div className="btn-glow"></div>
            </a>
          </div>
                </div>
      </section>

      {/* Hackathon Section */}
      <section 
        id="hackathons" 
        className={`section ${visibleSections.has('hackathons') ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Hackathon Experiences
            <span className="title-decoration"></span>
          </h2>
          <div className="hackathon-grid">
            <div className="hackathon-card premium-card tilt-effect">
              <div className="card-glare"></div>
              <div className="hackathon-content">
                <h3>The Great Bengaluru Hackathon 2025</h3>
                <div className="hackathon-details">
                  <p className="hackathon-description">
                    Achieved Top 10% placement among 4500+ registrations and 1199 idea submissions, 
                    securing a spot in the Top 150 teams. Developed exAIma, an innovative AI-powered 
                    proctoring platform that revolutionizes exam security and integrity.
                  </p>
                  <div className="hackathon-images">
                    <img src="/bnglr1.png" alt="Bengaluru Hackathon 1" className="hackathon-image" />
                    <img src="/bnglr2.png" alt="Bengaluru Hackathon 2" className="hackathon-image" />
                  </div>
                  <div className="hackathon-info">
                    <div className="hackathon-organizers">
                      <h4>Organized by:</h4>
                      <ul>
                        <li>HackCulture</li>
                        <li>Zysk Technologies</li>
                        <li>RV College Of Engineering</li>
                      </ul>
                </div>
                    <div className="hackathon-team">
                      <h4>Team Members:</h4>
                      <ul>
                        <li>Stebi A R</li>
                        <li>Sreesh K Suresh</li>
                      </ul>
                      </div>
                    <div className="hackathon-project">
                      <h4>Project: exAIma</h4>
                      <p>An AI-powered proctoring platform with features:</p>
                      <ul>
                        <li>Secure exam monitoring using AI</li>
                        <li>Real-time proctoring capabilities</li>
                        <li>Flexible exam scheduling</li>
                        <li>Advanced security measures</li>
                        <li>Comprehensive exam integrity tools</li>
                      </ul>
                    </div>
                  </div>
                  <div className="hackathon-links">
                    <a 
                      href="https://lnkd.in/gnStbb5t" 
                      className="hackathon-link magnetic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Frontend <i className="fas fa-arrow-right"></i>
                      <div className="btn-glow"></div>
                    </a>
                    <a 
                      href="https://lnkd.in/gkWiu8HC" 
                      className="hackathon-link magnetic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Backend <i className="fas fa-arrow-right"></i>
                      <div className="btn-glow"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hackathon-card premium-card tilt-effect">
              <div className="card-glare"></div>
              <div className="hackathon-content">
                <h3>PROXY CSE GECT Hackathon</h3>
                <div className="hackathon-details">
                  <p className="hackathon-description">
                    Achieved 7th place out of 842 participants at PROXY CSE GECT, hosted in GEC Thrissur. 
                    The three-day event featured multiple competitions including a 5-hour coding competition, 
                    Capture The Flag (CTF) where we secured 5th place, and an 18-hour hackathon.
                  </p>
                  <div className="hackathon-images">
                    <img src="/proxy1.png" alt="PROXY Hackathon 1" className="hackathon-image" />
                    <img src="/proxy2.png" alt="PROXY Hackathon 2" className="hackathon-image" />
                    <img src="/proxy3.png" alt="PROXY Hackathon 3" className="hackathon-image" />
                    <img src="/proxy4.png" alt="PROXY Hackathon 4" className="hackathon-image" />
                </div>
                  <div className="hackathon-info">
                    <div className="hackathon-team">
                      <h4>Team Members:</h4>
                      <ul>
                        <li>Eric Thimi</li>
                        <li>Stebi A R</li>
                        <li>Sreesh K Suresh</li>
                      </ul>
                </div>
                    <div className="hackathon-project">
                      <h4>Project: CueHub</h4>
                      <p>A powerful CLI tool designed to simplify developers' experiences with features like:</p>
                      <ul>
                        <li>Project Initialization with virtual environment setup</li>
                        <li>Framework Setup (Django, Pyramid, FastAPI, Flask, Tornado)</li>
                        <li>Project Analysis and improvement suggestions</li>
                        <li>Documentation Generation</li>
                        <li>Git memory snippets for quick access</li>
                      </ul>
                </div>
              </div>
                  <div className="hackathon-links">
                    <a 
                      href="https://lnkd.in/gqpkDUpK" 
                      className="hackathon-link magnetic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View CueHub Project <i className="fas fa-arrow-right"></i>
                      <div className="btn-glow"></div>
                    </a>
                </div>
                </div>
              </div>
                    </div>
            <div className="hackathon-card premium-card tilt-effect">
              <div className="card-glare"></div>
              <div className="hackathon-content">
                <h3>CUSAT 24-Hour Hackathon</h3>
                <div className="hackathon-details">
                  <p className="hackathon-description">
                    Participated in a high-energy 24-hour hackathon at CUSAT, selected from 300+ applicants. 
                    Experienced an innovative technology selection process where teams bid on technologies using virtual currency.
                  </p>
                  <div className="hackathon-images">
                    <img src="/cusat1.png" alt="CUSAT Hackathon 1" className="hackathon-image" />
                    <img src="/cusat2.png" alt="CUSAT Hackathon 2" className="hackathon-image" />
                    <img src="/cusat3.png" alt="CUSAT Hackathon 3" className="hackathon-image" />
                    <img src="/cusat4.png" alt="CUSAT Hackathon 4" className="hackathon-image" />
                  </div>
                  <div className="hackathon-info">
                    <div className="hackathon-organizers">
                      <h4>Organized by:</h4>
                      <ul>
                        <li>ACES, CUSAT</li>
                        <li>IEEE CUSAT SB</li>
                        <li>Tinkerhub CUSAT</li>
                        <li>Dhishna</li>
                      </ul>
                    </div>
                    <div className="hackathon-team">
                      <h4>Team Members:</h4>
                      <ul>
                        <li>Stebi A.R.</li>
                        <li>Sreesh K Suresh</li>
                        <li>Krishnendhu K</li>
                      </ul>
                    </div>
                  </div>
                  <div className="hackathon-links">
                    <a 
                      href="https://lnkd.in/grkCaMf6" 
                      className="hackathon-link magnetic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Project <i className="fas fa-arrow-right"></i>
                      <div className="btn-glow"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
            <div className="hackathon-card premium-card tilt-effect">
              <div className="card-glare"></div>
              <div className="hackathon-content">
                <h3>Novathon Hackathon</h3>
                <div className="hackathon-details">
                  <p className="hackathon-description">
                    Developed Atomica, an innovative habit tracking application that leverages LLMware's 
                    advanced language models to analyze and predict user goals. The app combines Flutter's 
                    powerful UI capabilities with AI-driven insights to help users build and maintain better habits.
                  </p>
                  <div className="hackathon-images">
                    <img src="/novathon.heic" alt="Novathon Hackathon 1" className="hackathon-image" />
                    <img src="/novathon2.HEIC" alt="Novathon Hackathon 2" className="hackathon-image" />
              </div>
                  <div className="hackathon-info">
                    <div className="hackathon-project">
                      <h4>Project: Atomica</h4>
                      <p>A smart habit tracking application with AI-powered features:</p>
                      <ul>
                        <li>Goal prediction using LLMware's language models</li>
                        <li>Personalized habit recommendations</li>
                        <li>Progress tracking and analytics</li>
                        <li>Intuitive Flutter-based UI/UX</li>
                        <li>Real-time habit insights and suggestions</li>
                      </ul>
              </div>
            </div>
                  <div className="hackathon-links">
                    <a 
                      href="https://github.com/Sreeshks" 
                      className="hackathon-link magnetic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Atomica Project <i className="fas fa-arrow-right"></i>
                      <div className="btn-glow"></div>
                    </a>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        id="gallery" 
        className={`section ${visibleSections.has('gallery') ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Gallery
            <span className="title-decoration"></span>
          </h2>
          <div className="gallery-grid">
            {/* Certificates */}
            <div className="gallery-category">
              <h3>Certificates</h3>
              <div className="gallery-items">
                {[
                  { image: '/DataAnalystwithpython.png', title: 'Data Analyst with Python' },
                  { image: '/flutter.png', title: 'Flutter Development' },
                  { image: '/Git.png', title: 'Git & GitHub' },
                  { image: '/digital_marketing.png', title: 'Digital Marketing' }
                ].map((item, index) => (
                  <div key={index} className="gallery-item">
                    <img src={item.image} alt={item.title} />
                    <div className="gallery-item-overlay">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="gallery-category">
              <h3>Awards</h3>
              <div className="gallery-items">
                {[
                  { image: '/tech.jpeg', title: 'TechPlus Hackathon - 2nd Prize' },
                  { image: '/hackefx.jpeg', title: 'HakeFX Hackathon - 3rd Prize' }
                ].map((item, index) => (
                  <div key={index} className="gallery-item">
                    <img src={item.image} alt={item.title} />
                    <div className="gallery-item-overlay">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hackathons */}
            <div className="gallery-category">
              <h3>Hackathons</h3>
              <div className="gallery-items">
                {[
                  { image: '/bnglr1.png', title: 'Bengaluru Hackathon' },
                  { image: '/bnglr2.png', title: 'Bengaluru Hackathon' },
                  { image: '/proxy1.png', title: 'PROXY CSE GECT' },
                  { image: '/proxy2.png', title: 'PROXY CSE GECT' },
                  { image: '/proxy3.png', title: 'PROXY CSE GECT' },
                  { image: '/proxy4.png', title: 'PROXY CSE GECT' },
                  { image: '/cusat1.png', title: 'CUSAT Hackathon' },
                  { image: '/cusat2.png', title: 'CUSAT Hackathon' },
                  { image: '/cusat3.png', title: 'CUSAT Hackathon' },
                  { image: '/cusat4.png', title: 'CUSAT Hackathon' }
                ].map((item, index) => (
                  <div key={index} className="gallery-item">
                    <img src={item.image} alt={item.title} />
                    <div className="gallery-item-overlay">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`section ${visibleSections.has('contact') ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="title-decoration"></span>
            Contact
            <span className="title-decoration"></span>
          </h2>
          <div className="premium-card contact-card tilt-effect">
            <div className="card-glare"></div>
            <div className="contact-content">
            <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <p>sreeshksureshh@gmail.com</p>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <p>+918129690147</p>
                </div>
                <div className="social-links aligned-social-links">
                  <a href="https://linkedin.com/in/sreesh-k-suresh" target="_blank" rel="noopener noreferrer" className="social-link magnetic">
                    <span className="sr-only">LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                    </svg>
                    <div className="link-glow"></div>
                  </a>
                  <a href="https://github.com/Sreeshks" target="_blank" rel="noopener noreferrer" className="social-link magnetic">
                    <span className="sr-only">GitHub</span>
                    <svg height="24" viewBox="0 0 16 16" width="24" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <div className="link-glow"></div>
                  </a>
                  <a href="https://instagram.com/sreeshksuresh" target="_blank" rel="noopener noreferrer" className="social-link magnetic">
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.97 1.826 5.354c-.058 1.281-.072 1.689-.072 4.945 0 3.255.014 3.664.072 4.945.156 3.384 1.842 5.127 5.226 5.282 1.28.058 1.689.072 4.945.072s3.664-.014 4.945-.072c3.384-.156 5.127-1.842 5.282-5.226.058-1.281.072-1.689.072-4.945 0-3.255-.014-3.664-.072-4.945-.156-3.384-1.842-5.127-5.226-5.282C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                    </svg>
                    <div className="link-glow"></div>
                  </a>
                </div>
              </div>
              <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
              <div className="form-group">
                  <input 
                    type="text" 
                    name="user_name" 
                    className="form-control premium-input" 
                    placeholder="Name" 
                    required 
                  />
                  <div className="input-glow"></div>
              </div>
              <div className="form-group">
                  <input 
                    type="email" 
                    name="user_email" 
                    className="form-control premium-input" 
                    placeholder="Email" 
                    required 
                  />
                  <div className="input-glow"></div>
              </div>
              <div className="form-group">
                  <textarea 
                    name="message" 
                    className="form-control premium-input" 
                    placeholder="Message" 
                    rows="5" 
                    required
                  ></textarea>
                  <div className="input-glow"></div>
              </div>
                <button type="submit" className="btn-premium magnetic">
                  <span>Send Message</span>
                  <div className="btn-glow"></div>
                </button>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer centered-footer">
        <div className="container">
          <div className="footer-content">
            <p>© 2025 Sreesh K Suresh. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;