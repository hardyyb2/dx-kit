import React from "react";

import { Render } from "./components/Render";

export interface ConditionalMatchProps {
  /** The fallback element to render if no children match the condition */
  fallback: React.ReactNode;
  /** The children to search for a matching condition */
  children?: JSX.Element | JSX.Element[] | null;
  /**  Whether to render all matching children (if true) or only the first matching child (if false) */
  multiMatch?: boolean;
}

const ConditionalMatch = ({ fallback, children = null, multiMatch = false }: ConditionalMatchProps): JSX.Element => {
  const matchedChildren = React.useMemo(() => {
    const childrenToRender: JSX.Element[] = [];

    React.Children.forEach(children, (child) => {
      if (child?.type !== Render) {
        return;
      }

      if (!multiMatch && childrenToRender?.length >= 1) {
        return;
      }

      if (child?.props?.when) {
        childrenToRender.push(child);
      }
    });

    return childrenToRender;
  }, [children, multiMatch]);

  if (matchedChildren?.length) {
    return <React.Fragment>{matchedChildren}</React.Fragment>;
  }

  return <React.Fragment>{fallback}</React.Fragment>;
};

const ConditionalMatchCompound = Object.assign(ConditionalMatch, {
  Render,
});

export { ConditionalMatchCompound as ConditionalMatch };
