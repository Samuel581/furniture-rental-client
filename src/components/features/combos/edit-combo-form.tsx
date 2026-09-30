"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { combosService } from "@/services/combo.service";
import { getApiErrorMessage } from "@/lib/api/errors";
import { ComboFormOutput } from "@/lib/validation/schemas/combo";
import ComboForm from "./combo-form";

function EditComboForm() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const comboId = params.id as string;

  const {
    data: combo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["combo", comboId],
    queryFn: () => combosService.getById(comboId),
    enabled: !!comboId,
  });

  const updateCombo = useMutation({
    mutationFn: (data: ComboFormOutput) => combosService.update(comboId, data),
    onSuccess: () => {
      toast.success("Combo actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      queryClient.invalidateQueries({ queryKey: ["combo", comboId] });
      router.push("/combos");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo actualizar el combo"));
    },
  });

  if (isLoading) {
    return <div>Cargando combo...</div>;
  }

  if (isError || !combo) {
    return <div className="text-red-500">No se pudo cargar el combo.</div>;
  }

  return (
    <ComboForm
      defaultValues={{
        name: combo.name,
        dailyRate: combo.dailyRate,
        furnitureItems: (combo.ComboFurniture ?? []).map((item) => ({
          furnitureId: item.furnitureId,
          quantity: item.quantity,
        })),
      }}
      onSubmit={(data) => updateCombo.mutate(data)}
      isPending={updateCombo.isPending}
      submitLabel="Guardar cambios"
      pendingLabel="Guardando..."
    />
  );
}

export default EditComboForm;
