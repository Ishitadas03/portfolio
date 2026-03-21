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

skillCards.forEach(card => observer.observe(card));

emailjs.init("UIIULsXuZYZ7_u_jG");

const form = document.getElementById("portfolio-form");

form.addEventListener("submit", function(e) {
e.preventDefault();

const button = form.querySelector("button");

button.textContent = "Sending...";

emailjs.send("service_89726", "template_jitefbu", {
user_name: form.user_name.value,
user_email: form.user_email.value,
message: form.message.value
})
.then(() => {
button.textContent = "Message Sent ✓";
form.reset();

setTimeout(() => {
button.textContent = "Send Message";
}, 2500);
})
.catch((error) => {
console.log(error);

button.textContent = "Failed";

setTimeout(() => {
button.textContent = "Send Message";
}, 2500);
});
});
