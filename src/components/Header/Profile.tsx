import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {

  return (
    <Flex align="center">
      <Avatar
        size="md"
        name="Gustavo Costa"
        src="https://github.com/cmtehenz.png"
      />
    </Flex>
  );
}
