import api from "./api";

export interface JourneyAssociation {
  _id?: string;
  jornadaId: string;
  colaboradorId: string;
  dataInicio: string; // ISO
}

// Criar nova associação
export const createJourneyAssociation = async (data: JourneyAssociation) => {
  const response = await api.post("/associacoes", data);
  return response.data;
};

// Buscar todas as associações
export const getAllJourneyAssociations = async () => {
  const response = await api.get("/associacoes");
  return response.data;
};

// Buscar associação por ID
export const getJourneyAssociationById = async (id: string) => {
  const response = await api.get(`/associacoes/${id}`);
  return response.data;
};

// Atualizar associação existente
export const updateJourneyAssociation = async (
  id: string,
  data: Partial<JourneyAssociation>
) => {
  const response = await api.put(`/associacoes/${id}`, data);
  return response.data;
};

// Deletar associação
export const deleteJourneyAssociation = async (id: string) => {
  const response = await api.delete(`/associacoes/${id}`);
  return response.data;
};
