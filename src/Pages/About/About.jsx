import React from "react";

const About = () => {
  return (
    <div className="py-20 mx-6 sm:mx-10 md:mx-16 text-gray-700 py-32">
      {/* 💜 Header Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-sm py-20 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-6">
          About Mental Healing Companion
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Your journey to mental wellness starts here. We’re dedicated to
          supporting you with compassionate care, evidence-based practices, and
          resources that create a safe, nurturing space for growth and healing.
        </p>
      </section>

      {/* 🧠 Mission & Values */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        {/* Mission */}
        <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-indigo-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To make mental health support accessible, compassionate, and
            stigma-free. We aim to empower individuals to overcome challenges,
            embrace mindfulness, and lead balanced, fulfilling lives.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-indigo-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67 10.94 4.61a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900">Our Values</h2>
          </div>
          <div className="space-y-3">
            <div>
              <span className="inline-block text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 rounded-md mr-2">
                Compassion
              </span>
              <span className="text-gray-600">Empathy in every interaction</span>
            </div>
            <div>
              <span className="inline-block text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 rounded-md mr-2">
                Confidentiality
              </span>
              <span className="text-gray-600">Your privacy is protected</span>
            </div>
            <div>
              <span className="inline-block text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 rounded-md mr-2">
                Empowerment
              </span>
              <span className="text-gray-600">
                Encouraging personal growth through mindful practice
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 💫 Our Story */}
      <div className="bg-gradient-to-br from-white to-indigo-50 p-10 md:p-16 rounded-2xl shadow-md hover:shadow-lg transition text-center max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-indigo-600 mb-6">
          Our Story
        </h2>
        <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
          <p>
            Founded in 2025, Mental Healing Companion was built on the belief
            that everyone deserves access to emotional well-being. Too many
            people struggle silently due to lack of resources, awareness, or
            support.
          </p>
          <p>
            Our mission was simple — to build a digital space where users can
            find healing tools, therapy guidance, and 24/7 emotional support in
            a safe, stigma-free environment.
          </p>
          <p>
            Today, we proudly serve users around the world, combining empathy,
            technology, and psychology to create a holistic path toward mental
            wellness.
          </p>
        </div>
      </div>

      {/* 🌍 CTA Section */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Join Us on the Journey to Healing
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Together, we can make mental health care more accessible, compassionate, and empowering.
        </p>
        <a
          href="/resources"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
        >
          Explore Our Resources
        </a>
      </div>
    </div>
  );
};

export default About;
