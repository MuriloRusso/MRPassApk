import { AuthContext } from "@/contexts/AuthContext";
import { GlobalContext } from "@/contexts/GlobalContext";
import useToast from "@/hooks/useToast";
import { RegisterDataProps } from "@/types/register";
import { useContext } from "react";

export default function useUpdate(handleModalCreate: () => void, fetchData: () => void, handleChangeError: (field: keyof RegisterDataProps, hasError: boolean) => void) {
  const { user } = useContext(AuthContext);
  const { handleAddToast } = useToast();
  const { handleVisibleLoading } = useContext(GlobalContext);

  const update = async ({
    id,
    plataform,
    descricao,
    link,
    user: username,
    password,
  }: {
    id: number;
    plataform: string;
    descricao: string;
    link: string;
    user: string;
    password: string;
  }) => {
    handleVisibleLoading(true);
    let fieldsErros = false;

    if (!plataform) {
      handleChangeError('plataform', true);
      fieldsErros = true;
    }
    // if (!descricao) {
    //   handleChangeError('description', true);
    //   fieldsErros = true;
    // }
    // if (!link) {
    //   handleChangeError('link', true);
    //   fieldsErros = true;
    // }
    if (!username) {
      handleChangeError('user', true);
      fieldsErros = true;
    }
    if (!password) {
      handleChangeError('password', true);
      fieldsErros = true;
    }

    if (!fieldsErros) {
      let formData = new FormData();
      formData.append("id", id.toString());
      formData.append("plataform", plataform);
      formData.append("descricao", descricao);
      formData.append("link", link);
      formData.append("user", username);
      formData.append("password", password);

      try {
        const route = "https://mrpass.shop/api/register/update.php";
        const response = await fetch(route, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        });

        const data = await response.json();

        handleAddToast({ message: data.message, type: "success" });
        fetchData();
        handleModalCreate();
      } catch (error) {
        console.error("Erro ao atualizar registro:", error);
      }
    }

    handleVisibleLoading(false);
  };

  return { update };
}
