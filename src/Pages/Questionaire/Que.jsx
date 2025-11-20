import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#60a5fa", "#34d399", "#a78bfa"];

const Questionnaire = () => {
  // 🧠 Section A: Anxiety
  const anxietyQuestions = [
    {
      title: "Anxious Mood",
      description: "Worries, anticipation of the worst, irritability.",
    },
    {
      title: "Tension",
      description: "Feelings of tension, restlessness, or difficulty relaxing.",
    },
    {
      title: "Fear of Situations",
      description:
        "Do you experience fear in public spaces, crowds, or being alone?",
    },
    {
      title: "Sleep Difficulties",
      description: "Trouble falling asleep, broken sleep, or waking up tired?",
    },
    {
      title: "Physical Symptoms",
      description: "Racing heart, sweating, trembling, or shortness of breath?",
    },
  ];

  // 💙 Section B: Depression
  const depressionQuestions = [
    { title: "Mood", description: "Feeling sad, empty, or hopeless?" },
    {
      title: "Interest and Pleasure",
      description: "Lost interest in things you usually enjoy?",
    },
    {
      title: "Energy Levels",
      description: "Do you feel fatigued or low energy?",
    },
    {
      title: "Self-Worth",
      description: "Do you feel worthless or guilty often?",
    },
    {
      title: "Future Outlook",
      description: "Do you feel hopeful or pessimistic about the future?",
    },
  ];

  // 🧩 States
  const [section, setSection] = useState("a");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const totalQuestions =
    section === "a" ? anxietyQuestions.length : depressionQuestions.length;

  const progress =
    ((questionIndex + 1 + (section === "b" ? anxietyQuestions.length : 0)) /
      (anxietyQuestions.length + depressionQuestions.length)) *
    100;

  // 🧮 Calculate score and level
  const computeResultPayload = () => {
    const allAnswers = Object.values(answers).map(Number);
    const totalScore = allAnswers.reduce((a, b) => a + b, 0);
    const maxScore =
      anxietyQuestions.length * 4 + depressionQuestions.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);

    let diagnosis = "";
    if (percentage < 25)
      diagnosis = "You appear to be in a good mental state 😊";
    else if (percentage < 50)
      diagnosis =
        "You might be experiencing mild stress or anxiety. Try mindfulness and self-care 💆‍♀️";
    else if (percentage < 75)
      diagnosis =
        "You may be showing moderate signs of anxiety or depression. Consider talking with a professional 🩺";
    else
      diagnosis =
        "You might be going through high levels of emotional distress. Professional support is strongly recommended ❤️‍🩹";

    let level = "genuine";
    if (percentage >= 75) level = "high";
    else if (percentage >= 50) level = "mid";

    const sectionA = anxietyQuestions.map((q, i) => ({
      question: q.title,
      answer: answers[`a-${i}`],
    }));
    const sectionB = depressionQuestions.map((q, i) => ({
      question: q.title,
      answer: answers[`b-${i}`],
    }));

    return {
      userId: user?._id,
      sectionA,
      sectionB,
      totalScore,
      percentage,
      diagnosis,
      level,
    };
  };

  // ✅ Handle Answer
  const handleAnswer = (value) => {
    setAnswers({ ...answers, [`${section}-${questionIndex}`]: value });
    setError("");
  };

  // ⏭️ Next / Previous
  const nextQuestion = () => {
    if (answers[`${section}-${questionIndex}`] === undefined) {
      setError("Please select an answer before proceeding.");
      return;
    }
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else if (section === "a") {
      setSection("b");
      setQuestionIndex(0);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else if (section === "b") {
      setSection("a");
      setQuestionIndex(anxietyQuestions.length - 1);
    }
  };

  // 📤 Submit Quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers[`${section}-${questionIndex}`] === undefined) {
      setError("Please select an answer before submitting.");
      return;
    }

    const payload = computeResultPayload();

    try {
      await axios.post("https://mental-healing-companion-backend.vercel.app/api/quiz/submit", payload);
      setResult(payload);
      setSubmitted(true);

      const res = await axios.get(
        `https://mental-healing-companion-backend.vercel.app/api/content/${payload.level}`
      );
      setSuggestions(res.data.content);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  // ✅ If submitted → show results
  if (submitted && result) {
    const aSum = result.sectionA.reduce(
      (s, x) => s + (Number(x.answer) || 0),
      0
    );
    const bSum = result.sectionB.reduce(
      (s, x) => s + (Number(x.answer) || 0),
      0
    );
    const remainder = Math.max(
      0,
      anxietyQuestions.length * 4 +
        depressionQuestions.length * 3 -
        (aSum + bSum)
    );

    const data = [
      { name: "Anxiety", value: aSum },
      { name: "Depression", value: bSum },
      { name: "Remaining", value: remainder },
    ];

    return (
      <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-teal-50 to-white flex flex-col items-center justify-center py-20 px-4 sm:px-6">
        <div className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl shadow-2xl p-10 sm:p-12 w-full max-w-4xl transition-all duration-300 hover:shadow-indigo-200">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            🧾 Your Personalized Mental Wellness Report
          </h1>
          <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
            This self-assessment helps you reflect on your emotional health.
            It’s not a medical diagnosis but a helpful first step toward
            awareness and growth 🌱
          </p>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16">
            {/* Pie Chart Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-teal-50 rounded-3xl p-6 shadow-inner flex flex-col items-center justify-center w-full lg:w-1/2">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                Emotional Balance Breakdown
              </h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend />
              </PieChart>
            </div>

            {/* Result Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg w-full lg:w-1/2 text-left relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-transparent to-teal-50 opacity-40" />
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Your Score:{" "}
                  <span className="text-indigo-600">{result.totalScore}</span>
                </h2>
                <p className="text-gray-700 mb-2">
                  Percentage:{" "}
                  <span className="font-medium text-teal-600">
                    {result.percentage}%
                  </span>
                </p>
                <p className="text-lg text-gray-800 italic mb-6">
                  {result.diagnosis}
                </p>

                {suggestions && (
                  <div className="space-y-5">
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-xl shadow-sm">
                      <h3 className="font-semibold text-indigo-700 mb-2">
                        {suggestions.title}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {suggestions.bullets.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {suggestions.actions.map((a, i) => (
                        <a
                          key={i}
                          href={a.href}
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
                        >
                          {a.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Main quiz view
  const currentQuestions =
    section === "a" ? anxietyQuestions : depressionQuestions;

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50 flex flex-col items-center justify-center py-24 px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 Quick Mental Health Check
          </h1>
          <p className="text-gray-600">
            A short self-assessment to help understand your current emotional
            well-being.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-teal-400 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>
              Section {section.toUpperCase()} • Question {questionIndex + 1} of{" "}
              {totalQuestions}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              {section === "a" ? "Section A: Anxiety" : "Section B: Depression"}
            </h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentQuestions[questionIndex].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {currentQuestions[questionIndex].description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {(section === "a" ? [0, 1, 2, 3, 4] : [0, 1, 2, 3]).map((val) => (
                <label
                  key={val}
                  className={`cursor-pointer rounded-xl border-2 p-4 text-center shadow-sm transition ${
                    answers[`${section}-${questionIndex}`] === val
                      ? "bg-indigo-500 text-white border-indigo-500 scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${section}-${questionIndex}`}
                    value={val}
                    onChange={() => handleAnswer(val)}
                    className="hidden"
                  />
                  <span className="block font-medium">{val}</span>
                  <span className="text-xs opacity-80">
                    {section === "a"
                      ? [
                          "Not at all",
                          "Mild",
                          "Moderate",
                          "Severe",
                          "Extremely",
                        ][val]
                      : ["Not at all", "Sometimes", "Often", "Always"][val]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          <div className="flex justify-between items-center">
            {(questionIndex > 0 || section === "b") && (
              <button
                type="button"
                onClick={prevQuestion}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                ← Previous
              </button>
            )}

            {section === "b" && questionIndex === totalQuestions - 1 ? (
              <button
                type="submit"
                className="ml-auto bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 shadow-md transition"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="ml-auto bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 shadow-md transition"
              >
                Next →
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Questionnaire;
