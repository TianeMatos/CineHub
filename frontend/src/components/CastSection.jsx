export const CastSection = ({ cast }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-7 px-4 sm:px-12">
        Elenco Principal
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {cast.map((actor) => (
          <div
            key={actor.name}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#1f1f1f] mb-3 ring-1 ring-white/10 group-hover:ring-[#fbbf24]/30 transition-all">
              <img
                src={actor.photo}
                alt={actor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <p className="text-sm font-medium text-white px-2">{actor.name}</p>

            <p className="text-xs text-gray-400 px-2">{actor.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
