export const DetailStatGrid = ({ stats }) => {
  
  return (
    <section className="flex flex-wrap justify-evenly items-center gap-4 px-4 md:px-6">
      {stats.map(({ icon: Icon, label, value, sub, className }) => (
        <div
          key={label}
          className="bg-[#141414] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-6 w-full sm:w-60 max-h-20"
        >
          <div className="bg-[#fbbf24]/10 rounded-xl p-2.5 shrink-0">
            <Icon className="w-5 h-5 text-[#fbbf24]" />
          </div>
          <div>
            <p className="text-xs uppercase text-gray-400">{label}</p>
            <p
              className={`text-sm font-semibold ${className ? className : "text-white"}`}
            >
              {value}
            </p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
