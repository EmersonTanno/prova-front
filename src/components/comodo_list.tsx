import { UseApi } from "../hooks/useAPI";
import type { Comodo } from "../types/comodo";
import ComodoInfo from "./comodo_info";

interface ComodoListProps {
  comodos: Comodo[];
  setComodos: (comodos: Comodo[]) => void;
  loading: boolean;
  imovel: boolean;
  imovelId: string;
}

function ComodosList({
  comodos,
  setComodos,
  loading,
  imovel,
  imovelId,
}: ComodoListProps) {
  const api = UseApi();

  async function onDeleteComodo(comodoId: string) {
    await api.deleteComodo(comodoId);
    console.log("deleted");
    const response = await api.getAllComodos();
    setComodos(response.data);
  }

  async function onRemoveComodo(imovelId: string, comodoId: string) {
    await api.removeComodo(imovelId, comodoId);
    console.log("removed");
    const response = await api.getAllComodosByImovel(imovelId);
    setComodos(response.data);
  }

  async function onSaveComodo(comodoId: string, updatedData: Partial<Comodo>) {
    try {
      await api.updateComodo(comodoId, updatedData);
      const response = await api.getAllComodos();
      setComodos(response.data);
    } catch (err) {
      console.error("Erro ao atualizar comodo:", err);
      alert("Erro ao atualizar comodo");
    }
  }

  if (loading) {
    return (
      <div className="w-1/2 h-screen flex items-center justify-center text-white">
        Carregando comodos...
      </div>
    );
  }

  return (
    <div className="w-1/2 h-screen flex flex-col items-center p-6 gap-4 overflow-y-auto">
      <h2 className="text-white text-xl font-bold mb-4">Lista de Comodos</h2>
      {comodos.length > 0 ? (
        comodos.map((comodo) => (
          <ComodoInfo
            key={comodo._id}
            comodo={comodo}
            onDeleteComodo={onDeleteComodo}
            onSaveComodo={onSaveComodo}
            imovelTrue={imovel}
            imovelId={imovelId}
            onRemoveComodo={onRemoveComodo}
          />
        ))
      ) : (
        <p className="text-white">Nenhum comodo encontrado.</p>
      )}
    </div>
  );
}

export default ComodosList;
