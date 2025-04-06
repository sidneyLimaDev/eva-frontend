import api from "./api";

export interface Acao {
  _id?: string;
  tipo: "email" | "whatsapp" | string;
  description: string;
  payload: number;
}

export interface Journey {
  _id?: string;
  nome: string;
  acoes: Acao[];
}

export interface CreateJourneyInput {
  nome: string;
  descricao: string;
  acoes: string[]; // <-- Aqui é o que realmente é enviado
}

// Criar jornada
export const createJourney = async (journey: CreateJourneyInput) => {
  try {
    const response = await api.post("/jornadas", journey);
    console.log("🟢 Jornada criada:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar jornada:", error);
    throw error;
  }
};

// Listar todas
export const getJourneys = async () => {
  try {
    const response = await api.get("/jornadas");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar jornadas:", error);
    throw error;
  }
};

// Buscar uma jornada por ID
export const getJourneyById = async (id: string) => {
  try {
    const response = await api.get(`/jornadas/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar jornada:", error);
    throw error;
  }
};

// Atualizar jornada
export const updateJourney = async (id: string, journey: Journey) => {
  try {
    const response = await api.put(`/jornadas/${id}`, journey);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar jornada:", error);
    throw error;
  }
};

// Deletar jornada
export const deleteJourney = async (id: string) => {
  try {
    const response = await api.delete(`/jornadas/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao deletar jornada:", error);
    throw error;
  }
};

// Listar todas as jornadas
export const getAllJourneys = async (): Promise<Journey[]> => {
  const response = await api.get("/jornadas");
  return response.data;
};
