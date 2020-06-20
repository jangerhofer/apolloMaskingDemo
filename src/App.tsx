import React, { FC as RFC } from "react";
import "./App.css";
import { filter } from "graphql-anywhere";

import { useQuery, gql, DocumentNode } from "@apollo/client";

export type FC<props = {}> = RFC<props> & { fragment: DocumentNode };

function App() {
  const { data } = useQuery(gql`
    query test {
      user {
        id
        ...Component1
        ...Component2
      }
    }

    ${Component1.fragment}
    ${Component2.fragment}
  `);

  return (
    <div className="App">
      <Component1 user={filter(Component1.fragment, data?.user ?? {})} />
      <Component2 user={filter(Component2.fragment, data?.user ?? {})} />
    </div>
  );
}

export default App;

const Component1: FC<any> = (props) => (
  <>
    <h1>Component #1</h1>
    <p>{JSON.stringify(props, null, 2)}</p>
  </>
);

Component1.fragment = gql`
  fragment Component1 on User {
    lastName
    activated
  }
`;

const Component2: FC<any> = (props) => (
  <>
    <h1>Component #2</h1>
    <p>{JSON.stringify(props, null, 2)}</p>
  </>
);

Component2.fragment = gql`
  fragment Component2 on User {
    lastName
    displayName
    activated
  }
`;
