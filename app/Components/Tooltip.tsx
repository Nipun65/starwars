interface TooltipProps {
  tooltipContent: string;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipContent }) => {
  return (
    <div className="absolute z-50 bottom-full my-1 group-hover:block hidden whitespace-normal break-words rounded-lg bg-white py-1 px-2 text-black text-center md:text-sm xs:text-xs">
      {tooltipContent}
    </div>
  );
};
export default Tooltip;
