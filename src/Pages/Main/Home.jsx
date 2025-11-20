import React from "react";
import "./Home.css";

const MentalHealthPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const resources = [
    {
      icon: "fas fa-brain",
      title: "CBT-Based Exercises",
      desc: "Interactive worksheets and reflection prompts to help you reshape negative thought patterns.",
      link: "/dailyhealing",
    },
    {
      icon: "fas fa-book-open",
      title: "Resource Library",
      desc: "Access a growing collection of articles, videos, and tools from trusted mental health experts.",
      link: "/resources",
    },
    {
      icon: "fas fa-robot",
      title: "24/7 AI Emotional Support",
      desc: "Chat anytime with our compassionate AI companion — your safe space to talk and feel understood.",
      link: "/ai",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Create Your Personal Profile",
      text: "Sign up and complete a brief assessment to help us understand your needs and goals for mental wellness.",
    },
    {
      num: 2,
      title: "Explore Personalized Resources",
      text: "Receive customized recommendations for articles, exercises, and tools based on your specific situation.",
    },
    {
      num: 3,
      title: "Practice Daily Mindfulness",
      text: "Engage with guided meditations, breathing exercises, and journaling prompts to build mental resilience.",
    },
    {
      num: 4,
      title: "Track Your Progress",
      text: "Monitor your mental wellness journey with our intuitive tracking tools and celebrate your improvements.",
    },
  ];

  const blogs = [
    {
      img: "assets/images/Blog1.jpeg",
      title: "Creating a Mindful Morning Routine",
      desc: "Start your day with clarity and calm — learn easy ways to bring mindfulness into your mornings.",
      link: "https://www.behavioralessentials.com/resources/how-to-create-a-mindful-morning-routine", // Mindful.org
    },
    {
      img: "assets/images/Blog2.jpeg",
      title: "Understanding and Managing Anxiety",
      desc: "Discover simple, science-based methods to calm your mind and take back control over anxious thoughts.",
      link: "https://www.psychologytoday.com/us/basics/anxiety", // Psychology Today
    },
    {
      img: "assets/images/Blog3.jpeg",
      title: "The Power of Self-Compassion",
      desc: "Learn how treating yourself kindly can improve mental health, motivation, and resilience.",
      link: "https://www.health.harvard.edu/mind-and-mood/the-power-of-self-compassion", // Harvard Health
    },
  ];


  return (
    <>
      {/* 🌿 HERO SECTION */}
      <section className="bg-gradient-to-b from-indigo-50 via-white to-white py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-16 px-6 md:px-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug mb-4">
              Find Peace in Your Mental Health Journey
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Your compassionate companion for mental wellness, providing
              support, resources, and guidance whenever you need it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {!user && (
                <a
                  href="/login"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
                >
                  Get Started
                </a>
              )}
              <a
                href="/resources"
                className="bg-teal-500 text-white px-6 py-3 rounded-full shadow hover:bg-teal-600 transition"
              >
                Explore Resources
              </a>
            </div>
            
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/assets/images/sun.jpg"
              alt="Mental Health"
              className="w-80 md:w-96 rounded-2xl shadow-xl animate-bounce-slow"
            />
          </div>
        </div>
      </section>

      {/* 🧠 QUIZ CTA */}
      <section className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-center py-16 px-6 my-16 rounded-3xl max-w-5xl mx-auto shadow-xl">
        <h2 className="text-3xl font-bold mb-4">
          Find Out What Your Mind Needs
        </h2>
        <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
          Take our quick mental wellness quiz to discover personalized insights,
          tools, and guidance for your emotional health.
        </p>
        <a
          href="/questionaire"
          className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Take the Free Quiz
        </a>
      </section>

      {/* 📚 RESOURCES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Our Wellness Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Practical tools and expert-curated guides to help you take the next
            step in your healing journey.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow hover:-translate-y-2 transition text-left"
              >
                <i className={`${r.icon} text-3xl text-indigo-600 mb-4`}></i>
                <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
                <p className="text-gray-600 mb-4">{r.desc}</p>
                <a
                  href={r.link}
                  className="text-teal-500 font-semibold hover:underline"
                >
                  Explore →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 CBT EXERCISES */}
      <section
        id="cbt-section"
        className="py-20 mx-16 flex flex-col md:flex-row items-center justify-center gap-16"
      >
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            CBT-Based Exercises
          </h2>
          <p className="text-gray-600 mb-6">
            Build emotional resilience through interactive exercises grounded in
            Cognitive Behavioral Therapy (CBT).
          </p>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li>✔ Identify and reframe unhelpful thoughts</li>
            <li>✔ Practice gratitude and mindfulness journaling</li>
            <li>✔ Track progress with guided prompts</li>
          </ul>
          
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="assets/images/Exercise.jpg"
            alt="CBT Exercise"
            className="rounded-2xl shadow-xl w-[420px] animate-float"
          />
        </div>
      </section>

      {/* 📘 LIBRARY SECTION */}
      <section
        id="library-section"
        className="py-20 bg-gray-50 flex flex-col md:flex-row-reverse items-center justify-center gap-16 "
      >
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left mx-16">
          <h2 className="text-3xl font-bold mb-4">Resource Library</h2>
          <p className="text-gray-600 mb-6">
            Learn, grow, and heal with carefully selected guides, stories, and
            techniques from mental health experts.
          </p>
          <div className="flex justify-center md:justify-start gap-6 text-teal-600 font-medium mb-6">
            <p>🧠 Coping Skills</p>
            <p>🧘‍♀️ Meditation</p>
            <p>💖 Self-Care</p>
          </div>
          
        </div>

        {/* Image (Left on Desktop) */}
        <div className="md:w-1/2 flex justify-center mx-16 animate-float">
          <img
            src="assets/images/Resources.jpg"
            alt="Library"
            className="rounded-2xl shadow-lg w-[420px] animate-fade-in-up "
          />
        </div>
      </section>

      {/* 🤖 AI SUPPORT */}
      <section
        id="ai-section"
        className="py-20 mx-16 flex flex-col md:flex-row items-center justify-center gap-16"
      >
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            24/7 AI Emotional Support
          </h2>
          <p className="text-gray-600 mb-6">
            Need someone to talk to? Our AI companion listens, comforts, and
            helps you find clarity — anytime, anywhere.
          </p>
          <ul className="space-y-3 text-gray-600 mb-6">
            <li>💬 Private, non-judgmental conversations</li>
            <li>🌙 Available 24/7 whenever you need support</li>
            <li>🛡️ Safe and confidential chats</li>
          </ul>
            
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center animate-float">
          <img
            src="assets/images/Support.png"
            alt="AI Support"
            className="rounded-2xl shadow-xl w-[420px] animate-fade-in-up"
          />
        </div>
      </section>

      {/* ✨ FEATURES */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How We Support You
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover the tools and resources designed to help you on your mental
          health journey.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 container mx-auto px-6">
          {[
            {
              icon: "fa-heart",
              title: "Daily Wellness Check",
              desc: "Track your mood daily to understand emotional patterns.",
            },
            {
              icon: "fa-comments",
              title: "Supportive Community",
              desc: "Connect with others who understand what you're going through.",
            },
            {
              icon: "fa-book",
              title: "Resource Library",
              desc: "Access a collection of tools created by mental health professionals.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow hover:-translate-y-2 transition"
            >
              <i className={`fas ${f.icon} text-3xl text-indigo-600 mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🪜 HOW IT WORKS */}
      <section className="py-20 mx-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Your Journey to Mental Wellness
          </h2>
          <p className="text-gray-600 mb-12">
            A simple, supportive path to better mental health.
          </p>

          <div className="grid md:grid-cols-2 gap-12 text-left justify-center">
            {steps.map((s) => (
              <div
                key={s.num}
                className="flex items-start gap-4 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Step Number Circle */}
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg shrink-0">
                  {s.num}
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {s.title}
                  </h3>
                  <p className="text-gray-600">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIALS */}
      {/* <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Stories from Our Community</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Hear from people who have found support and growth through Serene
          Mind.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow text-left">
              <i className="fas fa-quote-right text-yellow-400 text-2xl mb-4"></i>
              <p className="italic text-gray-600 mb-6">{t.text}</p>
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/Author.jpeg"
                  alt={t.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* 📰 BLOG */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Insights for a Calmer Mind</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore articles that bring you gentle guidance and expert-backed tips
          for mental wellness.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow overflow-hidden hover:-translate-y-2 transition text-left"
            >
              <img
                src={b.img}
                alt={b.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-600 mb-4">{b.desc}</p>
                <a
                  href={b.link}
                  className="text-teal-500 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌈 FINAL CTA */}
      <section className="bg-gradient-to-tr from-indigo-500 to-teal-400 text-white text-center py-20 px-6 rounded-3xl max-w-6xl mx-auto mb-20 shadow-xl">
        <h2 className="text-4xl font-bold mb-4">
          Begin Your Journey to Mental Wellness Today
        </h2>
        <p className="text-indigo-100 mb-8">Join Mental Healing Companion</p>

        {user ? (
          <a
            href="/resources"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-100 transition"
          >
            Explore Now
          </a>
        ) : (
          <a
            href="/login"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-100 transition"
          >
            Create Free Account
          </a>
        )}
    </section>

    </>
  );
};

export default MentalHealthPage;
