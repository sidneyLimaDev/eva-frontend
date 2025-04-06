// components/CreateAssociationModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getEmployees } from "@/services/EmployeeService";
import { getJourneys } from "@/services/JourneyService";
import { createJourneyAssociation } from "@/services/JourneyAssociationService";

const schema = z.object({
  employeeId: z.string().min(1, "Selecione um colaborador"),
  journeyId: z.string().min(1, "Selecione uma jornada"),
  dataInicio: z.date({ required_error: "Selecione a data de início" }),
});

type FormValues = z.infer<typeof schema>;

export function CreateAssociationModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: "",
      journeyId: "",
      dataInicio: new Date(),
    },
  });

  const [employees, setEmployees] = useState([]);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const emp = await getEmployees();
      const jour = await getJourneys();
      setEmployees(emp);
      setJourneys(jour);
    }
    if (isOpen) fetchData();
  }, [isOpen]);

  async function onSubmit(data: FormValues) {
    try {
      await createJourneyAssociation({
        colaboradorId: data.employeeId,
        jornadaId: data.journeyId,
        dataInicio: data.dataInicio,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Erro ao criar associação", err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar nova associação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colaborador</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um colaborador" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((emp: any) => (
                        <SelectItem key={emp._id} value={emp._id}>
                          {emp.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="journeyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jornada</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma jornada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {journeys.map((jour: any) => (
                        <SelectItem key={jour._id} value={jour._id}>
                          {jour.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataInicio"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de início</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Criar associação
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
