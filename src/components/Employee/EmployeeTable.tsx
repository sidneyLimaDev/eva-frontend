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
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";

interface EmployeeTableComponentProps {
  employee: Employee[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmployeeTableComponent: React.FC<EmployeeTableComponentProps> = ({
  employee,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="shadow-lg bg-white mb-6">
      <CardHeader>
        <div>
          <CardTitle>Lista de colaboradores</CardTitle>
          <CardDescription>
            Veja todos os colaboradores cadastrados no sistema.
          </CardDescription>
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
            {employee.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell className="font-medium">{employee.nome}</TableCell>
                <TableCell className="font-medium">{employee.cargo}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.telefone}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                   className="cursor-pointer"
                    onClick={() => employee._id && onEdit(employee._id)}
                  >
                    <Edit className="w-4 h-4 text-black"/>
                  </Button>
                  <Button
                  variant="ghost"
                   className="cursor-pointer"
                    onClick={() => employee._id && onDelete(employee._id)}
                  >
                    <Trash className="w-4 h-4 text-destructive" size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
