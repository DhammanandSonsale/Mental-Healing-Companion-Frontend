import React, { useEffect, useState } from "react";

const PIXELS_API_KEY = import.meta.env.VITE_PIXELS_API_KEY; // Make sure it's in your .env file

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Fetch videos & images from Pexels API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const videoQueries = ["meditation", "relaxation", "mindfulness"];
        const imageQueries = ["exercise", "yoga", "breathing"];

        // Fetch videos
        const videoRequests = videoQueries.map((query) =>
          fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=5`, {
            headers: { Authorization: PIXELS_API_KEY },
          }).then((res) => res.json())
        );

        // Fetch images
        const imageRequests = imageQueries.map((query) =>
          fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=5`, {
            headers: { Authorization: PIXELS_API_KEY },
          }).then((res) => res.json())
        );

        const [videoResults, imageResults] = await Promise.all([
          Promise.all(videoRequests),
          Promise.all(imageRequests),
        ]);

        // Format video data
        const formattedVideos = videoResults.flatMap((res) =>
          res.videos.map((vid) => ({
            title: vid.user?.name || "Mindful Video",
            description: "A guided session for mindfulness and relaxation.",
            type: "Video",
            duration: `${Math.floor(vid.duration / 60)}:${(vid.duration % 60)
              .toString()
              .padStart(2, "0")}`,
            rating: (4 + Math.random() * 0.9).toFixed(1),
            img: vid.video_pictures?.[0]?.picture || vid.image,
            link: vid.video_files?.[0]?.link,
            category: "Videos",
          }))
        );

        // Format image data
        const formattedImages = imageResults.flatMap((res, idx) =>
          res.photos.map((img) => ({
            title: img.photographer || "Wellness Exercise",
            description: "Inspiration for healthy and mindful activities.",
            type: "Image",
            duration: "-",
            rating: (4 + Math.random() * 0.9).toFixed(1),
            img: img.src?.medium,
            link: img.url,
            category: idx === 0 ? "Exercises" : "Mindfulness",
          }))
        );

        setResources([...formattedVideos, ...formattedImages]);
      } catch (err) {
        console.error("Error fetching from Pexels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter + search
  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm) ||
      res.description.toLowerCase().includes(searchTerm);
    const matchesFilter = filter === "All" || res.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen py-32 mx-6 sm:mx-10 md:mx-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            Mental Wellness Resources
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore a curated collection of videos and images from Pexels designed to support your journey to mindfulness, focus, and emotional balance.
          </p>

          {/* Search */}
          <div className="relative mt-10 max-w-xl mx-auto">
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search for resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              className="w-full pl-12 pr-6 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["All", "Videos", "Exercises", "Mindfulness"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Featured Resources
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 py-10">
              Loading resources from Pexels...
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((res, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <a href={res.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={res.img}
                        alt={res.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {res.type}
                      </div>
                    </a>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition">
                      {res.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {res.description}
                    </p>

                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>
                        <i className="fas fa-clock mr-1 text-indigo-500"></i>{" "}
                        {res.duration}
                      </span>
                      <span>
                        <i className="fas fa-star mr-1 text-yellow-400"></i>{" "}
                        {res.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredResources.length === 0 && !loading && (
                <p className="col-span-full text-center text-gray-500 py-10">
                  No resources found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resources;
