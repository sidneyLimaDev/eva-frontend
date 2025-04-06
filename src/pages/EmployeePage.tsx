/* import { useEffect, useState } from "react";
import axios from "axios";

const ColaboradoresPage = () => {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/colaboradores"
        );
        setColaboradores(response.data);
      } catch (error) {
        console.error("Erro ao buscar colaboradores", error);
      }
    };

    fetchColaboradores();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Lista de Colaboradores</h1>
      <table className="table-auto w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colaborador) => (
            <tr key={colaborador.id}>
              <td className="border px-4 py-2">{colaborador.nome}</td>
              <td className="border px-4 py-2">{colaborador.email}</td>
              <td className="border px-4 py-2">
                <a
                  href={`/colaboradores/${colaborador.id}`}
                  className="text-blue-500"
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColaboradoresPage;
 */
