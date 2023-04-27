import Button from "../button";
import { useCallback, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
interface FormContainerProps {
  title: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  actionlabel: string;
  visible?: boolean;
  onClose?: () => void;
}

const ModalContainer: React.FC<FormContainerProps> = ({
  title,
  body,
  footer,
  actionlabel,
  visible,
  onClose,
}) => {
  return (
    <section
      className={`absolute left-0 top-0 z-[100] bg-neutral-500/30 
    ${visible ? "flex" : "hidden"}
    h-full w-full items-center justify-center`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose && onClose();
        }
      }}
    >
      <div className="relative h-full w-full rounded-lg bg-slate-700 px-4 py-8 md:h-fit md:w-1/2  max-w-[600px]">
        <div className="absolute right-0 top-0 p-4">
          <Button
            label=""
            icon={CiCircleRemove}
            theme="dark"
            onClick={() => {
              onClose && onClose();
            }}
            center
            uppercase
            trasparent
          />
        </div>
        <div className=" mb-8  h-16 w-full  border-b-2 border-slate-200/30  ">
          <h2 className=" p-4 text-center text-2xl uppercase tracking-widest text-white ">
            {title}
          </h2>
        </div>
        <div className=" h-full w-full ">
          <div className=" flex h-full w-full flex-col justify-center ">
            {body}
          </div>
        </div>
        {footer && <div className="form-footer">{footer}</div>}
      </div>
    </section>
  );
};

export default ModalContainer;
