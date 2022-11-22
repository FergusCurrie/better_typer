import React, { useEffect, useState } from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Header from "./components/Header";
import { Button, ButtonGroup } from '@chakra-ui/react'


function App() {
  // Function to clear input 
  const doClear = () =>{
    set_typed_text('')
    // curr_text = "yy"
  }

  // Dealing with text area.
  // React.useState('') makes a stateful variable value, updated by setValue(X)
  const target_text = 'The quick brown fox jumped over the lazy dog'
  let [typed_text, set_typed_text] = React.useState('') //
  let [highlighted_text, set_highlighted_text] = React.useState('') //  
  let [un_highlighted_text, set_un_highlighted_text] = React.useState(target_text)


  // handler for updates to Textarea. Notice in chakra the onChange listener. 
  let handleInputChange = (e) => {
    let inputValue = e.target.value
    set_typed_text(inputValue)

    // inputValue equal to target_text up to what index?
    let last_index_correct = -1
    for (let i = 0; i < inputValue.length; i++){
      if (inputValue[i] != target_text[i]){
        break
      }
      last_index_correct = i
    }
    set_highlighted_text(inputValue.slice(0, last_index_correct+1))
    set_un_highlighted_text(target_text.slice(last_index_correct+1, target_text.length))
  }

  return (
    <ChakraProvider>
      <Header />
      <Text as="span" fontSize='5xl' color='red'>{highlighted_text}</Text>
      <Text as="span" fontSize='5xl'>{un_highlighted_text}</Text>

      <Textarea 
        value={typed_text}
        onChange={handleInputChange}
        placeholder='Type here' 
      />
      
    </ChakraProvider>
  )
}

// <Button colorScheme='blue' onClick={doClear}>Clear</Button>

const rootElement = document.getElementById("root")
render(<App />, rootElement)