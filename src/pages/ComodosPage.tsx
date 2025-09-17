import { useEffect, useState } from "react";
import { UseApi } from "../hooks/useAPI";
import type { Comodo } from "../types/comodo";
import ComodosList from "../components/comodo_list";

function ComodosPage() {
  const useApi = UseApi();
  const [name, setName] = useState("");
  const [comodos, setComodos] = useState<Comodo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComodos() {
      try {
        const response = await useApi.getAllComodos();
        setComodos(response.data);
      } catch (err) {
        console.error("Erro ao carregar comodos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchComodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return alert("Preencha o campo!");

    try {
      await useApi.createComodo(name);
      const response = await useApi.getAllComodos();
      setComodos(response.data);
      setName("");
    } catch (error) {
      console.error("Erro ao adicionar comodo:", error);
      alert("Erro ao adicionar comodo");
    }
  };

  return (
    <div className="w-screen h-screen g-gray-600 flex flex-row">
      <div className=" w-1/2 h-screen flex flex-col justify-center items-center gap-3">
        <h1 className="font-bold text-white">Comodos</h1>
        <div className=" w-1/2 gap-2 justify-center items-center flex flex-col">
          <form
            className="gap-2 justify-center items-center flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="comodo"
              placeholder="Informe o nome do comodo"
              className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-xl"
            >
              <p>Submit</p>
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-screen">
        <ComodosList
          comodos={comodos}
          setComodos={setComodos}
          loading={loading}
          imovel={false}
          imovelId={""}
        ></ComodosList>
      </div>
    </div>
  );
}

export default ComodosPage;
