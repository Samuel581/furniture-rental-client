import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const CreateClientButton = () => {
    const router = useRouter();
    return (
      <Button onClick={() => router.push("/clients/create")}>
        Crear nuevo cliente
      </Button>
    );
  };