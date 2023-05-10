const { validateUser } = require("../../Service/user.service");

describe("validateUser function", () => {
  it("should return an error if user id is invalid", () => {
    const invalidUser = {
      id: "invalid id",
      first_name: "John",
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };
    const validationResult = validateUser(invalidUser);
    expect(validationResult.error).toBeDefined();
  });

  it("should return an error if user first_name is invalid", () => {
    const invalidUser = {
      id: 1,
      first_name: 1,
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };
    const validationResult = validateUser(invalidUser);
    expect(validationResult.error).toBeDefined();
  });

  it("should return an error if user last_namme is invalid", () => {
    const invalidUser = {
      id: 1,
      first_name: "John",
      last_name: 1,
      email_id: "johndoe@example.com",
    };
    const validationResult = validateUser(invalidUser);
    expect(validationResult.error).toBeDefined();
  });
  it("should return an error if user email is invalid", () => {
    const invalidUser = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email_id: "johndoe@example",
    };
    const validationResult = validateUser(invalidUser);
    expect(validationResult.error).toBeDefined();
  });
  it("should return an error if user first_name is smaller than 3 character length", () => {
    const invalidUser = {
      id: 1,
      first_name: "J",
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };
    const validationResult = validateUser(invalidUser);
    expect(validationResult.error).toBeDefined();
  });

  it("should return an error if user last_name is smaller than 3 character length", () => {
    const invalidUser = {
      id: 1,
      first_name: "John",
      last_name: "D",
      email_id: "johndoe@example.com",
    };
    const validationResult = validateUser(invalidUser);
    expect(validationResult.error).toBeDefined();
  });

  it("should return undefined if user data is valid", () => {
    const validUser = {
      id: 123,
      first_name: "John",
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };
    const validationResult = validateUser(validUser);
    expect(validationResult.error).toBeUndefined();
  });
});
