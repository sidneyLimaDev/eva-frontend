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
import { useState, useEffect } from "react";

interface CreateEmployeeFormProps {
  onCreate: (employee: {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
  }) => void;
  onUpdate: (
    id: string,
    employee: { nome: string; cargo: string; email: string; telefone: string }
  ) => void;
  onClose: () => void;
  employeeToEdit: {
    _id: string;
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
  } | null;
}

export const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({
  onCreate,
  onUpdate,
  onClose,
  employeeToEdit,
}) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Se for um colaborador a ser editado, preenche os campos com os dados existentes
  useEffect(() => {
    if (employeeToEdit) {
      setNome(employeeToEdit.nome);
      setCargo(employeeToEdit.cargo);
      setEmail(employeeToEdit.email);
      setTelefone(employeeToEdit.telefone);
    }
  }, [employeeToEdit]);

  const handleSubmit = () => {
    const newEmployee = { nome, cargo, email, telefone };
    if (employeeToEdit) {
      onUpdate(employeeToEdit._id, newEmployee); // Passando o ID corretamente para a função de atualização
    } else {
      onCreate(newEmployee); // Se for criação, chama o onCreate
    }
    setNome(""); // Limpa os campos após o envio
    setCargo("");
    setEmail("");
    setTelefone("");
    onClose(); // Fecha o formulário após a criação/atualização
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {employeeToEdit ? "Editar Colaborador" : "Criar Novo Colaborador"}
          </DialogTitle>
          <DialogDescription>
            {employeeToEdit
              ? "Atualize as informações do colaborador."
              : "Preencha os dados do colaborador e clique em salvar."}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cargo" className="text-right">
              Cargo
            </Label>
            <Input
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telefone" className="text-right">
              Telefone
            </Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            {employeeToEdit ? "Salvar Alterações" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
