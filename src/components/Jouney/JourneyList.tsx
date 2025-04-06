import { useEffect, useState } from "react";
import {
  getAllJourneys,
  deleteJourney,
  Journey,
} from "@/services/JourneyService";
import { getAllActions, Acao } from "@/services/ActionService";
import { Button } from "../ui/button";
import { Plus, Timer, Mail, MessageCircleMore, Trash } from "lucide-react";
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
import { CreateJourneyForm } from "./CreateJourneyForm";

const JourneyList = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [availableActions, setAvailableActions] = useState<Acao[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Função para buscar jornadas e ações
  const fetchData = async () => {
    try {
      const [journeysData, actionsData] = await Promise.all([
        getAllJourneys(),
        getAllActions(),
      ]);

      // Verifique se os dados são válidos antes de atualizar o estado
      if (Array.isArray(journeysData)) {
        setJourneys(journeysData);
      }
      if (Array.isArray(actionsData)) {
        setAvailableActions(actionsData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para recarregar as ações
  const refetchActions = async () => {
    try {
      const actionsData = await getAllActions();
      setAvailableActions(actionsData);
    } catch (error) {
      console.error("Erro ao carregar ações:", error);
    }
  };

  // Função para deletar uma jornada
  const handleDelete = async (id: string) => {
    try {
      await deleteJourney(id);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar jornada:", error);
    }
  };

  // Função para criar uma nova jornada
  const handleCreate = async (novaJornada: {
    nome: string;
    descricao: string;
    acoes: any[]; // Certifique-se de que 'acoes' é um array
  }) => {
    // Chama o fetch para criar a jornada
    try {
      const response = await fetch("/sua-api", {
        method: "POST",
        body: JSON.stringify(novaJornada),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao criar jornada");
      }

      // Agora você faz o fetch para pegar os dados de ações
      await fetchData();

      // Validação das ações após o fetch
      if (!Array.isArray(novaJornada.acoes)) {
        console.error("Ações não são um array válido.");
        return;
      }

      // Validações de availableActions também
      if (!Array.isArray(availableActions)) {
        console.error("Ações disponíveis não são um array válido.");
        return;
      }

      // Continua com a lógica de criar a jornada
      setJourneys((prev) => [
        ...prev,
        {
          _id: crypto.randomUUID(), // Ajuste conforme o retorno real do backend
          nome: novaJornada.nome,
          descricao: novaJornada.descricao,
          acoes: availableActions
            .filter((a) => novaJornada.acoes.includes(a._id))
            .map((acao) => ({
              ...acao,
              conteudo: acao.description, // Ou mapeie os campos para corresponder ao tipo esperado
              atrasoEmSegundos: acao.payload, // Adapte conforme a necessidade
            })),
        },
      ]);
    } catch (error) {
      console.error("Erro ao criar jornada:", error);
    }
  };

  // Carregar dados na montagem do componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jornadas</h1>
          <p className="text-muted-foreground mt-2">
            Veja as jornadas e as ações configuradas.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Criar Jornada
        </Button>
      </div>

      {/* Modal de criação de jornada */}
      {showForm && (
        <CreateJourneyForm
          onCreate={handleCreate}
          onClose={() => setShowForm(false)}
          availableActions={availableActions}
          refetchActions={refetchActions} // Passando a função para atualizar as ações
        />
      )}

      {/* Lista de jornadas */}
      <div className="grid gap-6 md:grid-cols-1 max-h-[500px] overflow-y-auto pr-2">
        {loading ? (
          <p>Carregando jornadas...</p>
        ) : (
          journeys.map((journey) => (
            <Card key={journey._id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>{journey.nome}</CardTitle>
                  <CardDescription>
                    {journey.acoes.length} ação
                    {journey.acoes.length !== 1 && "s"}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(journey._id)}
                >
                  <Trash className="w-4 h-4 text-destructive" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Conteúdo</TableHead>
                      <TableHead>Atraso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {journey.acoes.map((acao) => (
                      <TableRow key={acao._id}>
                        <TableCell className="capitalize flex items-center gap-2">
                          {acao.tipo === "email" ? (
                            <Mail className="w-4 h-4 text-primary" />
                          ) : (
                            <MessageCircleMore className="w-4 h-4 text-green-600" />
                          )}
                          <Badge variant="outline">{acao.tipo}</Badge>
                        </TableCell>
                        <TableCell>{acao.description}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Timer className="w-4 h-4 text-muted-foreground" />
                          {acao.payload}s
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default JourneyList;
