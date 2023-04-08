
interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled,
}) => {

  return (
    <div className="
            w-full
            pt-4
            ">
              <button type="submit" name="submit" className="
              w-full
              p-3
              bg-slate-200
              text-slate-950
              rounded-lg
              text-lg
              uppercase
              tracking-widest
              hover:bg-slate-300
              transition duration-300
              ">
                {label}
              </button>
            </div>
  );
};