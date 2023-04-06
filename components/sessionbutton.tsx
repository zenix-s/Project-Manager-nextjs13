import Image from "next/image";

interface optionProps {
  label: string;
  onClick: () => void;
  icon?: string;
}

const SessionButton = ({ label, onClick, icon }: optionProps) => {
  return (
    <div className="nav-item">
      <button onClick={onClick}>
        <Image src={icon} alt={label} width={20} height={20} />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default SessionButton;
