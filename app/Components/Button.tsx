import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  className,
  onClick,
  onKeyPress,
  disabled,
}: any) => {
  return (
    <button
      className={twMerge("px-4 py-2", className)}
      disabled={disabled}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      {children}
    </button>
  );
};

export default Button;
