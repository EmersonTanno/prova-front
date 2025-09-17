import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UseApi } from "../hooks/useAPI";
import { ArrowLeftIcon } from "lucide-react";

function EditImovelPage() {
  const useApi = UseApi();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const imovelId = searchParams.get("imovelId");

  const [imovelData, setImovelData] = useState("");
  const [imovelEndereco, setImovelEndereco] = useState("");
  const [imovelDescricao, setImovelDescricao] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await useApi.updateImovel(
        imovelId ? imovelId : "",
        imovelDescricao,
        imovelEndereco,
        imovelData
      );
      setImovelData("");
      setImovelEndereco("");
      setImovelDescricao("");

      const query = new URLSearchParams();
      query.set("imovelId", imovelId ? imovelId : "");
      navigate(`/imovel?${query}`);
    } catch (error) {
      console.error("Erro ao adicionar imovel:", error);
      alert("Erro ao adicionar imovel");
    }
  };

  useEffect(() => {
    console.log(imovelId);
    async function fetchImoveis() {
      try {
        const response = await useApi.getImovelById(imovelId ? imovelId : "");
        const imovel = response.data;
        setImovelDescricao(imovel.descricao);
        setImovelData(imovel.data);
        setImovelEndereco(imovel.endereco);
      } catch (err) {
        console.error("Erro ao carregar imovel:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImoveis();
  }, []);

  function onReturnClick() {
    const query = new URLSearchParams();
    query.set("imovelId", imovelId ? imovelId : "");
    navigate(`/imovel?${query}`);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
      <h1>Editar Imóvel:</h1>
      <form
        className="gap-2 justify-center items-center flex flex-col"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="descricao"
          placeholder="Informe a descrição do imóvel"
          className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
          value={imovelDescricao}
          onChange={(e) => setImovelDescricao(e.target.value)}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Informe o endereço do imóvel"
          className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
          value={imovelEndereco}
          onChange={(e) => setImovelEndereco(e.target.value)}
        />
        <input
          type="date"
          name="data"
          className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black placeholder-gray-500 focus:bg-white"
          value={imovelData}
          onChange={(e) => setImovelData(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded-xl"
        >
          <p>Submit</p>
        </button>
      </form>
      <button onClick={onReturnClick}>
        <ArrowLeftIcon />
      </button>
    </div>
  );
}

export default EditImovelPage;
