import ButtonSecondary from '@/components/ButtonSecondary';
import { Register } from '@/types/register';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ButtonDelete from '../../components/ButtonDelete';

type ModalProps = {
  isVisible: boolean;
  handleFunction: () => void;
  selectedItem: Register | null;
  fetchData: () => void;
}
const ModalConfirmDelete = ({
  isVisible,
  handleFunction,
  selectedItem,
  fetchData,
}:ModalProps) => {

  const handleClose = () => {
    handleFunction();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            handleClose
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Tem certeza de que deseja excluir o registro {selectedItem?.plataforma}?</Text>
              <View style={styles.containerBtns}>
                <ButtonSecondary text='Cancelar' onClick={handleClose} />
                <ButtonDelete selectedItem={selectedItem} closeModalFunction={handleFunction} fetchData={fetchData} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView> 
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // height: "100%",
    // minHeight: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerBtns: {
    display: 'flex',
    flexDirection: "row",
    // gap: 10,
    justifyContent: "space-around",
    width: "100%"
  }
});

export default ModalConfirmDelete;