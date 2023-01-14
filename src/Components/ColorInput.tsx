import { Box, Flex, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />

      <Box
        bgColor={props.color}
        {...checkbox}
        borderColor={props.color === props.currColor ? "white" : props.color}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="50%"
        boxShadow="md"
        _checked={{
          color: "white",
          borderColor: "white",
        }}
        px={3}
        py={3}
        m="4px"
      >
        {props.children}
      </Box>
    </Box>
  );
}
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.

type InputTypes = {
  setColor: (color: string) => void;
  currColor: string;
};

function CardColorInput({ setColor, currColor }: InputTypes) {
  const colors = [
    "desktopBg",
    "cardRed",
    "cardPurple",
    "cardLightBlue",
    "cardDarkBlue",
    "cardYellow",
    "cardGreen",
    "cardPink",
  ];


  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Colors",
    defaultValue: currColor,
    onChange: setColor,
  });

  const group = getRootProps();

  return (
    <Flex {...group} flexWrap="wrap">
      {colors.map((value) => {
        const radio = getRadioProps({ value });
        return <RadioCard key={value} {...radio} color={value} currColor={currColor}></RadioCard>;
      })}
    </Flex>
  );
}

export default CardColorInput;
