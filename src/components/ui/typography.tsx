import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva(undefined, {
  variants: {
    variant: {
      h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-center text-muted-foreground text-xl",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-muted-foreground text-sm",
    },
  },
  defaultVariants: { variant: "p" },
});

type TypographyProps<T extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<T> & { as?: T }
> &
  VariantProps<typeof typographyVariants>;

export function Typography<T extends ElementType = "p">(
  props: TypographyProps<T>
) {
  const { as: Component = "p", variant, className, ...otherProps } = props;
  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...otherProps}
    />
  );
}