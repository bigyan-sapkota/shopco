import { Button } from "@mantine/core";
import clsx from "clsx";
import React from "react";

export default function CustomButton({ children, className, variant, size }) {
  return (
    <Button
      className={clsx(
        variant === "primary" && "bg-red-700 text-white",
        className
      )}
    >
      {children}
    </Button>
  );
}
