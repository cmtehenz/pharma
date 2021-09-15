import { 
  Box, 
  Flex, 
  Text, 
  Table, 
  Th, Tr, 
  Tbody, Thead, Td, Icon, 
  Button, Spinner,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Image,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react'
import { useUsers } from "../services/hooks/useUsers";

import { RiPencilLine } from "react-icons/ri";

import { Header } from '../components/Header';

type User = {
  id: string,
  name: string;
  gender: string;
  birthday: string;
  pictureUrl: string;
  email: string;
  phone: string;
  nationality: string;
  street: string,
  city: string,
  state: string,
  country: string,
  postcode: number,
};

export default function Home() {
  const [user, setUser ] = useState<User>();
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { data, isLoading, isFetching, error } = useUsers(2);

  const handleOpenModal = (data: User) => {
    setUser(data);
    onToggle();
  }

  return (
    <>
      <Header />
      <Box>
      <Flex w="100%" align="center" justify="center" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" justify="center" maxWidth={920} borderRadius={8} bg="gray.200" p="8">
        { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
        { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ): error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ): (
            <Table colorScheme="teal">
              <Thead>
                <Tr>
                  <Th  color="gray.800" >
                    Name
                  </Th>
                  <Th>Gender</Th>
                  <Th>Birth</Th>
                  <Th width="8">Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                { data.users.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.gender}</Td>
                      <Td>{user.birthday}</Td>
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} />}
                          onClick={() => handleOpenModal(user)}
                        >
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  )
                })}
                
              </Tbody>
            </Table>

          )}
          <>
            
            <ChakraModal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={user?.pictureUrl}
                    alt={user?.name}
                  />
                  <Text>{user?.name}</Text>
                  <Text>{user?.id}</Text>
                  <Text>{user?.email}</Text>
                  <Text>{user?.gender}</Text>
                  <Text>{user?.birthday}</Text>
                  <Text>{user?.phone}</Text>
                  <Text>{user?.nationality}</Text>
                  <Text>{user?.street}</Text>
                  <Text>{user?.city}</Text>
                  <Text>{user?.state}</Text>
                  <Text>{user?.country}</Text>
                  <Text>{user?.postcode}</Text>
                </ModalBody>
              </ModalContent>
            </ChakraModal>
          </>
        </Box>
      </Flex>
    </Box>
    </>    
  )
}
