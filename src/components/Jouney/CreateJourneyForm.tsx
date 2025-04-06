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

interface CreateJourneyFormProps {
  onCreate: (journey: {
    nome: string;
    descricao: string;
    acoes: string[];
  }) => void;
  onClose: () => void;
  availableActions: Acao[];
}

export const CreateJourneyForm = ({
  onCreate,
  onClose,
  availableActions,
}: CreateJourneyFormProps) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const toggleAction = (id: string) => {
    setSelectedActions((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || selectedActions.length === 0) return;

    await onCreate({
      nome,
      descricao,
      acoes: selectedActions,
    });

    setNome("");
    setDescricao("");
    setSelectedActions([]);
    onClose();
  };

  return (
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
            <Label className="block text-sm font-medium">Ações</Label>
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
  );
};
