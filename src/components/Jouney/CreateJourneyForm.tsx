import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Acao } from "@/services/ActionService";
import { CreateActionForm } from "../Action/CreateActionForm";
import { createJourney } from "@/services/JourneyService";

interface CreateJourneyFormProps {
  onCreate: (journey: {
    nome: string;
    descricao: string;
    acoes: string[];
  }) => void;
  onClose: () => void;
  availableActions: Acao[];
  refetchActions: () => void;
}

export const CreateJourneyForm = ({
  onCreate,
  onClose,
  availableActions,
  refetchActions,
}: CreateJourneyFormProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isCreateActionOpen, setIsCreateActionOpen] = useState(false);

  const toggleAction = (id: string) => {
    setSelectedActions((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || selectedActions.length === 0) return;

    try {
      // Criação da jornada no backend
      const newJourney = await createJourney({
        nome,
        descricao,
        acoes: selectedActions,
      });

      // Atualiza a lista de jornadas após a criação
      onCreate(newJourney);

      // Limpa o formulário e fecha o modal
      setNome("");
      setDescricao("");
      setSelectedActions([]);
      onClose();
    } catch (error) {
      console.error("Erro ao criar jornada:", error);
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Nova Jornada</DialogTitle>
            <DialogDescription>
              Dê um nome para sua jornada, adicione uma descrição e selecione as
              ações.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="descricao" className="text-right mt-2">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="block text-sm font-medium">Ações</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateActionOpen(true)}
                >
                  Nova Ação
                </Button>
              </div>

              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto p-4">
                {availableActions.map((acao) => (
                  <label
                    key={acao._id}
                    className={`flex justify-between items-start border rounded-2xl p-4 shadow-sm cursor-pointer transition-all duration-200 ${
                      selectedActions.includes(acao._id)
                        ? "border-blue-500 ring-2 ring-blue-300 bg-blue-50"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-base">{acao.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {acao.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        <span className="font-medium">Tipo:</span> {acao.tipo} •{" "}
                        <span className="font-medium">Payload:</span>{" "}
                        {acao.payload}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedActions.includes(acao._id)}
                      onChange={() => toggleAction(acao._id)}
                      className="mt-1"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              disabled={availableActions.length === 0}
            >
              Criar Jornada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de criar ação */}
      <CreateActionForm
        open={isCreateActionOpen}
        onClose={() => setIsCreateActionOpen(false)}
        onCreate={() => {
          setIsCreateActionOpen(false);
          refetchActions(); // Atualiza a lista de ações após criar uma nova ação
        }}
      />
    </>
  );
};
