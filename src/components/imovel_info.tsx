import { ArrowRight, PencilIcon, Trash } from "lucide-react";
import type { Imovel } from "../types/imovel";
import { useNavigate } from "react-router-dom";

interface ImovelInfoProps {
  imovel: Imovel;
  onDeleteImovel: (comodoId: string) => void;
}

function ImovelInfo({ imovel, onDeleteImovel }: ImovelInfoProps) {
  const navigate = useNavigate();
  function onEditClick() {
    const query = new URLSearchParams();
    query.set("imovelId", imovel._id);
    navigate(`/imovel?${query}`);
  }

  return (
    <div
      key={imovel._id}
      className="bg-white rounded-xl shadow p-4 w-full max-w-md flex flex-row"
    >
      <div className="flex flex-col flex-1 justify-between w-1/2">
        <h1 className="text-black">{imovel.endereco}</h1>
        <p className="text-black">{imovel.descricao}</p>
        <p className="text-black">
          {imovel.dataCompra
            ? imovel.dataCompra.toString()
            : "Sem data de compra"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        (
        <>
          <button onClick={onEditClick}>
            <ArrowRight />
          </button>
          <button
            title="Deletar imovel"
            onClick={() => onDeleteImovel(imovel._id)}
            className="items-center justify-center flex"
          >
            <Trash />
          </button>
        </>
        )
      </div>
    </div>
  );
}

export default ImovelInfo;
