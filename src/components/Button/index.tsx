import { Button } from "@chakra-ui/react";
import "@fontsource/open-sans";
import { CustomButtonTypeProps } from "../../types";

export const ButtonPrimary = ({
  customFontSize,
  title,
  onclick,
  isloading,
  isDisabled,
}: CustomButtonTypeProps) => {
  return (
    <Button
      disabled={isDisabled}
      isLoading={isloading}
      loadingText='Submitting'
      h='max-content'
      bgColor='#2296CB'
      padding='10px 15px'
      letterSpacing='1px'
      fontSize={customFontSize === undefined ? '12px' : customFontSize}
      borderRadius='7px'
      color='white'
      transition='all 0.5s ease'
      _hover={{
        bgColor: "#3CA9DB",
      }}
      _focus={{
        border: "none",
      }}
      _active={{
        border: "none",
        bgColor: "#1788BB",
      }}
      onClick={onclick}>
      {title}
    </Button>
  );
};

export const ButtonSecondary = ({
  customFontSize,
  title,
  onclick,
  isloading,
  isDisabled,
}: CustomButtonTypeProps) => {
  return (
    <Button
      disabled={isDisabled}
      isLoading={isloading}
      loadingText='Submitting'
      h='max-content'
      bgColor='white'
      padding='8px 13px'
      border='2px solid #2296CB'
      letterSpacing='1px'
      fontSize={customFontSize === undefined ? '12px' : customFontSize}
      borderRadius='7px'
      color='#2296CB'
      transition='all 0.5s ease'
      _hover={{
        color: "white",
        border: "2px solid #2296CB",
        bgColor: "#2296CB",
      }}
      _focus={{
        border: "2px solid #2296CB",
      }}
      _active={{
        border: "2px solid #1788BB",
        bgColor: "#1788BB",
      }}
      onClick={onclick}>
      {title}
    </Button>
  );
};

export const ButtonTertier = ({
  customFontSize,
  title,
  onclick,
  isloading,
  isDisabled,
}: CustomButtonTypeProps) => {
  return (
    <Button
      disabled={isDisabled}
      isLoading={isloading}
      loadingText='Submitting'
      h='max-content'
      bgColor='white'
      padding='10px 15px'
      letterSpacing='1px'
      fontSize={customFontSize === undefined ? '12px' : customFontSize}
      borderRadius='7px'
      color='#2296CB'
      transition='all 0.5s ease'
      _hover={{
        bgColor: "#2296CB",
        color: "white",
      }}
      _focus={{
        border: "none",
      }}
      _active={{
        border: "none",
        bgColor: "#1788BB",
      }}
      onClick={onclick}>
      {title}
    </Button>
  );
};
