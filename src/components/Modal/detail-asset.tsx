import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { modalProps } from "../../types";
import { InputSelect, InputText } from "../Input";
import DetailAdmin from "./admin/detail-asset-admin";
import DetailEmployee from "./employee/detail-asset-employee";
import HistoryAset from "./history/history";

const ModalDetailAsset = ({isOpen, onClose}:modalProps) => {
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
                                <DetailEmployee/>
                            </ModalBody>
                            <ModalFooter>
                                <Button border="2px" borderColor='#2296CB' mr={3} onClick={onClose}>
                                Kembali
                                </Button>
                                <Button colorScheme='blue'>Simpan Perubahan</Button>
                            </ModalFooter>
                        </TabPanel>
                    
                        <TabPanel>
                            <ModalBody mb={5}>
                                <HistoryAset/>
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