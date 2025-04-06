import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { createAction } from "@/services/ActionService";

interface CreateActionFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export const CreateActionForm = ({
  open,
  onClose,
  onCreate,
}: CreateActionFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState("email");
  const [payload, setPayload] = useState("");

  const handleSubmit = async () => {
    if (!title || !description || !payload || !tipo) return;

    try {
      await createAction({
        title, 
        description, 
        tipo, 
        payload: Number(payload), 
      });

      setTitle("");
      setDescription("");
      setTipo("email");
      setPayload("");
      onCreate(); // Atualiza lista de ações no componente pai
      onClose();
    } catch (err) {
      console.error("Erro ao criar ação", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Nova Ação</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar uma nova ação. 

          </DialogDescription>

        </DialogHeader>
   
        <div className="grid gap-4 py-4">
          
          <div className="space-y-2">
                        <Label>Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} /> 
            
          </div>
         
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
           
          </div>
          
          <div className="space-y-2">
             <Label>Tipo</Label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
               <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Atraso (segundos)</Label>
            <Input
              type="number"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Criar Ação</Button>
        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
};
