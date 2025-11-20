import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 🧠 Get user info from localStorage (set during login)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser._id) {
          setError("User not found. Please log in again.");
          setLoading(false);
          return;
        }

        const userId = storedUser._id;
        const res = await fetch(`https://mental-healing-companion-backend.vercel.app/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  const { profile, analytics, activities } = data || {};
  const weeklyData = (analytics?.weeklyMoodData || []).map((d) => ({
    day: d.day,
    moodScore: Math.floor(Math.random() * 100), // Replace with real score later
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Sidebar - Profile Info */}
        <aside className="col-span-1 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          {profile ? (
            <div className="space-y-2">
              <p className="font-medium text-lg">{profile.name}</p>
              <p className="text-gray-500 text-sm">{profile.email}</p>
              <p className="text-gray-500 text-sm">
                Joined: {new Date(profile.createdAt).toDateString()}
              </p>
              <div className="mt-4 bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-lg font-semibold">Overall Wellness</p>
                <p className="text-3xl font-bold text-blue-600">
                  {profile.overallWellness || 0}%
                </p>
              </div>
            </div>
          ) : (
            <p>No profile data</p>
          )}
        </aside>

        {/* Main Dashboard */}
        <main className="col-span-3 space-y-6">
          {/* Overall Performance */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Overall Performance</h3>
              <p className="text-gray-600">
                {profile?.name || 'User'}'s current health score
              </p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600">
                {analytics?.overallWellness || 0}
              </p>
              <p className="text-sm text-gray-500">Avg Health Score</p>
            </div>
          </div>

          {/* Weekly Mood Data Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Mood Data</h3>
            {weeklyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="moodScore" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center">
                No analytics data available
              </p>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">Session Name</th>
                  <th className="p-2">Duration (min)</th>
                  <th className="p-2">Mood</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities && activities.length > 0 ? (
                  activities.map((act) => (
                    <tr key={act._id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{act.sessionName}</td>
                      <td className="p-2">{act.duration}</td>
                      <td className="p-2">{act.mood}</td>
                      <td className="p-2">{act.status}</td>
                      <td className="p-2">{new Date(act.date).toDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 p-4">
                      No recent activities
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
