import React, { useState } from "react";
import { Box, Input, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaEyeDropper } from "react-icons/fa";

const Index = () => {
  const [colors, setColors] = useState(["#ff0000", "#00ff00"]);
  const [inputColor, setInputColor] = useState("");
  const [gradients, setGradients] = useState([]);
  const toast = useToast();

  const handleAddColor = () => {
    if (inputColor && /^#([0-9A-F]{3}){1,2}$/i.test(inputColor)) {
      setColors([...colors, inputColor]);
      setInputColor("");
    } else {
      toast({
        title: "Invalid color",
        description: "Please enter a valid hex color",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const generateGradients = () => {
    if (colors.length === 1) {
      setGradients([`linear-gradient(to right, ${colors[0]}, ${colors[0]})`]);
    } else {
      const newGradients = [];
      for (let i = 0; i < colors.length; i++) {
        for (let j = i + 1; j < colors.length; j++) {
          newGradients.push(`linear-gradient(to right, ${colors[i]}, ${colors[j]})`);
          newGradients.push(`linear-gradient(to right, ${colors[j]}, ${colors[i]})`);
        }
      }
      setGradients(newGradients);
    }
  };

  const extractCenterColor = () => {
    const centerColors = gradients.map((gradient) => gradient.match(/to right, (.*?), (.*?)\)/)[2]);
    setColors(centerColors, generateGradients);
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Enter a hex color code" value={inputColor} onChange={(e) => setInputColor(e.target.value)} mr={2} />
        <Button onClick={handleAddColor} leftIcon={<FaEyeDropper />} colorScheme="blue">
          Add Color
        </Button>
      </Box>
      <Button onClick={generateGradients} colorScheme="green" mb={4}>
        Generate Gradients
      </Button>
      <SimpleGrid columns={3} spacing={4}>
        {gradients.map((gradient, index) => (
          <Box key={index} h="100px" bg={gradient} borderRadius="md" cursor="pointer" />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;
