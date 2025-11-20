import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DailyHealingCompanion = () => {
  const [affirmation, setAffirmation] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const affirmations = [
      "You are healing, one gentle step at a time.",
      "Peace begins the moment you let go of what you can’t control.",
      "You deserve the same kindness you give to others.",
      "Every breath you take is a new beginning.",
    ];

    const dailyTasks = [
      {
        id: 1,
        category: "Mind",
        task: "Write down one thing you’re grateful for today.",
      },
      {
        id: 2,
        category: "Body",
        task: "Take a 5-minute mindful breathing break.",
      },
      {
        id: 3,
        category: "Soul",
        task: "Send a kind message to someone you appreciate.",
      },
    ];

    setAffirmation(
      affirmations[Math.floor(Math.random() * affirmations.length)]
    );
    setTasks(dailyTasks);
  }, []);

  const toggleComplete = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const instantReliefVideos = [
    {
      title: "Breathe In & Out",
      src: "/assets/videos/Breath.mp4",
      thumbnail: "/assets/images/breath.jpeg",
      description: "A gentle breathing video for quick calmness.",
    },
    {
      title: "Nature Calm",
      src: "/assets/videos/calm.mp4",
      thumbnail: "/assets/images/calm.jpeg",
      description: "Relax your eyes and mind with soothing nature visuals.",
    },
  ];

  const cbtExercises = [
    {
      title: "Thought Reframe",
      desc: "Write down a negative thought and replace it with a balanced one.",
      tip: "Example: 'I always fail' → 'I’ve learned from every challenge.'",
    },
    {
      title: "Self-Compassion Break",
      desc: "Pause and acknowledge your feelings without judgment.",
      tip: "'It’s okay to feel this way.'",
    },
    {
      title: "Gratitude Anchoring",
      desc: "Think of one thing that brought you small joy today.",
      tip: "Maybe sunlight, music, or a kind word.",
    },
  ];

  return (
    <section className="min-h-screen px-6 py-32 sm:px-10 md:px-16 bg-gradient-to-b from-indigo-100 via-white to-indigo-100">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-indigo-700 mb-3 flex justify-center items-center gap-3">
            Daily Healing Companion 🌿
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            A gentle space designed to help you heal through mindful actions,
            reflection, and calming experiences.
          </p>
        </motion.div>

        {/* AFFIRMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-indigo-200 mb-16"
        >
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            🦋 Daily Affirmation
          </h2>
          <p className="text-gray-900 text-xl italic">“{affirmation}”</p>
        </motion.div>

        {/* BENTO GRID TASKS */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          🌸 Your Healing Tasks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {tasks.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl shadow-lg border transition-all cursor-pointer hover:scale-[1.03] bg-white/80 backdrop-blur-lg ${
                completed.includes(t.id)
                  ? "border-green-500 bg-green-50"
                  : "border-indigo-200"
              }`}
              onClick={() => toggleComplete(t.id)}
            >
              <p className="font-semibold text-indigo-600 text-lg">
                {t.category}
              </p>
              <p className="text-gray-700 mt-2">{t.task}</p>

              <button
                className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition ${
                  completed.includes(t.id)
                    ? "bg-green-500 text-white"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {completed.includes(t.id) ? "Completed ✓" : "Mark Done"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* CBT EXERCISES */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          🧠 CBT-Based Exercises
        </h2>
        <p className="text-gray-600 text-center max-w-lg mx-auto mb-10">
          Practice small reflections that can gently shift your thoughts and
          emotions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {cbtExercises.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-white/80 border border-indigo-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition text-left"
            >
              <h3 className="text-indigo-600 text-xl font-semibold mb-2">
                {ex.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3">{ex.desc}</p>
              <p className="text-indigo-500 text-sm italic">{ex.tip}</p>
            </motion.div>
          ))}
        </div>

        {/* VIDEOS */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          🌬️ Instant Relief Videos
        </h2>

        <div className="grid sm:grid-cols-2 gap-12 justify-center">
          {instantReliefVideos.map((vid, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full max-w-[300px] overflow-hidden rounded-2xl shadow-xl border border-indigo-200">
                {playing === index ? (
                  <video
                    src={vid.src}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    onEnded={() => setPlaying(null)}
                  />
                ) : (
                  <>
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setPlaying(index)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <p className="text-gray-700 text-sm mt-3 italic text-center">
                {vid.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyHealingCompanion;
