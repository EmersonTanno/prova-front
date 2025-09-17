import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UseApi } from "../hooks/useAPI";
import type { Imovel } from "../types/imovel";
import type { Comodo } from "../types/comodo";
import ComodosList from "../components/comodo_list";
import { ArrowLeftIcon } from "lucide-react";

function ImovelPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const imovelId = searchParams.get("imovelId");
  const useApi = UseApi();
  const [imovelDescricao, setImovelDescricao] = useState("");
  const [imovelData, setImovelData] = useState("");
  const [imovelEndereco, setImovelEndereco] = useState("");
  const [comodoId, setComodoId] = useState("");
  const [comodos, setComodos] = useState<Comodo[]>([]);
  const [comodosEmpty, setComodosEmpty] = useState<Comodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comodoId) return alert("Selecione um comodo");

    try {
      await useApi.addComodo(imovelId ? imovelId : "", comodoId);

      const response = await useApi.getAllComodosByImovel(
        imovelId ? imovelId : ""
      );
      setComodos(response.data);

      const response2 = await useApi.getAllComodosWhithoutImovel();
      setComodosEmpty(response2.data);

      setComodoId("");
    } catch (error) {
      console.error("Erro ao adicionar comodo ao imóvel:", error);
      alert("Erro ao adicionar comodo");
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

    async function fetchComodos() {
      try {
        const response = await useApi.getAllComodosByImovel(
          imovelId ? imovelId : ""
        );
        setComodos(response.data);
      } catch (err) {
        console.error("Erro ao carregar comodos:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchComodosEmpty() {
      try {
        const response = await useApi.getAllComodosWhithoutImovel();
        setComodosEmpty(response.data);
      } catch (err) {
        console.error("Erro ao carregar comodos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImoveis();
    fetchComodos();
    fetchComodosEmpty();
  }, []);

  function onEditClick() {
    const query = new URLSearchParams();
    query.set("imovelId", imovelId ? imovelId : "");
    navigate(`/edit?${query}`);
  }

  function onReturnClick() {
    navigate(`/`);
  }

  return (
    <div className="w-screen h-screen g-gray-600 flex flex-row">
      <div className="flex flex-col w-1/2 h-screen justify-center items-center gap-2">
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-black">Imóvel</h1>
          <p>Descrição: {imovelDescricao}</p>
          <p>Data Compra: {imovelData ? imovelData : "Sem data de compra"}</p>
          <p>Endereço: {imovelEndereco}</p>
        </div>
        <div className="flex felx-col w-1/2 h-1/2 justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full h-1/2 flex flex-col justify-center items-center gap-4 p-4 rounded-xl gap-2"
          >
            <select
              name="comodo"
              className="border-2 p-2 rounded-2xl border-black w-full bg-gray-100 text-black focus:bg-white"
              value={comodoId}
              onChange={(e) => setComodoId(e.target.value)}
            >
              <option value="">Selecione um Comodo</option>
              {comodosEmpty.map((comodo) => (
                <option key={comodo._id} value={comodo._id}>
                  {comodo.nome}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Adicionar imóvel
            </button>
          </form>
        </div>
        <button
          onClick={onEditClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Editar Imóvel
        </button>
        <button onClick={onReturnClick}>
          <ArrowLeftIcon />
        </button>
      </div>
      <div className="flex flex-col w-1/2 h-screen items-center justify-center">
        <ComodosList
          comodos={comodos}
          setComodos={setComodos}
          loading={loading}
          imovel={true}
          imovelId={imovelId ? imovelId : ""}
        ></ComodosList>
      </div>
    </div>
  );
}

export default ImovelPage;
