import { AuthContext } from "@/contexts/AuthContext";
import { GlobalContext } from "@/contexts/GlobalContext";
import useToast from "@/hooks/useToast";
import { useContext } from "react";
import useFields from "../useFields";

type CreateProps = {
  plataform: string;
  descricao: string;
  link: string;
  user: string;
  password: string;
};

export default function useCreate(handleModalCreate: () => void, fetchData: () => void) {

  const { user } = useContext(AuthContext);

  const { handleAddToast } = useToast();

  const {
    handleChangePlataformError,
    handleChangeDescriptionError,
    handleChangeLinkError,
    handleChangeUserError,
    handleChangePasswordError,
  } = useFields();


  const { handleVisibleLoading, selectFolder } = useContext(GlobalContext);
  
  const fetchCreate = async (data: CreateProps) => {

    if(selectFolder === null){
      return
    }

    let fieldsErrors = false;

    if (!data.plataform) {
      handleChangePlataformError(true);
      fieldsErrors = true;
    }
    if (!data.descricao) {
      handleChangeDescriptionError(true);
      fieldsErrors = true;
    }
    if (!data.link) {
      handleChangeLinkError(true);
      fieldsErrors = true;
    }
    if (!data.user) {
      handleChangeUserError(true);
      fieldsErrors = true;
    }
    if (!data.password) {
      handleChangePasswordError(true);
      fieldsErrors = true;
    }

    if (!fieldsErrors) {
      const formData = new FormData();
      formData.append("id", selectFolder.id);
      formData.append("title", data.plataform);
      formData.append("description", data.descricao);
      formData.append("link", data.link);
      formData.append("user", data.user);
      formData.append("password", data.password);

      try {
        const route = "https://mrpass.shop/api/register/create.php";
        const response = await fetch(route, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        });

        const data = await response.json();
        console.log("data", data);

        handleAddToast({
          message: data.message,
          type: "success",
        });

        fetchData();
        handleModalCreate();
      } catch (error) {
        console.error("Erro ao criar registro:", error);
        handleAddToast({
          message: "Erro ao criar registro. Tente novamente.",
          type: "error",
        });
      }
    }
  };

  const create = async (data: CreateProps) => {
    handleVisibleLoading(true);
    await fetchCreate(data);
    handleVisibleLoading(false);
  };

  return { create };
}
