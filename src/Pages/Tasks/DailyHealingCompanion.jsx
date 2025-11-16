import React, { useState, useEffect } from "react";

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

  // CBT-based exercise cards
  const cbtExercises = [
    {
      title: "Thought Reframe",
      desc: "Write down a negative thought and replace it with a more balanced one.",
      tip: "Example: 'I always fail' → 'I’ve faced challenges before and learned each time.'",
    },
    {
      title: "Self-Compassion Break",
      desc: "Pause and acknowledge your feelings without judgment.",
      tip: "Put your hand on your chest and say: 'It’s okay to feel this way.'",
    },
    {
      title: "Gratitude Anchoring",
      desc: "Think of one thing that brought you small joy today.",
      tip: "It could be as simple as sunlight on your face or a kind word.",
    },
  ];

  return (
    <section className="min-h-screen py-20 px-6 py-24 sm:px-10 md:px-16 bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-3 flex items-center justify-center gap-2">
          Daily Healing Companion <span>🌿</span>
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Small, mindful actions each day can lead to big emotional healing.
        </p>

        {/* Affirmation */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10 border border-indigo-100 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">
            🦋 Daily Affirmation
          </h2>
          <p className="text-gray-800 italic text-lg">“{affirmation}”</p>
        </div>

        {/* Healing Tasks */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex justify-center gap-2 items-center">
          🌸 Your Healing Tasks
        </h2>
        <div className="grid gap-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={`flex items-center justify-between p-5 rounded-xl border shadow-sm transition backdrop-blur-sm ${
                completed.includes(t.id)
                  ? "bg-green-50 border-green-400"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-indigo-600">{t.category}</p>
                <p className="text-gray-700">{t.task}</p>
              </div>
              <button
                onClick={() => toggleComplete(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  completed.includes(t.id)
                    ? "bg-green-500 text-white"
                    : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                }`}
              >
                {completed.includes(t.id) ? "Done" : "Mark Done"}
              </button>
            </div>
          ))}
        </div>

        {/* CBT Exercises */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
            🧠 CBT-Based Exercises
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Try one of these small, guided reflections inspired by Cognitive
            Behavioral Therapy to help reset your thoughts and emotions.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {cbtExercises.map((ex, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-md border border-indigo-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left"
              >
                <h3 className="text-indigo-600 font-semibold text-lg mb-2">
                  {ex.title}
                </h3>
                <p className="text-gray-700 text-sm mb-3">{ex.desc}</p>
                <p className="text-indigo-500 text-sm italic">{ex.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            🌬️ Instant Relief Videos
          </h2>
          <div className="grid sm:grid-cols-2 gap-10 justify-center">
            {instantReliefVideos.map((vid, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-full max-w-[280px] mx-auto overflow-hidden aspect-[9/16] rounded-xl">
                  {playing === index ? (
                    <video
                      src={vid.src}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-xl"
                      onEnded={() => setPlaying(null)}
                    ></video>
                  ) : (
                    <>
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        onClick={() => setPlaying(index)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition"
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
                <p className="text-gray-700 text-sm mt-3 italic">
                  {vid.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyHealingCompanion;
