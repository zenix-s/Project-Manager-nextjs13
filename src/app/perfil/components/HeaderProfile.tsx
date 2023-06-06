import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";

interface HeaderProfileProps {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

const HeaderProfile = ({ isEditMode, setIsEditMode }: HeaderProfileProps) => {
  const onToggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="flex justify-end px-2 lg:px-8">
      <button
        className="btn-primary btn w-full sm:w-auto"
        onClick={onToggleMode}
      >
        <FiEdit className="mr-2" />
        Editar perfil
      </button>
    </div>
  );
};

export default HeaderProfile;
