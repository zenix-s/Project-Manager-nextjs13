import { BsSave } from "react-icons/bs";
import { CiEdit, CiSaveDown1 } from "react-icons/ci";
import { FiEdit, FiSave } from "react-icons/fi";

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
        {isEditMode ? (
          <>
            <FiSave className="mr-2" />
            <span>Guardar perfil</span>
          </>
        ) : (
          <>
            <FiEdit className="mr-2" />
            <span>Editar perfil</span>
          </>
        )}
      </button>
    </div>
  );
};

export default HeaderProfile;
