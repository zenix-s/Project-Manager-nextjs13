"use client";
import { useState, useEffect, useRef } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

interface SelectOptionProps {
  id: number;
  value: number;
  label: string;
  selected?: boolean;
}

interface SelectProps {
  idTask: number;
  values: SelectOptionProps[];
  onChange?: (value: string) => void;
}

const ClickOutsideSelector: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  uniqueSelectorId: string;
}> = ({ isOpen, setIsOpen, uniqueSelectorId, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return <div ref={ref}>{children}</div>;
};

const Select = ({ idTask, values, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    values.find((value) => value.selected)?.value
  );

  const UniqueSelectorId = "select-" + idTask.toString();

  return (
    <div className="w-64">
      <ClickOutsideSelector
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        uniqueSelectorId={UniqueSelectorId}
      >
        <div className="relative flex w-full flex-col">
          <button
            type="button"
            className="relative flex w-full items-center justify-between rounded-md border border-white/50 px-4 py-4 text-left text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div>{values.find((value) => value.value === selected)?.label}</div>
            <div>
              {isOpen ? (
                <VscChevronUp className="" />
              ) : (
                <VscChevronDown className="" />
              )}
            </div>
          </button>
          <div className={`relative`}>
            <div
              className={`absolute z-10 
            ${isOpen ? "block" : "hidden"} 
            left-0 top-0 w-full rounded-md border border-white/50 bg-white px-2 py-4 text-black`}
            >
              {values.map((value) => (
                <button
                  key={value.id}
                  type="button"
                  className="w-full overflow-x-hidden rounded-md px-2 py-1 text-left hover:bg-gray-100"
                  onClick={() => {
                    setSelected(value.value);
                    setIsOpen(false);
                    if (onChange) {
                      onChange(value.value.toString());
                    }
                  }}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ClickOutsideSelector>
    </div>
  );
};

export default Select;
