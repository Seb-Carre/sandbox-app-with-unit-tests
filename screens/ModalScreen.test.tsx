import React from "react";
import renderer from "react-test-renderer";

import ModalScreen from "./ModalScreen";

describe("<ModalScreen />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<ModalScreen />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});

it("renders correctly", () => {
  const tree = renderer.create(<ModalScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
