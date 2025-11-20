// ------------------------------------------
// FLOATING CHATBOT WIDGET
// ------------------------------------------
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(
        "http://localhost:5678/webhook/f17cd22e-8b22-4b96-89e3-71ad3a481d1b/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.reply || "I’m here for you.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠ Unable to reach server." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full
        flex items-center justify-center text-3xl shadow-lg cursor-pointer hover:bg-indigo-700 transition"
        onClick={() => setOpen(!open)}
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 bg-white shadow-2xl rounded-2xl border overflow-hidden flex flex-col"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-indigo-600 text-white p-4 font-semibold">
            AI Emotional Support
          </div>

          <div className="p-3 h-80 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl text-sm max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-indigo-100 ml-auto text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-grow border rounded-lg px-3 py-2 text-sm"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 rounded-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;