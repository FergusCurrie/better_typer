import React from "react";
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Header from "./components/Header";
import QueryAPI from "./components/QueryAPI";
import { Button, ButtonGroup} from '@chakra-ui/react'
import theme from "./theme";
import { ColorModeScript } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
import { Center, Square, Circle } from '@chakra-ui/react'


function App() {

  // refactor to better names eg correct text, to go text )()

  // Dealing with text area.
  // React.useState('') makes a stateful variable value, updated by setValue(X)
  // const target_text = 'The quick brown fox jumped over the lazy dog'

  // INitalising the target text 
  let [target_text, set_target_text] = React.useState('')
  let [typed_text, set_typed_text] = React.useState('') //
  let [correct_text, set_correct_text] = React.useState('') //  
  let [remaining_text, set_remaining_text] = React.useState('')
  let [current_letter, set_current_letter] = React.useState('')
  let [incorrect_text, set_incorrect_text] = React.useState('') 
  let [uuid, set_uuid] = React.useState('334324234') 

  const fetchTargetText = async () => {
    const response = await fetch("http://localhost:8000/query")
    const data = await response.json()
    set_target_text(data.target_text)
    set_uuid(data.uuid)
  }

  const putLog = async (inputValue) => {
    let log = {
      "uuid" : uuid,
      "input" : inputValue
    }
    fetch("http://localhost:8000/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log)
    })
  }

  useEffect(() => {
    fetchTargetText()
  }, []) 

  useEffect(() => {
    set_remaining_text(target_text.slice(1,target_text.length))
    set_current_letter(target_text.slice(0,1))
  }, [target_text])
    

  // handler for updates to Textarea. Notice in chakra the onChange listener. 
  let handleInputChange = (e) => {
    let inputValue = e.target.value
    putLog(inputValue)
    set_typed_text(inputValue)

    // inputValue equal to target_text up to what index?
    let last_index_correct = -1
    for (let i = 0; i < inputValue.length; i++){
      if (inputValue[i] != target_text[i]){
        break
      }
      last_index_correct = i
    }
    
    set_correct_text(inputValue.slice(0, last_index_correct+1))
    set_incorrect_text(target_text.slice(last_index_correct+1, inputValue.length))
    set_current_letter(target_text.slice(inputValue.length, inputValue.length+1))
    set_remaining_text(target_text.slice(inputValue.length+1, target_text.length)) // 1 for indexing in js 2 for curent letter 
  }


  return (
    <ChakraProvider theme={theme}>

      <Box position='relative'>
        <Box>
          <Center>
            <Box w='80%' >
            <Text as="span" fontSize='5xl' color='green'>{correct_text}</Text>
            <Text as="mark" fontSize='5xl'>{incorrect_text}</Text>
            <Text as="u" fontSize='5xl' color='white'>{current_letter}</Text>
            <Text as="span" fontSize='5xl' color='white'>{remaining_text}</Text>
          </Box>
          </Center> 
          <Center>
            <Box w='50%' borderWidth='1px' >
              <Textarea 
                value={typed_text}
                onChange={handleInputChange}
                placeholder='Type here' 
                size='xl'
                fontSize='xl'
                color='white'
              />
            </Box>
          </Center>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

// <Button colorScheme='blue' onClick={doClear}>Clear</Button>

const rootElement = document.getElementById("root")
render(<App />, rootElement)