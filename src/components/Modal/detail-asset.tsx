import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { modalProps } from "../../types";
import DetailAdmin from "./admin/detail-asset-admin";
import DetailEmployee from "./employee/detail-asset-employee";
import HistoryAset from "./history/history";

const ModalDetailAsset = ({isOpen, onClose, nama, total_aset, deskripsi, kategori, backgroundimage, category, asset_name, asset_image, users, onChangeUpdate, onClickUpdate}:modalProps) => {
    
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Detail Aset</ModalHeader>
                <ModalCloseButton />
                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>History Aset</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ModalBody mb={5}>
                                {localStorage.getItem("role") === "Employee" ? 
                                <DetailEmployee nama={nama} total_aset={total_aset} deskripsi={deskripsi} kategori={kategori} backgroundImage={backgroundimage}/>
                                : <DetailAdmin nama={nama} total_aset={total_aset} deskripsi={deskripsi} kategori={kategori} backgroundImage={backgroundimage} onChange={onChangeUpdate}/>}
                            </ModalBody>
                            <ModalFooter>
                                <Button border="2px" borderColor='#2296CB' mr={3} onClick={onClose}>
                                Kembali
                                </Button>
                                <Button colorScheme='blue' onClick={onClickUpdate}>Simpan Perubahan</Button>
                            </ModalFooter>
                        </TabPanel>
                    
                        <TabPanel>
                            <ModalBody mb={5}>
                                <HistoryAset category={category} asset_name={asset_name} asset_image={asset_image} users={users}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button border="2px" borderColor='#2296CB' mr={3} onClick={onClose}>
                                Kembali
                                </Button>
                            </ModalFooter>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ModalDetailAsset;