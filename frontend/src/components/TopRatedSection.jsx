import { MediaCard } from "./MediaCard"

export const TopRatedSection = ({ title, description, topRatedMedia }) => {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{description}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {topRatedMedia.map((media) => (
          <MediaCard key={`${media.mediaType}-${media.id}`} media={media} />
        ))}
      </div>
    </section>
  )
}