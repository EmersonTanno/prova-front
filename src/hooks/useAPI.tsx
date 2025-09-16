/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const UseApi = () => ({
  createComodo: async (comodo: string) => {
    const payload: any = {
      nome: comodo,
    };
    return await axios.post("http://localhost:3000/comodos", payload);
  },
});
