import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Input,
  Select
} from '@chakra-ui/react';
import {
  FaCrop,
  FaUndo,
  FaRedo,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaCompress,
  FaExchangeAlt,
  FaFont,
  FaDownload,
  FaSave
} from 'react-icons/fa';

const ToolsPanel = ({
  selectedTool, 
  onToolSelect, 
  onRotate, 
  onFlip, 
  onZoom,
  onResize, 
  onAddText, 
  onCrop, 
  onExport
}) => {
  const tools = [
    { id: 'select', name: 'Select', icon: FaExpand },
    { id: 'crop', name: 'Crop', icon: FaCrop },
    { id: 'text', name: 'Text', icon: FaFont },
    { id: 'resize', name: 'Resize', icon: FaCompress }
  ];

  return (
    <Box
      w="250px"
      h="100vh"
      bg="white"
      p={4}
      borderLeft="1px"
      borderColor="gray.200"
    >
      <VStack spacing={3}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gray.700"
        >
          Tools
        </Text>
        <VStack spacing={2} w="full">
          {tools.map(tool => (
            <Button
              key={tool.id}
              leftIcon={<tool.icon />}
              variant={selectedTool === tool.id ? 'solid' : 'outline'}
              colorScheme="blue"
              w="full"
              size="sm"
              onClick={() => onToolSelect(tool.id)}
            >
              {tool.name}
            </Button>
          ))}
        </VStack>
      </VStack>

      <VStack spacing={3}>
        <Text fontSize="md" fontWeight="semibold">Transformations</Text>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          w="full"
        >
          <Tooltip label="Rotate Left">
            <IconButton icon={<FaUndo />} onClick={() => onRotate(-90)} />
          </Tooltip>
          <Tooltip label="Rotate Right">
            <IconButton icon={<FaRedo />} onClick={() => onRotate(90)} />
          </Tooltip>
          <Tooltip label="Flip Horizontal">
            <IconButton icon={<FaExchangeAlt />} onClick={() => onFlip('horizontal')} />
          </Tooltip>
        </ButtonGroup>
      </VStack>

      <VStack spacing={3}>
          <Text fontSize="md" fontWeight="semibold">Zoom</Text>
          <ButtonGroup
            size="sm"
            isAttached
            variant="outline"
            w="full"
          >
            <Button leftIcon={<FaSearchMinus />} onClick={() => onZoom(-0.1)}>-</Button>
            <Button leftIcon={<FaSearchPlus />} onClick={() => onZoom(0.1)}>+</Button>
          </ButtonGroup>
      </VStack>

      <VStack spacing={3}>
        <Text fontSize="md" fontWeight="semibold">Size</Text>
        <HStack>
          <Input
            type="number"
            size="sm"
            defaultValue={800}
            min={100}
            max={3000}
            placeholder="Width"
          />
          <Text fontSize="sm">×</Text>
          <Input
            type="number"
            size="sm"
            defaultValue={600}
            min={100}
            max={3000}
            placeholder="Height"
          />
        </HStack>
        <Button 
          size="sm" 
          colorScheme="green" 
          w="full" 
          onClick={onResize}
        >
          Apply Resize
        </Button>
      </VStack>

      <VStack spacing={3}>
        <Text fontSize="md" fontWeight="semibold">Export</Text>
        <Select size="sm" defaultValue="jpg">
          <option value="jpg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </Select>
        <ButtonGroup
          size="sm"
          orientation="vertical"
          w="full"
        >
          <Button
            leftIcon={<FaSave />}
            colorScheme="blue"
            onClick={onExport}
          >
            Download
          </Button>
          <Button leftIcon={<FaDownload />} variant="outline">
            Save Project
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default ToolsPanel;