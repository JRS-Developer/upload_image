import { ButtonHTMLAttributes, createElement } from "react";

type Variant = "primary" | "success";

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: React.ReactNode;
  component?: React.ElementType;
  variant?: Variant;
}

const Button = ({
  children,
  component = "button",
  variant = "primary",
  ...rest
}: Props) => {
  const defaultClassName =
    "text-xs 2xl:text-sm text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline focus:outline-2 focus:outline-black";

  const variants: { [key in Variant]: string } = {
    primary: "bg-primary hover:bg-blue-600",
    success: "bg-success hover:bg-green-700",
  };
  return createElement(
    component,
    {
      className: `${defaultClassName} ${variants?.[variant]}`,
      role: "button",
      ...rest,
    },
    children
  );
};

export default Button;
