import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  Spacer,
  Button,
  Flex,
} from "@chakra-ui/react";
import { TasksContext } from "../Contexts/TaskContext";
import { ITask, TaskContextType } from "../types/Task";
import { title } from "process";

type Props = {
  close: () => void;
  open: boolean;
  task: ITask;
};

const UpdateModal = ({ close, open, task }: Props) => {

  const { updateTasks } = useContext(TasksContext) as TaskContextType;

  const [upTitle, setUpTitle] = useState<string>(task.title);
  const [upDescription, setUpDescription] = useState<string>(task.description);

  const UpTask: ITask = {
    ...task,
    title: upTitle,
    description: upDescription,
  };

  function handleUpdateTask(upTask: ITask) {
    updateTasks(upTask.id, upTask);
    close();
  }

  return (
    <Modal isCentered isOpen={open} onClose={close}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        bgColor="desktopBg"
        color="txtColor"
        fontWeight="bold"
        fontFamily="inter"
      >
        <ModalHeader fontSize="3xl">
          {`Edit  "${task.title}"  task`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateTask(UpTask);
            }}
          >
            <Flex
              flexDirection="column"
              p="15px"
              bgColor="compBg"
              borderRadius="15px"
              my="10px"
            >
              <Text fontSize="xl" pb="10px">
                Edit task title{" "}
              </Text>
              <Input
                variant="outline"
                id="title"
                isRequired
                placeholder={`"${task.title}"`}
                onChange={(e) => setUpTitle(e.target.value)}
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
                Edit task description
              </Text>
              <Input
                variant="outline"
                id="description"
                placeholder={`"${task.description}"`}
                onChange={(e) => setUpDescription(e.target.value)}
              />
            </Flex>
            <Button
              w="100%"
              h="60px"
              bgColor="txtColor"
              color="desktopBg"
              borderRadius="10px"
              type="submit"
            >
              Save edits
            </Button>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
