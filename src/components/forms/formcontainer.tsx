import { SubmitButton } from "./submitbutton";

interface FormContainerProps {
  title: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  actionlabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  body,
  footer,
  actionlabel,
  onSubmit,
}) => {
  return (
    <section
      className="
      w-full
      h-full
      flex
      justify-center
      items-center
    "
    >
      <div
        className="
        w-full
        h-full
        md:w-1/2
        md:h-fit
        bg-slate-400
        rounded-lg
        p-4

      "
      >
        <div
          className="
          w-full
          h-16
          border-b-2
          border-slate-200/30
          mb-4
          "
        >
          <h2
            className="
            text-2xl
            text-center
            p-4
            uppercase
            tracking-widest
            text-white
            "
          >
            {title}
          </h2>
        </div>
        <div className="
        w-full
        h-full
        ">
          <form onSubmit={onSubmit}
            className="
            w-full
            h-full
            flex
            flex-col
            justify-center
            "
          >
            {body}

            <SubmitButton
              label={actionlabel}
              disabled={false}
            />
          </form>
        </div>
        {footer && <div className="form-footer">{footer}</div>}
      </div>
    </section>
  );
};
