import { IconType } from "react-icons";

interface UserSectionButtonProps {
  name: string;
  icon: IconType;
  onclick: () => void;
}

const UserSectionButton: React.FC<UserSectionButtonProps> = ({
  name,
  icon: Icon,
  onclick,
}) => {
  return (
    <div
      className="
        flex
        justify-start
        w-full
      "
    >
      <button
        onClick={onclick}
        className="
          flex
          items-center
          justify-start
          w-full
          p-4
          rounded-md
          hover:bg-white/20
          ease-in-out duration-100 
          uppercase
        "
      >
        {Icon && (
          <Icon
            className="
                mr-2
                text-gray-300
                text-2xl
              "
            height={24}
            width={24}
          />
        )}
        <span
          className="
            text-xl
            text-gray-300
          "
        >
          {name}
        </span>
      </button>
    </div>
  );
};

export default UserSectionButton;
