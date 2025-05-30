import ButtonDelete from "@/components/ButtonDelete";
import ButtonEdit from "@/components/ButtonEdit";
import { GlobalContext } from "@/contexts/GlobalContext";
import { Folder } from "@/types/folder";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FolderIcon from "../../../../components/FolderIcon";

type ListItemProps = {
  folder: Folder;
  modalConfirmDeleteFunction: () => void;
  modalCreateFunction: () => void;
  selectItemFunction: (value:Folder | null) => void
}

export default function ListItem({folder, modalConfirmDeleteFunction, modalCreateFunction, selectItemFunction}:ListItemProps){
    const router = useRouter();

    const { setSelectedFolder } = useContext(GlobalContext);

    const handleDelete = () => {      
      selectItemFunction({id: folder.id, nome: folder.nome, descricao: folder.descricao, extensao: folder.extensao, file: folder.file});
      modalConfirmDeleteFunction();
    }

    const handleUpdate = () => {      
      selectItemFunction({id: folder.id, nome: folder.nome, descricao: folder.descricao, extensao: folder.extensao, file: folder.file});
      modalCreateFunction();
    }

    const handleItem = () => {
      setSelectedFolder(folder);
      router.push('/PanelRegister')
    }
    
    return (
        <View style={styles.item}>
            <View>
                <View style={{display: 'flex', flexDirection: "row", gap: 10, alignItems: "center"}}>
                    <FolderIcon size={35} />                
                    <View>
                        <Text style={styles.title}>{folder.nome}</Text>
                        <Text style={styles.description}>{folder.descricao}</Text>
                    </View>
                </View>
                <View style={styles.containerAcoes}>
                    <ButtonEdit onClick={handleUpdate} />
                    <ButtonDelete onClick={handleDelete}/>
                </View>

            </View>
            <MaterialIcons name="arrow-forward-ios" size={40} color="#777" onPress={handleItem} />
        </View>
    )
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
  },
  description: {
    fontSize: 16,
    maxWidth: '80%'
  },
  containerAcoes: {
    display: "flex",
    flexDirection: "row",
    // padding: 5,
    marginVertical: 15,
    gap: 15
  }
});
