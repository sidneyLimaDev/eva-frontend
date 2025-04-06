import React, { useEffect, useState } from "react";
import {
  Colaborador,
  getColaboradores,
  createColaborador,
  updateColaborador,
  deleteColaborador,
} from "../services/EmployeeService";

const ColaboradoresList: React.FC = () => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newColaborador, setNewColaborador] = useState<Colaborador>({
    nome: "",
    cargo: "",
  });

  // Função para buscar todos os colaboradores
  const fetchColaboradores = async () => {
    setLoading(true);
    try {
      const data = await getColaboradores();
      setColaboradores(data);
    } catch (err) {
      setError("Erro ao carregar colaboradores");
    } finally {
      setLoading(false);
    }
  };

  // Função para criar um novo colaborador
  const handleCreate = async () => {
    try {
      await createColaborador(newColaborador);
      setNewColaborador({ nome: "", cargo: "" }); // Limpar os campos
      fetchColaboradores(); // Recarregar os colaboradores
    } catch (err) {
      setError("Erro ao criar colaborador");
    }
  };

  // Função para atualizar um colaborador
  const handleUpdate = async (id: string) => {
    const updatedColaborador = { ...newColaborador, nome: "Nome Atualizado" }; // Exemplo de atualização
    try {
      await updateColaborador(id, updatedColaborador);
      fetchColaboradores(); // Recarregar os colaboradores
    } catch (err) {
      setError("Erro ao atualizar colaborador");
    }
  };

  // Função para deletar um colaborador
  const handleDelete = async (id: string) => {
    try {
      await deleteColaborador(id);
      fetchColaboradores(); // Recarregar os colaboradores
    } catch (err) {
      setError("Erro ao deletar colaborador");
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Colaboradores</h1>

      {/* Mensagens de status */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Tabela de colaboradores */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Cargo</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map((colaborador) => (
              <tr key={colaborador.id} className="border-t">
                <td className="px-4 py-2">{colaborador.nome}</td>
                <td className="px-4 py-2">{colaborador.cargo}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="px-4 py-2 bg-yellow-400 text-white rounded-md mr-2"
                    onClick={() => handleUpdate(colaborador.id!)}
                  >
                    Atualizar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(colaborador.id!)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário de criação de colaborador */}
      <h2 className="text-2xl font-semibold mb-4">Criar Colaborador</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="p-3 border border-gray-300 rounded-md"
          value={newColaborador.nome}
          onChange={(e) =>
            setNewColaborador({ ...newColaborador, nome: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cargo"
          className="p-3 border border-gray-300 rounded-md"
          value={newColaborador.cargo}
          onChange={(e) =>
            setNewColaborador({ ...newColaborador, cargo: e.target.value })
          }
        />
      </div>
      <div className="mt-4 text-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleCreate}
        >
          Criar Colaborador
        </button>
      </div>
    </div>
  );
};

export default ColaboradoresList;
