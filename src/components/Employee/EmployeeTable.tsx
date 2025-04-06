import React from "react";
import { Employee } from "../../services/EmployeeService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface EmployeeTableComponentProps {
  employee: Employee[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmployeeTableComponent: React.FC<EmployeeTableComponentProps> = ({
  employee,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
}) => {
  const filteredEmployees = employee.filter(
    (employee) =>
      employee.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-lg bg-white mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Lista de colaboradores</CardTitle>
            <CardDescription>
              Veja todos os colaboradores cadastrados no sistema.
            </CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar colaboradores..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.nome}</TableCell>
                <TableCell className="font-medium">{employee.cargo}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.telefone}</TableCell>
                <TableCell>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                    onClick={() => onEdit(employee)}
                  >
                    Editar
                  </button>
                  <button
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => onDelete(employee._id)}
                  >
                    Deletar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
