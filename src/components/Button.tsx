import React, { ReactNode } from "react";

interface ButtonProps {
  /** Optional ID for the button element */
  id?: string;
  /** Text to display in the button */
  title: string;
  /** Optional icon to display on the right side of the text */
  rightIcon?: ReactNode;
  /** Optional icon to display on the left side of the text */
  leftIcon?: ReactNode;
  /** Additional CSS classes to apply to the button container */
  containerClass?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * A reusable button component with hover animations and optional icons
 */
const Button: React.FC<ButtonProps> = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass = "",
  onClick,
}): JSX.Element => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
