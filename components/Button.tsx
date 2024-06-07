import { KeyboardEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyUp?: KeyboardEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  onKeyUp,
  disabled,
}) => {
  return (
    <button
      className={twMerge("px-4 py-2", className)}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      {children}
    </button>
  );
};

export default Button;
