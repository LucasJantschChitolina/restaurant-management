import React from "react";
import { ButtonProps } from "react-native";
import { Button } from "tamagui";

type AppButtonProps = ButtonProps & {
  children?: React.ReactNode;
  marginBottom?: string | number;
  title?: string;
};

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>((props, ref) => {
  return (
    <Button
      ref={ref}
      size="$3"
      borderRadius={10}
      backgroundColor="#D73035"
      color="white"
      marginBottom={props.marginBottom}
      {...props}
    >
      {props.children}
    </Button>
  );
});

export default AppButton;