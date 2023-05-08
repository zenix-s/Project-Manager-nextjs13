"use client";
import ButtonMockups from "@/components/mockups/buttonMockups";
import { toast } from "react-hot-toast";
const page = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-scroll">
      <button
        onClick={() => {
          toast("Estado eliminado");
        }}
      >
        <h1>Page</h1>
      </button>
      <ButtonMockups />
    </div>
  );
};

export default page;
