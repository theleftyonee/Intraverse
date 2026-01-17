import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Smartphone, LayoutDashboard, Brain, Code2, Palette,
  Calendar, Search, RefreshCw, Rocket, ArrowRight, Check,
  ExternalLink, Star, ChevronLeft, ChevronRight, Menu, X,
  Sparkles, Zap, TrendingUp, Users
} from 'lucide-react';
import { services, projects, testimonials, stats, processSteps } from '../mock';
import { Card, CardContent } from './ui/card';

const iconMap = {
  Globe, Smartphone, LayoutDashboard, Brain, Code2, Palette,
  Calendar, Search, RefreshCw, Rocket, Sparkles, Zap, TrendingUp, Users
};

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const iframeRefs = useRef({});
  const sectionRefs = useRef({});
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove Emergent watermark
  useEffect(() => {
    const removeWatermark = () => {
      const badge = document.getElementById('emergent-badge');
      if (badge) {
        badge.remove();
      }
      // Also check for any dynamically created badges
      const allBadges = document.querySelectorAll('[id*="emergent"], [class*="emergent"]');
      allBadges.forEach((el) => {
        if (el.id === 'emergent-badge' || el.textContent?.includes('Emergent')) {
          el.remove();
        }
      });
    };

    // Remove immediately
    removeWatermark();
    
    // Also check periodically in case it's added dynamically
    const interval = setInterval(removeWatermark, 100);
    
    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(removeWatermark);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Animate child elements
            const cards = entry.target.querySelectorAll('.stat-card, .service-card, .process-step');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Custom cursor tracking with smooth animation
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPosition({ x: e.clientX, y: e.clientY });
      startAnimation();
    };

    let animationId = null;
    const animateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      // Smooth follower movement (slower)
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.left = `${followerX}px`;
        cursorFollowerRef.current.style.top = `${followerY}px`;
      }
      
      // Continue animation if there's movement (cursor or follower)
      if (Math.abs(mouseX - cursorX) > 0.1 || Math.abs(mouseY - cursorY) > 0.1 ||
          Math.abs(mouseX - followerX) > 0.1 || Math.abs(mouseY - followerY) > 0.1) {
        animationId = requestAnimationFrame(animateCursor);
      } else {
        animationId = null;
      }
    };
    
    const startAnimation = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(animateCursor);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Check for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || 
          target.closest('button') || target.closest('a') ||
          target.closest('.project-showcase-card') || target.closest('.service-card')) {
        setIsHovering(true);
        if (cursorRef.current) cursorRef.current.classList.add('cursor-hover');
        if (cursorFollowerRef.current) cursorFollowerRef.current.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || 
          target.closest('button') || target.closest('a') ||
          target.closest('.project-showcase-card') || target.closest('.service-card')) {
        setIsHovering(false);
        if (cursorRef.current) cursorRef.current.classList.remove('cursor-hover');
        if (cursorFollowerRef.current) cursorFollowerRef.current.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    startAnimation();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextProject = () => {
    requestAnimationFrame(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    });
  };

  const prevProject = () => {
    requestAnimationFrame(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    });
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
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={cursorFollowerRef}></div>
      <div 
        className="cursor-background-effect"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: isHovering ? 0.3 : 0.1
        }}
      ></div>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
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
            <span className="hero-title-gradient highlight-word">BIG IDEA</span>
            <br />
            IN JUST <span className="highlight-word">7 DAYS</span>
          </h1>
          <p className="hero-subtitle">
            Transform your <span className="highlight-word">vision</span> into reality with cutting-edge <span className="highlight-word">technology</span>.
            We deliver <span className="highlight-word">enterprise-grade</span> solutions at startup speed.
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
      <section id="stats" className="stats-section" data-animate>
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
      <section id="services" className="services-section" data-animate>
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">What We Do</div>
            <h2 className="section-title">Services We <span className="highlight-word">Offer</span></h2>
            <p className="section-subtitle">
              Comprehensive <span className="highlight-word">tech solutions</span> tailored to your business needs
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
      <section id="process" className="process-section" data-animate>
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">How We Work</div>
            <h2 className="section-title">Our <span className="highlight-word">Process</span></h2>
            <p className="section-subtitle">
              A <span className="highlight-word">streamlined</span> approach from concept to launch
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
      <section id="projects" className="projects-section" data-animate>
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Our Work</div>
            <h2 className="section-title">Featured <span className="highlight-word">Projects</span></h2>
            <p className="section-subtitle">
              Explore <span className="highlight-word">live projects</span> and interact with them directly
            </p>
          </div>

          <div className="projects-carousel-container">
            <button className="project-carousel-btn prev" onClick={prevProject} aria-label="Previous project">
              <ChevronLeft size={28} />
            </button>

            <div className="projects-carousel-wrapper">
              <div 
                className="projects-carousel-track"
                style={{
                  transform: `translateX(-${currentProject * 100}%)`
                }}
              >
                {projects.map((project, index) => (
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
                            src={currentProject === index ? project.url : undefined}
                            title={project.name}
                            className="project-iframe"
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
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

            <button className="project-carousel-btn next" onClick={nextProject} aria-label="Next project">
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="project-carousel-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`project-indicator ${index === currentProject ? 'active' : ''}`}
                onClick={() => setCurrentProject(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section" data-animate>
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Testimonials</div>
            <h2 className="section-title">What <span className="highlight-word">Clients</span> Say</h2>
            <p className="section-subtitle">
              Real <span className="highlight-word">feedback</span> from real clients
            </p>
          </div>

          <div className="testimonials-stacked-container">
            <div className="testimonials-stacked-wrapper">
              {testimonials.map((testimonial, index) => {
                const position = index - currentTestimonial;
                const isActive = position === 0;
                const isNext = position === 1;
                const isPrev = position === -1;
                const isHidden = Math.abs(position) > 1;

                return (
                  <Card
                    key={testimonial.id}
                    className={`testimonial-stacked-card ${
                      isActive ? 'active' : ''
                    } ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''} ${
                      isHidden ? 'hidden' : ''
                    }`}
                    style={{
                      '--position': position,
                      '--abs-position': Math.abs(position)
                    }}
                    onClick={() => !isActive && setCurrentTestimonial(index)}
                  >
                    <CardContent className="testimonial-card-content">
                      <div className="testimonial-quote-icon">
                        "
                      </div>
                      <div className="testimonial-stars">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} fill="#ffffff" stroke="#ffffff" />
                        ))}
                      </div>
                      <p className="testimonial-text-stacked">{testimonial.content}</p>
                      <div className="testimonial-author-stacked">
                        <div className="author-avatar-stacked">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="author-info-stacked">
                          <div className="author-name-stacked">{testimonial.name}</div>
                          <div className="author-role-stacked">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="testimonials-controls">
              <button className="carousel-btn-stacked prev" onClick={prevTestimonial}>
                <ChevronLeft size={24} />
              </button>
              <div className="carousel-indicators-stacked">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator-stacked ${index === currentTestimonial ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <button className="carousel-btn-stacked next" onClick={nextTestimonial}>
                <ChevronRight size={24} />
              </button>
            </div>
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
          <h2 className="cta-title">Ready to Build Something <span className="highlight-word">Amazing</span>?</h2>
          <p className="cta-subtitle">
            Let's turn your <span className="highlight-word">vision</span> into reality. Schedule a free <span className="highlight-word">consultation</span> today.
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