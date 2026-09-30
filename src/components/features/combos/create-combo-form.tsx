"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { combosService } from "@/services/combo.service";
import { getApiErrorMessage } from "@/lib/api/errors";
import { ComboFormOutput } from "@/lib/validation/schemas/combo";
import ComboForm from "./combo-form";

function CreateComboForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createCombo = useMutation({
    mutationFn: (data: ComboFormOutput) =>
      combosService.create({ ...data, isActive: true }),
    onSuccess: () => {
      toast.success("Combo creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      router.push("/combos");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo crear el combo"));
    },
  });

  return (
    <ComboForm
      onSubmit={(data) => createCombo.mutate(data)}
      isPending={createCombo.isPending}
      submitLabel="Crear combo"
      pendingLabel="Creando combo..."
    />
  );
}

export default CreateComboForm;
