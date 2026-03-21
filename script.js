document.addEventListener("DOMContentLoaded", function () {

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

if (form) {
form.addEventListener("submit", function (e) {
e.preventDefault();

const button = form.querySelector("button");
button.textContent = "Sending...";

emailjs.send("service_89726", "template_jitefbu", {
user_name: form.querySelector('[name="user_name"]').value,
user_email: form.querySelector('[name="user_email"]').value,
message: form.querySelector('[name="message"]').value
})
.then(function () {
button.textContent = "Message Sent ✓";
form.reset();

setTimeout(() => {
button.textContent = "Send Message";
}, 2500);
})
.catch(function (error) {
console.log("EmailJS Error:", error);

button.textContent = "Failed";

setTimeout(() => {
button.textContent = "Send Message";
}, 2500);
});
});
}

});
