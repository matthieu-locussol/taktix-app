interface ConditionalWrapperProps {
   condition: boolean;
   children: JSX.Element;
   wrapper: (children: JSX.Element) => JSX.Element;
}

export const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) =>
   condition ? wrapper(children) : children;
