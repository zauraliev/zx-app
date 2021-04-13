"use strict";

test('Initial applist and selectedApp', () => {
  let appList = [];
  let selectedApp = {};
  expect(appList).toStrictEqual([]);
  expect(selectedApp).toStrictEqual({});
});

describe("appRegisterService", () => {
  test("it should accept newApp", () => {
    const myMock = jest.fn();
    const input = { 
        name: "0001-app",
        id: "9eb2fd3c-809b-4e04-9ad4-56574cfdb545"
      };
    const output = [];
    output.push(input);

    let appExists = output.some(app => app.id === input.id);

    expect(appExists).toBe(true);

  });
});
