import React, { useState, useEffect } from 'react';
import { 
  Globe, Smartphone, LayoutDashboard, Brain, Code2, Palette,
  Calendar, Search, RefreshCw, Rocket, ArrowRight, Check,
  ExternalLink, Star, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';
import { services, projects, testimonials, stats, processSteps } from '../mock';

const iconMap = {
  Globe, Smartphone, LayoutDashboard, Brain, Code2, Palette,
  Calendar, Search, RefreshCw, Rocket
};

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="nav-logo">INTRAVERSE TECH</div>
          
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
        <div className="hero-content">
          <div className="hero-badge">Launch Fast. Think Big.</div>
          <h1 className="hero-title">
            ANY TECH SOLUTION,
            <br />
            <span className="hero-title-accent">DELIVERED WITHIN A WEEK</span>
          </h1>
          <p className="hero-subtitle">
            Bridging digital innovation with practical solutions. We transform concepts into 
            cutting-edge technology that drives your business forward.
          </p>
          <button className="btn-primary btn-large" onClick={() => scrollToSection('contact')}>
            Get Started <ArrowRight size={20} />
          </button>
        </div>

        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
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
            <h2 className="section-title">OUR SERVICES</h2>
            <p className="section-subtitle">
              We offer a comprehensive range of tech solutions tailored to your needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div key={service.id} className="service-card">
                  <div className="service-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-tech">
                    {service.technologies.map((tech, idx) => (
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
            <h2 className="section-title">OUR PROCESS</h2>
            <p className="section-subtitle">
              A streamlined approach to bring your vision to life
            </p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={step.id} className="process-step">
                  <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="step-icon">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  {index < processSteps.length - 1 && <div className="step-connector"></div>}
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
            <h2 className="section-title">FEATURED PROJECTS</h2>
            <p className="section-subtitle">
              Transforming ideas into powerful digital experiences
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                      Visit Live Site <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-metrics">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="metric">
                        <span className="metric-value">{value}</span>
                        <span className="metric-label">{key}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge-small">{tech}</span>
                    ))}
                  </div>
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
            <h2 className="section-title">CLIENT TESTIMONIALS</h2>
            <p className="section-subtitle">
              What our clients say about working with us
            </p>
          </div>

          <div className="testimonial-carousel">
            <button className="carousel-btn prev" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>

            <div className="testimonial-content">
              <div className="stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#d9fb06" stroke="#d9fb06" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonials[currentTestimonial].content}"</p>
              <div className="testimonial-author">
                <div className="author-name">{testimonials[currentTestimonial].name}</div>
                <div className="author-role">{testimonials[currentTestimonial].role}</div>
                <div className="author-company">{testimonials[currentTestimonial].company}</div>
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
        <div className="cta-container">
          <h2 className="cta-title">READY TO BUILD SOMETHING GREAT?</h2>
          <p className="cta-subtitle">
            Let's discuss your project and turn your vision into reality
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
            <h3 className="footer-logo">INTRAVERSE TECH</h3>
            <p className="footer-tagline">Launch Fast. Think Big.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <a>Website Development</a>
              <a>Mobile Applications</a>
              <a>Admin Dashboards</a>
              <a>AI Solutions</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a onClick={() => scrollToSection('services')}>About Us</a>
              <a onClick={() => scrollToSection('projects')}>Projects</a>
              <a onClick={() => scrollToSection('testimonials')}>Testimonials</a>
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