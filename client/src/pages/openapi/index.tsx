import React, { useState } from 'react';
import {
  Card,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
import { getOpenApiKeys, createAOpenApiKey, delOpenApiById } from '@/api/openapi';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLoading } from '@/hooks/useLoading';
import dayjs from 'dayjs';
import { DeleteIcon } from '@chakra-ui/icons';
import { useCopyData } from '@/utils/tools';

const OpenApi = () => {
  const { Loading } = useLoading();
  const {
    data: apiKeys = [],
    isLoading: isGetting,
    refetch
  } = useQuery(['getOpenApiKeys'], getOpenApiKeys);
  const [apiKey, setApiKey] = useState('');
  const { copyData } = useCopyData();

  const { mutate: onclickCreateApiKey, isLoading: isCreating } = useMutation({
    mutationFn: () => createAOpenApiKey(),
    onSuccess(res) {
      setApiKey(res);
      refetch();
    }
  });

  const { mutate: onclickRemove, isLoading: isDeleting } = useMutation({
    mutationFn: async (id: string) => delOpenApiById(id),
    onSuccess() {
      refetch();
    }
  });

  return (
    <Box py={[5, 10]} px={'5vw'}>
      <Card px={6} py={4} position={'relative'}>
        <Box fontSize={'xl'} fontWeight={'bold'}>
          LMU 知识库的Api
        </Box>
        <Box fontSize={'sm'} mt={2}>
          我们的知识库 API
          可以将部分功能无缝集成到你的应用程序中，比如飞书、企业微信和客服助手等。请务必注意保管你的
          API Key，确保其不被泄露
        </Box>
        <Box>使用 Fast Api 功能仅能使用平台余额。</Box>
        <Box
          my={1}
          as="a"
          href="https://kjqvjse66l.feishu.cn/docx/DmLedTWtUoNGX8xui9ocdUEjnNh"
          color={'myBlue.800'}
          textDecoration={'underline'}
          target={'_blank'}
        >
          点击查看文档
        </Box>
        <TableContainer mt={2} position={'relative'}>
          <Table>
            <Thead>
              <Tr>
                <Th>Api Key</Th>
                <Th>创建时间</Th>
                <Th>最后一次使用时间</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody fontSize={'sm'}>
              {apiKeys.map(({ id, apiKey, createTime, lastUsedTime }) => (
                <Tr key={id}>
                  <Td>{apiKey}</Td>
                  <Td>{dayjs(createTime).format('YYYY/MM/DD HH:mm:ss')}</Td>
                  <Td>
                    {lastUsedTime
                      ? dayjs(lastUsedTime).format('YYYY/MM/DD HH:mm:ss')
                      : '没有使用过'}
                  </Td>
                  <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      size={'xs'}
                      aria-label={'delete'}
                      variant={'base'}
                      colorScheme={'gray'}
                      onClick={() => onclickRemove(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Button
          maxW={'200px'}
          mt={5}
          isLoading={isCreating}
          isDisabled={apiKeys.length >= 5}
          title={apiKeys.length >= 5 ? '最多五组 Api Key' : ''}
          onClick={() => onclickCreateApiKey()}
        >
          添加新的 Api Key
        </Button>
        <Loading loading={isGetting || isDeleting} fixed={false} />
      </Card>
      <Modal isOpen={!!apiKey} onClose={() => setApiKey('')}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Api Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={5}>
            请保管好你的Api Key
            <Box userSelect={'all'} onClick={() => copyData(apiKey)}>
              {apiKey}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OpenApi;
