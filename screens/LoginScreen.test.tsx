import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";

import LoginScreen from "./LoginScreen";

it("renders correctly", () => {
  // le truc de base à faire, tu devrais créer un fichier type avec tout le temps ça :)
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Renders all elements we wanted if AllowText is true", () => {
  const { getAllByText, getAllByPlaceholderText } = render(
    <LoginScreen navigation={null} />
  );

  expect(getAllByText("Hello").length).toBe(1); // si tu veux par exemple vérifier en fonction d'une valeur qu'un élément soit bien affiché ou pas, à voir si il y a pas d'autres options également

  getAllByPlaceholderText("Username");
  getAllByPlaceholderText("Password");
});

it("check if username or password are empty", async () => {
  const { getByTestId, getByText, queryByText } = render(
    <LoginScreen navigation={null} />
  );

  fireEvent.press(getByTestId("Login.Button"));

  //await waitFor(() => getByText("Your username or password is incorrect")); waitFor au cas où tu aurais besoin d'attendre une update usestate bien plus important

  //getByText("Your username or password is incorrect");

  getByText("Your username or password is incorrect");

  // await waitFor( // autre soluce également !
  //   () => {
  //     // const counter = getByTestId("Login.errorMessage");
  //     // expect(counter.props.children).toBe(
  //     //   "Your username or password is incorrect"
  //     // );
  //     getByText("Your username or password is incorrect");
  //   },
  //   { timeout: 5000 }
  // );
});

it("check if login is successful and open new url", async () => {
  const mockedNavigate = jest.fn().mockReturnValue(true);

  const mockedNavigation = { navigate: mockedNavigate };

  const { getByTestId, getByText, queryByText } = render(
    <LoginScreen navigation={mockedNavigation as any} />
  );

  fireEvent.changeText(getByTestId("Login.username"), "Eric");

  fireEvent.changeText(getByTestId("Login.password"), "Dublin");

  fireEvent.press(getByTestId("Login.Button"));

  // //Pour attendre un call API, à voir avec Axios ducoup !
  // await act(() => new Promise((resolve) => setImmediate(resolve)));

  await waitFor(
    () => {
      expect(mockedNavigate).toBeCalledWith("NotFound");
    },
    { timeout: 5000 }
  );

  // expect(mockedNavigate).toBeCalledWith("NotFound"); // vérification si cela est bien appelé avec le bon paramètre attendu
});
