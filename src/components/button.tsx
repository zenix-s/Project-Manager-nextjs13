interface ButtonProps {
  text: string;
  onClick: () => void;
  theme: "light" | "dark";
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick,
  theme = "light" 
}) => {
  return (
    <button
      className={`
        ${theme === "light" ? "bg-neutral-800" : "bg-gray-100"}
        ${theme === "light" ? "text-white" : "text-black"}
        p-2
        rounded-md
        shadow-md
        hover:shadow-lg
        hover:bg-neutral-700
        hover:text-white
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;