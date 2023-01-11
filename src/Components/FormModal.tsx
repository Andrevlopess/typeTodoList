import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Spacer,
  Flex,
  Button,
  Select,
  useRadioGroup,
  forwardRef,
} from "@chakra-ui/react";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import CardColorInput from "./ColorInput";
import { AuthContext } from "../Contexts/Auth/AuthContext";
import useTasks from "../Hooks/useTask";


type Props = {
  close: () => void;
  open: boolean;
};

const FormModal = ({ open, close }: Props) => {

  const {user} = useContext(AuthContext) as AuthContextType


  const [taskTitle, setTaskTitle] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [cardColor, setCardColor] = useState<string>("");
  const [taskType, setTaskType] = useState<string>("Normal");

  const [saveTasks] = useTasks()

  const handleForm = (): ITask => {

    const taskData: ITask = ({
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      done: false,
      type: taskType,
      color: cardColor,
      userId: user.uid ? user.uid : "no user id task"
    });

    setTaskTitle("")
    setTaskDescription("")
    setTaskType("Normal")

    return taskData
  };



  const handleSaveTodo = (e: React.FormEvent) => {
    e.preventDefault();
    saveTasks(handleForm());
    close();
  };


  return (
    <Modal scrollBehavior="outside" isOpen={open} onClose={close}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(6px) hue-rotate(5deg)"
      />
      <ModalContent
        bgColor="desktopBg"
        color="txtColor"
        fontWeight="bold"
        fontFamily="inter"
      >
        <ModalHeader fontSize="3xl">Create a Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => handleSaveTodo(e)}>
            <Flex
              flexDirection="column"
              p="15px"
              bgColor="compBg"
              borderRadius="15px"
              my="20px"
            >
              <Text fontSize="xl" pb="10px">
                Task Title
              </Text>
              <Input
                variant="outline"
                id="title"
                isRequired
                placeholder="Ex. Study typescript"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Flex>

            <Flex
              flexDirection="column"
              p="15px"
              bgColor="compBg"
              borderRadius="15px"
              my="10px"
            >
              <Text fontSize="xl" pb="10px">
                Task Description
              </Text>
              <Input variant="outline" id="description" onChange={(e) => setTaskDescription(e.target.value)} />
            </Flex>

            <Flex>
              <Flex
                flexDirection="column"
                p="15px"
                bgColor="compBg"
                borderRadius="15px"
                my="10px"
                w="100%"
                mr="10px"
              >
                <Text fontSize="xl" pb="10px">
                  Task type
                </Text>
                <Select id='type' onChange={(e) => setTaskType(e.target.value)}>
                  <option style={{ backgroundColor: "#292929" }} value="Normal">
                    Normal
                  </option>
                  <option
                    value="Important"
                    style={{ backgroundColor: "#B73E3E" }}
                  >
                    Important
                  </option>
                </Select>
              </Flex>
              <Flex
                flexDirection="column"
                p="15px"
                bgColor="compBg"
                borderRadius="15px"
                my="10px"
                w="100%"
              >
                <Text fontSize="xl" pb="10px">
                  Card Color
                </Text>

                <CardColorInput setColor={setCardColor} currColor={cardColor} />
              </Flex>
            </Flex>
            <Button
              w="100%"
              h="60px"
              bgColor={cardColor}
              color="txtColor"
              borderRadius="10px"
              type="submit"

            >
              Create
            </Button>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
