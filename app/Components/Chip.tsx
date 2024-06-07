import { twMerge } from "tailwind-merge";
import Tooltip from "./Tooltip";

const Chip = ({ children, className, tooltipContent }: any) => {
  return (
    <div className="relative group">
      <div
        className={twMerge(
          `rounded-lg border border-[#ffe81f] px-2 py-1 flex gap-2 items-center justify-center lg:text-base md:text-sm xs:text-xs`,
          className
        )}
      >
        {children}
      </div>
      <Tooltip tooltipContent={tooltipContent} />
    </div>
  );
};
export default Chip;
