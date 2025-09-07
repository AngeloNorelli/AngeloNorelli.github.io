import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Select,
  Input,
  Slider,
  SliderTrack,
  SliderThumb,
  Text,
  Badge
} from '@chakra-ui/react';
import {
  FaDownload,
  FaShare,
  FaCloud,
  FaTimes
} from 'react-icons/fa';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState(90);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const formatOptions = [
    { value: 'jpg', label: 'JPEG', size: '~200KB' },
    { value: 'png', label: 'PNG', size: '~500KB' },
    { value: 'webp', label: 'WEBP', size: '~150KB' }
  ];

  const handleExport = (action) => {
    const exportSettings = {
      format,
      quality,
      width,
      height,
      action
    };
    onExport(exportSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="blackAlpha.600"
      zIndex="overlay"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        p={6}
        maxWidth="400px"
        width="90%"
        maxHeight="80vh"
        overflowY="auto"
      >
        <HStack justify="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold">Export Image</Text>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <FaTimes />
          </Button>
        </HStack>

        <VStack spacing={6} align="stretch">
          <VStack spacing={3} align="stretch">
            <Text fontWeight="semibold">File format</Text>
            <Select value={format} onChange={(e) => setFormat(e.target.value)}>
              {formatOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.size})
                </option>
              ))}
            </Select>
          </VStack>

          {(format === 'jpg' || format === 'webp') && (
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text fontWeight="semibold">Quality</Text>
                <Badge colorScheme="blue">{quality}%</Badge>
              </HStack>
              <Slider
                value={quality}
                min={10}
                max={100}
                onChange={setQuality}
              >
                <SliderTrack />
                <SliderThumb />
              </Slider>
            </VStack>
          )}

          <VStack spacing={3} align="stretch">
            <Text fontWeight="semibold">Dimensions</Text>
            <HStack>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="Width"
                min={100}
                max={3000}
              />
              <Text>×</Text>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="Height"
                min={100}
                max={3000}
              />
            </HStack>
            <HStack spacing={2}>
              <Button
                size="xs"
                onClick={() => {setWidth(1920); setHeight(1080);}}
              >
                Full HD
              </Button>
              <Button
                size="xs"
                onClick={() => {setWidth(1080); setHeight(1080);}}
              >
                Instagram
              </Button>
              <Button
                size="xs"
                onClick={() => {setWidth(1200); setHeight(630);}}
              >
                Facebook
              </Button>
            </HStack>
          </VStack>
        </VStack>

        <VStack spacing={3} mt={6}>
          <HStack spacing={3} w="full">
            <Button
              leftIcon={<FaDownload />}
              colorScheme="blue"
              flex="1"
              onClick={() => handleExport('download')}
            >
              Download
            </Button>
            <Button
              leftIcon={<FaShare />}
              colorScheme="green"
              flex="1"
              onClick={() => handleExport('share')}
            >
              Share
            </Button>
          </HStack>
          <Button
            leftIcon={<FaCloud />}
            variant="outline"
            w="full"
            onClick={() => handleExport('cloud')}
          >
            Cloud Save
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ExportModal;