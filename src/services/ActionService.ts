import api from "./api";

export interface Acao {
  _id: string;
  title: string;
  tipo: "email" | "whatsapp" | string;
  description: string;
  payload: number;
}

// Criar ação
export const createAction = async (acao: Omit<Acao, "_id">): Promise<Acao> => {
  try {
    const response = await api.post("/acoes", acao);
    console.log("🟢 Ação criada:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar ação:", error);
    throw error;
  }
};

// Listar todas as ações
export const getAllActions = async (): Promise<Acao[]> => {
  try {
    const response = await api.get("/acoes");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar ações:", error);
    throw error;
  }
};

// Buscar uma ação por ID
export const getActionById = async (id: string): Promise<Acao> => {
  try {
    const response = await api.get(`/acoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar ação:", error);
    throw error;
  }
};

// Atualizar ação
export const updateAction = async (
  id: string,
  acao: Omit<Acao, "_id">
): Promise<Acao> => {
  try {
    const response = await api.put(`/acoes/${id}`, acao);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar ação:", error);
    throw error;
  }
};

// Deletar ação
export const deleteAction = async (id: string): Promise<void> => {
  try {
    await api.delete(`/acoes/${id}`);
  } catch (error) {
    console.error("❌ Erro ao deletar ação:", error);
    throw error;
  }
};
