import React, { useState } from 'react'
import { HStack, Box  } from '@chakra-ui/react';
import { Provider } from './components/ui/provider';
import FiltersPanel from './components/image_editor/filters-panel';
import UploadArea from './components/image_editor/upload-ares';
import ExportModal from './components/image_editor/export-modal';
import ImageCanvas from './components/image_editor/image-canvas';
import ToolsPanel from './components/image_editor/tools-panel';
import './App.css'

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedTool, setSelectedTool] = useState('select');
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const handleImageSelect = (imageUrl, file) => {
    setCurrentImage({ url: imageUrl, file });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <Provider>
      <HStack spacing={0} h="90vh">
        <FiltersPanel 
          filters={filters}
          onFilterChange={handleFilterChange}
          onPresetFilter={(presetFilters) => setFilters(presetFilters)}
          onReset={() => setFilters({})}
          onUndo={() => {}}
          onRedo={() => {}}
        />

        <Box flex="1">
          {currentImage ? (
            <ImageCanvas 
              imageUrl={currentImage.url}
              filters={filters}
              selectedTool={selectedTool}
              onImageLoad={() => {}}
              onCanvasReady={() => {}}
            />
          ) : (
            <UploadArea 
              onImageSelect={handleImageSelect}
              recentImages={[]}
            />
          )}
        </Box>

        {currentImage && (
          <ToolsPanel 
            selectedTool={selectedTool}
            onToolSelect={setSelectedTool}
            onRotate={() => {}}
            onFlip={() => {}}
            onZoom={() => {}}
            onResize={() => {}}
            onAddText={() => {}}
            onCrop={() => {}}
            onExport={() => setExportModalOpen(true)}
          />
        )}

        <ExportModal 
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          onExport={(settings) => console.log('Export:', settings)}
        />
      </HStack>
    </Provider>
  );
}

export default App
