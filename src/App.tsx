import { useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { UseApi } from "./hooks/useAPI";
import type { Imovel } from "./types/imovel";
import ImovelList from "./components/imovel_list";

function App() {
  const useApi = UseApi();
  const navigate = useNavigate();

  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataCompra, setDataCompra] = useState("");

  function onComodosClick() {
    navigate(`/comodos`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descricao) return alert("Preencha o campo!");
    if (!endereco) return alert("Preencha o campo!");

    try {
      await useApi.createImovel({ descricao, endereco, dataCompra });
      const response = await useApi.getAllImoveis();
      setImoveis(response.data);
      setDescricao("");
      setEndereco("");
      setDataCompra("");
    } catch (error) {
      console.error("Erro ao adicionar imovel:", error);
      alert("Erro ao adicionar imovel");
    }
  };

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const response = await useApi.getAllImoveis();
        setImoveis(response.data);
      } catch (err) {
        console.error("Erro ao carregar imoveis:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImoveis();
  }, []);

  return (
    <div className="bg-gray-600 h-screen w-screen flex flex-row">
      <div className=" h-screen w-1/2 flex flex-col justify-center">
        <div className=" h-1/2 flex flex-col justify-center items-center">
          <h1>Imóveis</h1>
          <form
            className="gap-2 justify-center items-center flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="descricao"
              placeholder="Informe a descrição do imóvel"
              className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="text"
              name="endereco"
              placeholder="Informe o endereço do imóvel"
              className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <input
              type="date"
              name="data"
              className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
              value={dataCompra}
              onChange={(e) => setDataCompra(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-xl"
            >
              <p>Submit</p>
            </button>
          </form>
        </div>
        <div className=" h-1/8 flex justify-center items-center">
          <button onClick={onComodosClick}>Cômodos</button>
        </div>
      </div>
      <div className="h-screen w-1/2">
        <ImovelList
          imoveis={imoveis}
          setImoveis={setImoveis}
          loading={loading}
        ></ImovelList>
      </div>
    </div>
  );
}

export default App;
