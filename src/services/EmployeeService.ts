import api from "./api";

export interface Employee {
  id?: string;
  nome: string;
  cargo: string;
}

export const getEmployees = async () => {
  console.log("Buscando colaboradores...");
  try {
    const response = await api.get("/colaboradores");
    console.log("Colaboradores recebidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar colaboradores:", error);
    throw error;
  }
};

export const getEmployeeById = async (id: string) => {
  console.log("Buscando colaborador...");
  try {
    const response = await api.get(`/colaboradores/${id}`);
    console.log("Colaboradores recebidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar colaboradores:", error);
    throw error;
  }
};

export const createEmployee = async (Employee: Employee) => {
  console.log("Criando colaborador:", Employee);
  try {
    const response = await api.post("/colaboradores", Employee);
    console.log("Colaborador criado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar colaborador:", error);
    throw error;
  }
};

export const updateEmployee = async (id: string, Employee: Employee) => {
  console.log("ID recebido:", id);
  if (!id) {
    console.error("ID do colaborador não fornecido.");
    throw new Error("ID do colaborador é necessário para atualização.");
  }
  console.log(`Atualizando colaborador com ID: ${id}`, Employee);
  try {
    const response = await api.put(`/colaboradores/${id}`, Employee);
    console.log("Colaborador atualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar colaborador:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: string) => {
  console.log(`Deletando colaborador com ID: ${id}`);
  try {
    const response = await api.delete(`/colaboradores/${id}`);
    console.log("Colaborador deletado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar colaborador:", error);
    throw error;
  }
};
