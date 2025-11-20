import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;
      if (window.scrollY > 50) {
        header.style.background = "rgba(255,255,255,0.95)";
        header.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      } else {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formSuccess = document.getElementById("form-success");
  const contactForm = document.getElementById("contact-form");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  const res = await fetch("http://localhost:8080/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, message }),
  });

  const data = await res.json();

  if (data.success) {
    formSuccess.classList.remove("hidden");
    contactForm.reset();
    setTimeout(() => formSuccess.classList.add("hidden"), 4000);
  } else {
    alert("Something went wrong. Try again.");
  }
};

  return (
    <section className="py-32 mx-6 sm:mx-10 md:mx-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Have questions about our services or need support on your mental
            wellness journey? We're here to help. Reach out to our team using
            any of the methods below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Us a Message
            </h2>

            <div
              id="form-success"
              className="hidden bg-green-100 text-green-700 px-4 py-3 mb-4 rounded-lg text-sm"
            >
              ✅ Your message has been sent successfully!
            </div>

            <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[150px]"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full shadow hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-indigo-600 text-white rounded-2xl shadow-lg p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <p className="text-indigo-100 mb-8">
                Reach out to us using the contact methods below. Our support
                team is available Monday–Friday, 9am–5pm.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a
                      href="mailto:mentalhealth@gmail.com"
                      className="text-indigo-100 hover:underline"
                    >
                    mentalhealingcompanion@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <a
                      href="tel:+911234567890"
                      className="text-indigo-100 hover:underline"
                    >
                      (+91) 83085 603**
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-10">
              <h3 className="font-semibold mb-3">Connect With Us</h3>
              <div className="flex gap-4">
                {["facebook-f", "twitter", "instagram", "linkedin-in", "youtube"].map(
                  (icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-indigo-600 transition"
                    >
                      <i className={`fab fa-${icon}`}></i>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "How quickly can I expect a response?",
                a: "We respond to all inquiries within 24–48 business hours. For urgent matters, call our support line directly."
              },
              {
                q: "Do you offer in-person consultations?",
                a: "Yes, we offer both virtual and in-person consultations at our main office. You can choose your preference when booking."
              },
              {
                q: "Is my information kept confidential?",
                a: "Absolutely. All information is treated with strict confidentiality and used only to provide the best possible care."
              },
              {
                q: "How can I provide feedback?",
                a: "We value your feedback! Use this form, email us, or share your experience via your account dashboard."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
