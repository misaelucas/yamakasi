export default function Dashboard() {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-zinc-900 rounded-xl p-4 text-zinc-300 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Yamakasi</h2>
          <nav className="space-y-2">
            <div className="hover:text-white cursor-pointer">🏠 Home</div>
            <div className="hover:text-white cursor-pointer">🕘 Recent Topics</div>
          </nav>
        </aside>
  
        {/* Main Content */}
        <section className="flex-1 p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome to Yamakasi</h1>
            <p className="text-zinc-400">Your AI-powered learning companion.</p>
          </div>
  
          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl shadow">
              <h3 className="text-white font-semibold mb-2">Generate Flashcards</h3>
              <input
                type="text"
                placeholder="Enter a topic..."
                className="w-full bg-zinc-800 text-zinc-100 border border-zinc-700 rounded px-3 py-2"
              />
            </div>
  
            <div className="bg-zinc-900 p-4 rounded-xl shadow">
              <h3 className="text-white font-semibold mb-1">🕒 Study Time</h3>
              <p className="text-zinc-400">3h 20m this week</p>
            </div>
          </div>
  
          {/* Recent Topics */}
          <div className="bg-zinc-900 p-4 rounded-xl shadow">
            <h3 className="text-white font-semibold mb-2">Recent Topics</h3>
            <ul className="list-disc pl-6 text-zinc-400 space-y-1">
              <li>Networking</li>
              <li>IAM Policies</li>
              <li>MongoDB Aggregation</li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
  