import { useState } from "react";
import { Film } from "lucide-react";

export const ImageCard = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-white/5 ${className}`}>
        <Film className="w-12 h-12 text-gray-500 dark:text-gray-400 opacity-50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
