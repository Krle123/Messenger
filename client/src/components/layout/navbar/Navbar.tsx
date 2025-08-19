interface QuestionTabsNavProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const Navbar = ({ activeTab, onTabChange }: QuestionTabsNavProps) => {
  const tabs = [
    { id: 1, label: "➕ Dodavanje pitanja" },
    { id: 2, label: "⌛ Ispitna pitanja" },
    { id: 3, label: "📃 Pregled pitanja" },
  ];

  return (
    <div className="backdrop-blur-xl bg-white/50 border border-white/50 rounded-xl mb-8 p-3 flex justify-center gap-4 shadow-md">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-blue-800/90 text-white"
              : "bg-white text-blue-700 border border-blue-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
