import { create } from "zustand";

import { UseUserProps } from "@/types";



const useUserData = create<UseUserProps>((set) => ({
  id: 0,
  name: "pepe",
  email: "adfhad",

}));


export default useUserData;
