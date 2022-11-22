import React from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Textarea placeholder='Here is a sample placeholder' />
    </ChakraProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)