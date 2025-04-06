import { useEffect, useState } from "react";
import {
  Employee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../../services/EmployeeService";
import { EmployeeTableComponent } from "./EmployeeTable";
import { CreateEmployeeForm } from "./CreateEmployeeForm";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export const EmployeeList = () => {
  const [employeees, setEmployeees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const fetchEmployeees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployeees(data);
    } catch (err) {
      setError("Erro ao carregar colaboradores");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (employee: {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
  }) => {
    try {
      await createEmployee(employee);
      fetchEmployeees();
      setShowForm(false);
    } catch (err) {
      setError("Erro ao criar colaborador");
    }
  };

  const handleEditEmployee = async (employee: string) => {
    console.log("Editando colaborador com ID:", employee._id);
    try {
      const employeeData = await getEmployeeById(employee._id);
      if (employeeData) {
        setEmployeeToEdit(employeeData);
        setShowForm(true);
      } else {
        console.error("Colaborador não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar colaborador:", error);
      setError("Erro ao buscar colaborador para edição.");
    }
  };

  const handleUpdate = (
    id: string,
    updatedEmployee: {
      nome: string;
      cargo: string;
      email: string;
      telefone: string;
    }
  ) => {
    if (!id) {
      console.error("ID do colaborador não fornecido.");
      return;
    }

    console.log("Atualizando colaborador", id, updatedEmployee);

    updateEmployee(id, updatedEmployee).then(() => fetchEmployeees());
  };

  const handleDelete = async (id: string) => {
    console.log("Deletando colaborador com ID:", id);
    try {
      await deleteEmployee(id);
      fetchEmployeees();
    } catch (err) {
      setError("Erro ao deletar colaborador");
    }
  };

  useEffect(() => {
    fetchEmployeees();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center mb-8 flex justify-between items-center">
        <span>Colaboradores</span>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-800 cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Colaborador
        </Button>
      </h1>

      {/* Mensagens de status */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Exibir o formulário de cadastro ou edição */}
      {showForm && (
        <CreateEmployeeForm
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={() => setShowForm(false)}
          employeeToEdit={employeeToEdit} // Passa o colaborador a ser editado
        />
      )}

      <EmployeeTableComponent
        employee={employeees}
        searchTerm={searchTerm}
        onEdit={(id: string) => handleEditEmployee(id)} // Passando apenas o ID
        onDelete={handleDelete}
      />
    </div>
  );
};
