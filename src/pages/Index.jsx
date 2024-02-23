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
      for (let i = 0; i < colors.length - 1; i++) {
        for (let j = i + 1; j < colors.length; j++) {
          const colorPair = [colors[i], colors[j]].sort();
          const gradient = `linear-gradient(to right, ${colorPair[0]}, ${colorPair[1]})`;
          if (!newGradients.includes(gradient)) {
            newGradients.push(gradient);
          }
        }
      }
      setGradients(newGradients);
      setGradients(Array.from(newGradients));
    }
  };

  const extractAndGenerateGradients = () => {
    // Assuming we get an even number of colors, we take the middle two colors for the base
    const centerColors = gradients
      .map((gradient) => {
        const matches = gradient.match(/to right, (.*?), (.*?)\)/);
        return matches ? matches.slice(1, 3) : [];
      })
      .flat();
    setColors(centerColors);
    generateGradients();
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Enter a hex color code" value={inputColor} onChange={(e) => setInputColor(e.target.value)} mr={2} />
        <Button onClick={handleAddColor} leftIcon={<FaEyeDropper />} colorScheme="blue">
          Add Color
        </Button>
      </Box>
      <Button onClick={extractAndGenerateGradients} colorScheme="green" mb={4}>
        Find Base and Generate Gradients
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
