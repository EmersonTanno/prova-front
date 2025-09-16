import { useState } from "react";
import { UseApi } from "../hooks/useAPI";

function ComodosPage() {
  const useApi = UseApi();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return alert("Preencha o campo!");

    try {
      await useApi.createComodo(name);

      setName("");
    } catch (error) {
      console.error("Erro ao adicionar comodo:", error);
      alert("Erro ao adicionar comodo");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-row">
      <div className="bg-black w-1/2 h-screen flex flex-col justify-center items-center gap-3">
        <h1 className="font-bold text-white">Comodos</h1>
        <div className=" w-1/2 gap-2 justify-center items-center flex flex-col">
          <form
            className="gap-2 justify-center items-center flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="curso"
              placeholder="Informe o curso"
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
    </div>
  );
}

export default ComodosPage;
