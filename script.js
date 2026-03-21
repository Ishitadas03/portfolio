/* ---------- Skills Scroll Animation ---------- */

const skillCards = document.querySelectorAll(".skill-category");

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry, index) => {
if (entry.isIntersecting) {
setTimeout(() => {
entry.target.classList.add("show");
}, index * 150);
}
});
}, {
threshold: 0.2
});

skillCards.forEach(card => {
observer.observe(card);
});

/* ---------- EmailJS Setup ---------- */

emailjs.init("UIIULsXuZYZ7_u_jG");

/* ---------- Contact Form Send ---------- */

const form = document.getElementById("portfolio-form");

if (form) {
form.addEventListener("submit", function(e) {
e.preventDefault();

    const button = form.querySelector("button");

    emailjs.sendForm(
        "service_89726",
        "template_jitefbu",
        "#portfolio-form"
    )
    .then(() => {
        button.textContent = "Message Sent ✓";

        setTimeout(() => {
            button.textContent = "Send Message";
        }, 2500);

        form.reset();
    })
    .catch((error) => {
        console.log(error);

        button.textContent = "Failed";

        setTimeout(() => {
            button.textContent = "Send Message";
        }, 2500);
    });
});

}
