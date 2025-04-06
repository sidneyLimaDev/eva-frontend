import { useEffect, useState } from "react";
import {
  deleteJourneyAssociation,
  getAllJourneyAssociations,
} from "@/services/JourneyAssociationService";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { CreateAssociationModal } from "./CreateAssociationModal";

const JourneyAssociationList = () => {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar as associações
  const fetchAssociations = async () => {
    try {
      const associationsData = await getAllJourneyAssociations();
      // Atualiza o estado com as associações
      setAssociations(associationsData);
    } catch (error) {
      console.error("Erro ao carregar associações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Deletar uma associação
  const handleDelete = async (id: string) => {
    try {
      await deleteJourneyAssociation(id);
      fetchAssociations(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao deletar associação:", error);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    fetchAssociations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Associações</h1>
          <p className="text-muted-foreground mt-2">
            Veja as associações de colaboradores e jornadas.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Criar Associação</Button>
      </div>

      {/* Lista de Associações */}
      <div className="grid gap-6 md:grid-cols-1 max-h-[500px] overflow-y-auto pr-2">
        {loading ? (
          <p>Carregando associações...</p>
        ) : (
          associations.map((association) => {
            const colaborador = association?.colaborador;
            const jornada = association?.jornada;

            // Verificações de segurança para garantir que as propriedades existam
            if (!colaborador || !jornada) {
              return null; // Caso algum dado esteja ausente, não renderiza
            }

            return (
              <Card key={association._id}>
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle>{colaborador.nome}</CardTitle>
                    <CardDescription>{jornada.descricao}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(association._id)}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data de Início</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {new Date(
                            association.dataInicio
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      <CreateAssociationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default JourneyAssociationList;
