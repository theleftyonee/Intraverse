import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Smartphone, LayoutDashboard, Brain, Code2, Palette,
  Calendar, Search, RefreshCw, Rocket, ArrowRight, Check,
  ExternalLink, Star, ChevronLeft, ChevronRight, Menu, X,
  Sparkles, Zap, TrendingUp, Users
} from 'lucide-react';
import { services, projects, testimonials, stats, processSteps } from '../mock';

const iconMap = {
  Globe, Smartphone, LayoutDashboard, Brain, Code2, Palette,
  Calendar, Search, RefreshCw, Rocket, Sparkles, Zap, TrendingUp, Users
};

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const iframeRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Sparkles size={20} className="logo-icon" />
            INTRAVERSE TECH
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a onClick={() => scrollToSection('services')}>Services</a>
            <a onClick={() => scrollToSection('process')}>Process</a>
            <a onClick={() => scrollToSection('projects')}>Projects</a>
            <a onClick={() => scrollToSection('testimonials')}>Testimonials</a>
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>
              Schedule Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            Launch Fast. Think Big.
          </div>
          <h1 className="hero-title">
            BUILD YOUR NEXT
            <br />
            <span className="hero-title-gradient">BIG IDEA</span>
            <br />
            IN JUST 7 DAYS
          </h1>
          <p className="hero-subtitle">
            Transform your vision into reality with cutting-edge technology.
            We deliver enterprise-grade solutions at startup speed.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary btn-large" onClick={() => scrollToSection('contact')}>
              Get Started <ArrowRight size={20} />
            </button>
            <button className="btn-secondary btn-large" onClick={() => scrollToSection('projects')}>
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">
                {stat.id === 1 && <TrendingUp size={24} />}
                {stat.id === 2 && <Star size={24} />}
                {stat.id === 3 && <Zap size={24} />}
                {stat.id === 4 && <Users size={24} />}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">What We Do</div>
            <h2 className="section-title">Services We Offer</h2>
            <p className="section-subtitle">
              Comprehensive tech solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div key={service.id} className="service-card">
                  <div className="service-icon-wrapper">
                    <div className="service-icon">
                      <IconComponent size={28} />
                    </div>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-tech">
                    {service.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">How We Work</div>
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A streamlined approach from concept to launch
            </p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={step.id} className="process-step">
                  <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="step-icon-wrapper">
                    <div className="step-icon">
                      <IconComponent size={24} />
                    </div>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className="step-connector">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Our Work</div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Explore live projects and interact with them directly
            </p>
          </div>

          <div className="projects-showcase">
            {projects.map((project) => (
              <div key={project.id} className="project-showcase-card">
                <div className="project-preview-section">
                  <div className="browser-mockup">
                    <div className="browser-header">
                      <div className="browser-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="browser-url">{project.url}</div>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="browser-external">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <div className="browser-content">
                      <iframe
                        ref={(el) => (iframeRefs.current[project.id] = el)}
                        src={project.url}
                        title={project.name}
                        className="project-iframe"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="project-info-section">
                  <div className="project-category-badge">
                    <Sparkles size={14} />
                    {project.category}
                  </div>
                  
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-metrics-grid">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="metric-item">
                        <div className="metric-value">{value}</div>
                        <div className="metric-label">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="project-tech-stack">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    Visit Live Site <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Testimonials</div>
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-subtitle">
              Real feedback from real clients
            </p>
          </div>

          <div className="testimonial-carousel">
            <button className="carousel-btn prev" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>

            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <div className="stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
              <p className="testimonial-text">{testimonials[currentTestimonial].content}</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div className="author-info">
                  <div className="author-name">{testimonials[currentTestimonial].name}</div>
                  <div className="author-role">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>

            <button className="carousel-btn next" onClick={nextTestimonial}>
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta-section">
        <div className="cta-background">
          <div className="cta-orb"></div>
        </div>
        <div className="cta-container">
          <Rocket size={48} className="cta-icon" />
          <h2 className="cta-title">Ready to Build Something Amazing?</h2>
          <p className="cta-subtitle">
            Let's turn your vision into reality. Schedule a free consultation today.
          </p>
          <button className="btn-primary btn-large">
            Schedule Consultation <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={24} />
              <span>INTRAVERSE TECH</span>
            </div>
            <p className="footer-tagline">Building the future, one project at a time.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <a>Website Development</a>
              <a>Mobile Applications</a>
              <a>AI Solutions</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a onClick={() => scrollToSection('services')}>About</a>
              <a onClick={() => scrollToSection('projects')}>Projects</a>
              <a onClick={() => scrollToSection('contact')}>Contact</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Intraverse Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;