import { Box, Flex, Heading, Text, Table, Th, Tr, Tbody, Thead, Td, Icon, Button, Spinner } from '@chakra-ui/react';
import { useUsers } from "../services/hooks/useUsers";

import { RiPencilLine } from "react-icons/ri";

import { Header } from '../components/Header';

export default function Home() {
  
  const { data, isLoading, isFetching, error } = useUsers(2);
 
  

  return (
    <>
      <Header />
      <Box>
      <Flex w="100%" align="center" justify="center" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" justify="center" maxWidth={920} borderRadius={8} bg="gray.200" p="8">
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
        </Box>
      </Flex>
    </Box>
    </>    
  )
}
