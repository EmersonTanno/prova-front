import { useEffect, useState } from "react";
import { PencilIcon, Trash, Check, X } from "lucide-react";
import { UseApi } from "../hooks/useAPI";
import type { Comodo } from "../types/comodo";
import type { Imovel } from "../types/imovel";

interface ComodoInfoProps {
  comodo: Comodo;
  onDeleteComodo: (comodoId: string) => void;
  onSaveComodo: (comodoId: string, updatedData: Partial<Comodo>) => void;
  imovelTrue: boolean;
  imovelId: string;
  onRemoveComodo: (imovelId: string, comodoId: string) => void;
}

function ComodoInfo({
  comodo,
  onDeleteComodo,
  onSaveComodo,
  imovelTrue,
  imovelId,
  onRemoveComodo,
}: ComodoInfoProps) {
  const api = UseApi();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [editNome, setEditNome] = useState(comodo.nome);

  useEffect(() => {
    async function fetchImovel() {
      if (comodo.imovelId) {
        try {
          const response = await api.getImovelById(comodo.imovelId.toString());
          setImovel(response.data);
        } catch (err) {
          console.error("Erro ao buscar imovel:", err);
        }
      }
    }

    fetchImovel();
  }, [comodo.imovelId]);

  function handleSave() {
    onSaveComodo(comodo._id, {
      nome: editNome,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditNome(comodo.nome);
  }

  return (
    <div
      key={comodo._id}
      className="bg-white rounded-xl shadow p-4 w-full max-w-md flex flex-row"
    >
      <div className="flex-1 flex flex-col gap-2">
        {isEditing ? (
          <>
            <input
              className="border p-1 rounded text-black bg-gray-100 focus:bg-white"
              value={editNome}
              onChange={(e) => setEditNome(e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="text-black font-bold">Comodo: {comodo.nome}</p>
            <p className="text-gray-500 italic">
              Imóvel: {imovel ? imovel._id : "Sem Imóvel"}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} title="Salvar">
              <Check />
            </button>
            <button onClick={handleCancel} title="Cancelar">
              <X />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              <PencilIcon />
            </button>
            <button
              title="Deletar comodo"
              onClick={
                imovelTrue
                  ? () => onRemoveComodo(imovelId, comodo._id)
                  : () => onDeleteComodo(comodo._id)
              }
              className="items-center justify-center flex"
            >
              <Trash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ComodoInfo;
