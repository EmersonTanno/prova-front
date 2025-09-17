import { UseApi } from "../hooks/useAPI";
import type { Imovel } from "../types/imovel";
import ImovelInfo from "./imovel_info";

interface ImovelListProps {
  imoveis: Imovel[];
  setImoveis: (imoveis: Imovel[]) => void;
  loading: boolean;
}

function ImovelList({ imoveis, setImoveis, loading }: ImovelListProps) {
  const api = UseApi();

  async function onDeleteImovel(comodoId: string) {
    await api.deleteImovel(comodoId);
    const response = await api.getAllImoveis();
    setImoveis(response.data);
  }

  if (loading) {
    return (
      <div className="w-1/2 h-screen flex items-center justify-center text-white">
        Carregando imoveis...
      </div>
    );
  }

  return (
    <div className="w-1/2 h-screen flex flex-col items-center p-6 gap-4 overflow-y-auto">
      <h2 className="text-white text-xl font-bold mb-4">Lista de Comodos</h2>
      {imoveis.length > 0 ? (
        imoveis.map((imovel) => (
          <ImovelInfo
            key={imovel._id}
            imovel={imovel}
            onDeleteImovel={onDeleteImovel}
          />
        ))
      ) : (
        <p className="text-white">Nenhum comodo encontrado.</p>
      )}
    </div>
  );
}

export default ImovelList;
