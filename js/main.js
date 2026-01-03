document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();

    initParticles();

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Load skills
    loadSkills();

    // Load projects
    loadProjects();

    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Add click-to-copy for email
    document.querySelector('.info-item:nth-child(1)').addEventListener('click', function() {
        const email = 'betimidrizi55@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Copied to clipboard!';
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
            }, 2000);
        });
    });
});

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme); // <-- HERE

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    if (initialTheme === 'dark') {
      themeToggle.querySelector('.fa-moon').style.display = 'none';
      themeToggle.querySelector('.fa-sun').style.display = 'block';
    } else {
      themeToggle.querySelector('.fa-moon').style.display = 'block';
      themeToggle.querySelector('.fa-sun').style.display = 'none';
    }
  }

  if (!savedTheme) {
    localStorage.setItem('theme', initialTheme);
  }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeToggle = document.querySelector('.theme-toggle');
    if (newTheme === 'dark') {
        themeToggle.querySelector('.fa-moon').style.display = 'none';
        themeToggle.querySelector('.fa-sun').style.display = 'block';
    } else {
        themeToggle.querySelector('.fa-moon').style.display = 'block';
        themeToggle.querySelector('.fa-sun').style.display = 'none';
    }

    // Update project images without reloading the entire projects
    document.querySelectorAll('.project-image img').forEach(img => {
        img.src = newTheme === 'dark' ? img.dataset.darkSrc : img.dataset.lightSrc;
    });

    // Handle particles
    if (window.pJSDom && pJSDom.length) {
        pJSDom[0].pJS.fn.vendors.destroypJS();
        pJSDom = [];
        document.querySelector('#particles-js').innerHTML = '';
    }
    initParticles();
}

function initParticles() {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: primaryColor
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: primaryColor,
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

function loadSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    const skills = [
        { name: 'HTML', icon: 'fab fa-html5' },
        { name: 'CSS', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'PHP', icon: 'fab fa-php' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'C++', icon: 'fas fa-code' },
        { name: 'C#', icon: 'fab fa-microsoft' },
        { name: '.NET', icon: 'fab fa-microsoft' },
        { name: 'Laravel', icon: 'fab fa-laravel' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
        { name: '.NET Framework', icon: 'fab fa-windows' },
        { name: 'VS Code', icon: 'fas fa-code' },
        { name: 'Visual Studio', icon: 'fab fa-microsoft' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'SQL Server', icon: 'fas fa-database' },
        { name: 'MySQL', icon: 'fas fa-database' }
    ];

    skillsGrid.innerHTML = '';
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    const projects = [
        {
            title: 'Bosch Junior Auto Service',
            description: 'Professional automotive service website showcasing our workshop, team, and services with gallery, service information, and contact functionality.',
            technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Font Awesome'],
            image: 'assets/images/projects/bosch-showcase.jpg',
            darkImage: 'assets/images/projects/bosch-showcase-dark.jpg',
            liveUrl: '#',
            codeUrl: 'https://github.com/betimidrizi/BoschJunior'
        },
        {
            title: 'Book Review Platform',
            description: 'A user-friendly web platform where readers can browse, review, like, and dislike books with secure authentication and admin management, built with ASP.NET Core MVC.',
            technologies: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQL Server', 'Bootstrap', 'JavaScript'],
            image: 'assets/images/projects/book-review.png',
            liveUrl: '#',
            codeUrl: 'https://github.com/betimidrizi/BookReviewPlatform'
        },
        {
            title: 'Distributed Car Rental System',
            description: 'A full-featured distributed web application for booking cars with real-time booking, user and admin roles, secure shared authentication, booking management, and reporting. Built with ASP.NET Core MVC, Web API, and Entity Framework Core.',
            technologies: ['ASP.NET Core MVC', 'ASP.NET Core Web API', 'C#', 'Entity Framework Core', 'SQL Server', 'Bootstrap', 'Identity', 'JavaScript'],
            image: 'assets/images/projects/car-rental-system.png',
            liveUrl: '#',
            codeUrl: 'https://github.com/betimidrizi/CarRentalSystem'
        },
        {
            title: 'Movie Recommendation Platform',
            description: 'A sleek and intuitive web application where users can browse movies, read and write reviews with ratings, and get personalized movie recommendations. Includes secure user authentication and admin management tools, built with Flask, Python, and Bootstrap.',
            technologies: ['Flask', 'Python', 'Jinja2', 'SQLite/MongoDB', 'Bootstrap', 'JavaScript'],
            image: 'assets/images/projects/movie-recommendation.png',
            liveUrl: '#',
            codeUrl: 'https://github.com/betimidrizi/MovieRecommendationPlatform'
        }
    ];

projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${currentTheme === 'dark' && project.darkImage ? project.darkImage : project.image}" 
                     alt="${project.title}"
                     data-light-src="${project.image}"
                     data-dark-src="${project.darkImage || project.image}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.codeUrl}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}
