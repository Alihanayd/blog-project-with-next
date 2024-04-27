import H1 from "@/components/h1";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <H1 {...props}> {props.children} </H1>,
    ...components,
  };
}
