import axios from "axios";

// Criando a instância do axios com a URL da API configurada via .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333/api", // URL base da API
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionando interceptores para capturar logs da requisição e resposta
api.interceptors.request.use(
  (request) => {
    console.log("Enviando requisição para:", request.url); // Log da URL da requisição
    return request;
  },
  (error) => {
    console.error("Erro na requisição:", error); // Log de erro na requisição
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Resposta recebida:", response); // Log da resposta
    return response;
  },
  (error) => {
    console.error("Erro na resposta:", error.response || error); // Log de erro na resposta
    return Promise.reject(error);
  }
);

export default api;
