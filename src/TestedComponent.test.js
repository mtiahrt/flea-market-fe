import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MyComponent from "./MyComponent";

Enzyme.configure({ adapter: new Adapter() });
describe("MyComponent", () => {
  it("show the text", () => {
    const wrapper = shallow(<MyComponent />);
    const text = wrapper.find("div div.toggled-text");
    expect(text.text()).toBe("Text goes here");
  });

  it("hide the text", () => {
    const wrapper = shallow(<MyComponent />);
    const button = wrapper.find("button");
    button.simulate("click");
    const text = wrapper.find("div div.toggled-text");
    expect(text.length).toBe(0);
  });
});
