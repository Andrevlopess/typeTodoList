import { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Image,
  Avatar,
  AvatarBadge,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faUser, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AuthContext } from '../Contexts/Auth/AuthContext'
import { AuthContextType, TaskContextType } from '../types/Task'
import { TasksContext } from '../Contexts/TaskContext'
import { useFormik } from 'formik'

type Props = {}

const AccountSettingDrawer = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { currentUser, cleanUser, updateUserName } = useContext(AuthContext) as AuthContextType

  const { tasks } = useContext(TasksContext) as TaskContextType
  const [newNameError, setNewNameError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      name: currentUser?.displayName ? currentUser.displayName : "Unknown user name"
    },
    onSubmit: (value) => {

      const reg = /(?=(?:.*?[0-9]){1})/
      if (reg.test(value.name)) {
        setNewNameError("Please enter only letters")
      } else {
        updateUserName(value.name)
      }

    }
  })


  return (
    <>
      <Flex onClick={onOpen}><FontAwesomeIcon icon={faUser} color='#d1d1d1' /></Flex>
      <Drawer onClose={onClose} isOpen={isOpen} placement={'left'}>
        <DrawerOverlay />
        <DrawerContent bgColor='desktopBg' color='txtColor'>
          <DrawerCloseButton />
          <DrawerHeader color='txtY'>
            <Text>My account</Text>
          </DrawerHeader>
          <DrawerBody>

            <Flex w='100%' justifyContent='center' my='20px' flexDirection='column' alignItems='center'>

              <Avatar
                name={`${currentUser && currentUser.displayName}`}
                src={`${currentUser && currentUser.photoURL}`}
                boxSize='130px'>
              </Avatar>

              <Flex justifyContent='center' my='40px' flexDirection='column'>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}>
                  <Text>Name</Text>
                  <FormControl isInvalid={newNameError !== null}>
                    <InputGroup>
                      <Input variant='flushed' value={formik.values.name} onChange={formik.handleChange} name='name' id='name' type='text' />
                      <InputRightElement
                        children={<FontAwesomeIcon icon={faCheck} color='#d1d1d1' />}
                        as='button' type='submit'
                      />
                    </InputGroup>
                    <FormErrorMessage>{newNameError}</FormErrorMessage>
                  </FormControl>
                </form>

              </Flex>
              <Flex alignItems='center' justifyContent='space-between' w='100%' p='10px' bgColor='compBg' borderRadius='8px' onClick={onClose}>
                <Text fontSize='20px'>Tasks</Text>
                <Text>{`(${tasks.length})`}</Text>
              </Flex>
            </Flex>
          </DrawerBody>
          <DrawerFooter>

            <Flex w='100%' bgColor='compBg' justifyContent='space-between' p='15px' borderRadius='8px' alignItems='center' onClick={cleanUser}>
              <Text>Change user</Text>
              <FontAwesomeIcon icon={faUserMinus} />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

  )
}

export default AccountSettingDrawer