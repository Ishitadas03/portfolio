const skillsData = [
    {
        title: "Programming Languages",
        icon: "fa-code",
        color: "var(--primary)",
        skills: ["Python", "SQL", "Java", "C", "HTML", "CSS"]
    },
    {
        title: "AI / ML Libraries",
        icon: "fa-robot",
        color: "var(--accent)",
        skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"]
    },
    {
        title: "Data Visualization",
        icon: "fa-chart-pie",
        color: "var(--secondary)",
        skills: ["Matplotlib", "Seaborn"]
    },
    {
        title: "Backend & Deployment",
        icon: "fa-server",
        color: "var(--primary)",
        skills: ["FastAPI", "REST API", "Docker"]
    },
    {
        title: "Databases",
        icon: "fa-database",
        color: "var(--accent)",
        skills: ["PostgreSQL", "MySQL", "MongoDB"]
    },
    {
        title: "Tools",
        icon: "fa-wrench",
        color: "var(--secondary)",
        skills: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Anaconda"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Inject Skills dynamically
    const skillsContainer = document.getElementById('skills-container');

    if (skillsContainer) {
        skillsData.forEach((category, index) => {
            const section = document.createElement('div');
            section.className = 'skill-category glow-hover';
            section.style.animationDelay = `${index * 0.1}s`;
            
            let tagsHTML = category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
            
            section.innerHTML = `
                <h3 style="color: ${category.color}"><i class="fa-solid ${category.icon}"></i> ${category.title}</h3>
                <div class="skill-tags">
                    ${tagsHTML}
                </div>
            `;
            skillsContainer.appendChild(section);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission
    const form = document.getElementById('portfolio-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';

            try {
                const response = await fetch('http://localhost:8000/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    statusMsg.textContent = 'Message securely saved to your local SQLite database! ✅';
                    statusMsg.style.color = 'var(--btn-color)';
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                statusMsg.textContent = '❌ Failed to connect to server. Ensure FastAPI is running on port 8000.';
                statusMsg.style.color = '#e11d48'; // Red
            } finally {
                submitBtn.textContent = 'Send Message';
                submitBtn.style.opacity = '1';
                setTimeout(() => {
                    statusMsg.textContent = '';
                }, 5000);
            }
        });
    }
});
