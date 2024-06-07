import { twMerge } from "tailwind-merge";

interface ContentLoaderProps {
  className?: string;
}

const ContentLoader: React.FC<ContentLoaderProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        "h-2.5 bg-gray-100 animate-pulse rounded-full w-6",
        className
      )}
    />
  );
};

export default ContentLoader;
