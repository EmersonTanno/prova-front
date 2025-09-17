/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { Comodo } from "../types/comodo";
import type { Imovel } from "../types/imovel";

export const UseApi = () => ({
  createComodo: async (comodo: string) => {
    const payload: any = {
      nome: comodo,
    };
    return await axios.post("http://localhost:3000/comodos", payload);
  },

  getAllComodos: async () => {
    return await axios.get("http://localhost:3000/comodos");
  },

  updateComodo: async (id: string, updatedData: Partial<Comodo>) => {
    return await axios.put(`http://localhost:3000/comodos/${id}`, updatedData);
  },

  deleteComodo: async (id: string) => {
    return await axios.delete(`http://localhost:3000/comodos/${id}`);
  },

  getAllComodosWhithoutImovel: async () => {
    return await axios.get("http://localhost:3000/comodos/without/imovel");
  },

  getAllComodosByImovel: async (imovelId: string) => {
    return await axios.get(`http://localhost:3000/comodos/imovel/${imovelId}`);
  },

  createImovel: async (imovel: Partial<Imovel>) => {
    const payload: any = {
      descricao: imovel.descricao,
      endereco: imovel.endereco,
      dataCompra: imovel.dataCompra,
    };
    return await axios.post("http://localhost:3000/imoveis", payload);
  },

  getAllImoveis: async () => {
    return await axios.get(`http://localhost:3000/imoveis`);
  },

  getImovelById: async (imovelId: string) => {
    return await axios.get(`http://localhost:3000/imoveis/${imovelId}`);
  },

  deleteImovel: async (id: string) => {
    return await axios.delete(`http://localhost:3000/imoveis/${id}`);
  },

  addComodo: async (id: string, comodoId: string) => {
    return await axios.patch(
      `http://localhost:3000/imoveis/addComodo/${id}/${comodoId}`
    );
  },

  removeComodo: async (id: string, comodoId: string) => {
    return await axios.patch(
      `http://localhost:3000/imoveis/removeComodo/${id}/${comodoId}`
    );
  },

  updateImovel: async (id: string, updatedData: Partial<Imovel>) => {
    return await axios.put(`http://localhost:3000/imoveis/${id}`, updatedData);
  },
});
