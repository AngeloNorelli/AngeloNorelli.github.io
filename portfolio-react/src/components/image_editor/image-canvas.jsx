import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Box, 
  Center, 
  Spinner, 
  Text, 
  VStack } 
from '@chakra-ui/react';

const ImageCanvas = ({
  imageUrl,
  filters,
  selectedTool,
  onImageLoad,
  onCanvasReady
}) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (canvasRef.current && onCanvasReady) {
      onCanvasReady(canvasRef.current);
    }
  }, [onCanvasReady]);

  const applyFilters = useCallback((canvas, ctx, image) => {
    if (!filters || Object.keys(filters).length === 0) {
      // Rysuj obraz bez filtrów
      ctx.filter = 'none';
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return;
    }

    // Zastosuj filtry CSS
    const filterString = Object.entries(filters)
      .map(([key, value]) => {
        const defaultValue = key === 'brightness' || key === 'contrast' || key === 'saturation' ? 100 : 0;
        const actualValue = value !== undefined ? value : defaultValue;
        
        switch(key) {
          case 'brightness': return `brightness(${actualValue}%)`;
          case 'contrast': return `contrast(${actualValue}%)`;
          case 'saturation': return `saturate(${actualValue}%)`;
          case 'hue': return `hue-rotate(${actualValue}deg)`;
          case 'blur': return `blur(${actualValue}px)`;
          case 'sepia': return `sepia(${actualValue}%)`;
          case 'grayscale': return `grayscale(${actualValue}%)`;
          default: return '';
        }
      })
      .filter(filter => filter)
      .join(' ');

    ctx.filter = filterString || 'none';
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }, [filters]);

  const loadImage = useCallback((url) => {
    if (!canvasRef.current) return;

    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Ustaw rozmiary canvas
      const maxWidth = 800;
      const maxHeight = 600;
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Wyczyść canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Zastosuj filtry i narysuj obraz
      applyFilters(canvas, ctx, img);
      
      setCurrentImage(img);
      setLoading(false);
      
      if (onImageLoad) {
        onImageLoad(img);
      }
    };

    img.onerror = () => {
      setLoading(false);
      console.error('Błąd ładowania obrazu');
    };

    img.src = url;
  }, [applyFilters, onImageLoad]);

  useEffect(() => {
    if (imageUrl) {
      loadImage(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (currentImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      applyFilters(canvas, ctx, currentImage);
    }
  }, [filters, currentImage]);

  return (
    <Box
      flex="1"
      h="100vh"
      bg="gray.100"
      position="relative"
    >
      <Center h="full">
        {loading ? (
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" />
            <Text>Loading image...</Text>
          </VStack>
        ): (
          <Box
            border="2px"
            borderColor="gray.300"
            borderStyle="dashed"
            borderRadius="md"
            p={4}
            bg="white"
            boxShadow="lg"
          >
            <canvas 
              ref={canvasRef}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                cursor: selectedTool === 'crop' ? 'crosshair' : 'default'
              }}
            />
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default ImageCanvas;