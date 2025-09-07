import {
  Box,
  VStack,
  HStack,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  Button,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';
import {
  FaUndo,
  FaRedo
} from 'react-icons/fa';

const FiltersPanel = ({ 
  filters = {}, 
  onFilterChange = () => {}, 
  onPresetFilter = () => {}, 
  onReset = () => {}, 
  onUndo = () => {}, 
  onRedo = () => {} 
}) => {
  const presetFilters = [
    { name: 'Original', filters: {} },
    { name: 'Vintage', filters: { sepia: 80, brightness: 110, contrast: 90 } },
    { name: 'B&W', filters: { grayscale: 100, contrast: 110 } },
    { name: 'Warm', filters: { brightness: 115, saturation: 120 } },
    { name: 'Cool', filters: { contrast: 150, brightness: 105 } }
  ];

  const sliderConfigs = [
    { key: 'brightness', label: 'Brightness', min: 0, max: 200 },
    { key: 'contrast', label: 'Contrast', min: 0, max: 200 },
    { key: 'saturation', label: 'Saturation', min: 0, max: 200 },
    { key: 'hue', label: 'Hue', min: -180, max: 180 },
    { key: 'blur', label: 'Blur', min: 0, max: 10 },
    { key: 'sepia', label: 'Sepia', min: 0, max: 100 },
    { key: 'grayscale', label: 'Grayscale', min: 0, max: 100 }
  ];

  return (
    <Box 
      w="300px" 
      h="100vh" 
      bg="gray.50" 
      p={4} 
      borderRight="1px" 
      borderColor="gray.200" 
      overflowY="auto"
    >
      <VStack spacing={6} align="stretch">
        <VStack spacing={3}>
          <Text 
            fontSize="lg" 
            fontWeight="bold" 
            color="gray.700"
          >
            Filters
          </Text>
          <HStack spacing={2}>
            <Button 
              size="sm" 
              onClick={onUndo}
              aria-label="Undo"
              variant="outline"
            >
              <FaUndo />
            </Button>
            <Button 
              size="sm" 
              onClick={onRedo}
              aria-label="Redo"
              variant="outline"
            >
              <FaRedo />
            </Button>
            <Button 
              size="sm" 
              colorPalette="red" 
              variant="outline" 
              onClick={onReset}
            >
              Reset
            </Button>
          </HStack>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Text
            fontSize="md" 
            fontWeight="semibold"
            color="gray.700"
          >
            Presets
          </Text>
          <SimpleGrid columns={2} spacing={2} gap={2}>
            {presetFilters.map((preset, index) => (
              <Button 
                key={index} 
                size="sm" 
                variant="outline" 
                colorScheme="purple"
                onClick={() => onPresetFilter(preset.filters)}
              >
                {preset.name}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Text 
            fontSize="md" 
            fontWeight="semibold" 
            color="gray.700"
          >
            Adjust
          </Text>
          {sliderConfigs.map(({ key, label, min, max }) => {
            const defaultValue = (key === 'brightness' || key === 'contrast' || key === 'saturation') ? 100 : 0;
            const currentValue = filters[key] !== undefined ? filters[key] : defaultValue;
            
            return (
              <Box key={key}>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.600">{label}</Text>
                  <Badge colorScheme="blue">{currentValue}%</Badge>
                </HStack>
                <Slider.Root
                  value={[currentValue]} 
                  min={min} 
                  max={max}
                  onValueChange={(details) => onFilterChange(key, details.value[0])}
                  colorPalette="blue"
                >
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb index={0} />
                  </Slider.Control>
                </Slider.Root>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export default FiltersPanel;