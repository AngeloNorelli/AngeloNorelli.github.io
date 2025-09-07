import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  HStack,
  Image,
  SimpleGrid
} from '@chakra-ui/react';
import {
  FaUpload,
  FaImage,
  FaFolder
} from 'react-icons/fa';

const UploadArea = ({ onImageSelect, recentImages = [] }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result, file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  const bgColor = 'gray.50';
  const borderColor = 'gray.300';
  const hoverColor = 'blue.50';

  return (
    <Box
      p={6}
      h="100vh"
      bg={bgColor}
    >
      <VStack
        spacing={6}
        align="stretch"
        h="30vh"
      >
        <Box
          {...getRootProps()}
          border="3px"
          borderStyle="dashed"
          borderColor={isDragActive ? 'blue.400' : borderColor}
          borderRadius="xl"
          p={12}
          textAlign="center"
          cursor="pointer"
          bg={isDragActive ? hoverColor : 'white'}
          transition="all 0.2s"
          _hover={{ borderColor: 'blue.400', bg: hoverColor }}
          flex="1"
        >
          <input {...getInputProps()} />
          <VStack spacing={4}>
            <Icon as={FaUpload} boxSize={16} color="blue.400" />
            <VStack spacing={2}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.700"
              >
                {isDragActive ? "Drop the image here..." : "Drag 'n' drop an image here"}
              </Text>
              <Text fontSize="md" color="gray.500">
                or click to select an image
              </Text>
              <Text fontSize="sm" color="gray.400">
                Supported formats: JPEG, PNG, GIF, WEBP (max 10MB)
              </Text>
            </VStack>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<FaFolder />}
              color="white"
            >
              Select Image
            </Button>
          </VStack>
        </Box>

        {recentImages.length > 0 && (
          <VStack spacing={4} align="stretch">
            <HStack spacing={2}>
              <Icon as={FaImage} color="gray.500" />
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="gray.600"
              >
                Recent Images
              </Text>
            </HStack>

            <SimpleGrid columns={4} spacing={3}>
              {recentImages.map((img, index) => (
                <Box
                  key={index}
                  position="relative"
                  cursor="pointer"
                  borderRadius="md"
                  overflow="hidden"
                  border="2px"
                  borderColor="transparent"
                  _hover={{ borderColor: 'blue.400', transform: 'scale(1.05)' }}
                  onClick={() => onImageSelect(img.url, img.file)}
                >
                  <Image
                    src={img.thumbnail}
                    alt={`Recent ${index}`}
                    w="full"
                    h="20"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        )}

        <HStack spacing={3} justify="center">
          <Button 
            size="sm"
            variant="outline"
            leftIcon={<FaImage />}
          >
            Browse Images
          </Button>
          <Button size="sm" variant="outline">
            Photos from Camera
          </Button>
          <Button size="sm" variant="outline">
            Import from URL
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default UploadArea;