const userService = require("../../Service/user.service");
const dao = require("../../DAO/user.dao");
jest.mock("../../DAO/user.dao", () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));
describe("userService.getAllUsers", () => {
  it("should return all users", async () => {
    const expectedUsers = {
      id: 2,
      first_name: "Vijay",
      last_name: "P",
      email_id: "p.vijay@litmus7.com",
    };

    dao.getAllUsers.mockResolvedValue(expectedUsers);

    const req = {};
    const send = jest.fn();
    const res = { send };

    await userService.getAllUsers(req, res);

    expect(send).toHaveBeenCalledWith({
      status: 200,
      data: expectedUsers,
      message: "Retreived all users",
    });
  });

  it("should return an error message if dao.getAllUsers throws an error", async () => {
    const expectedError = new Error(
      "An error occurred while getting all users"
    );

    dao.getAllUsers.mockRejectedValue(expectedError);

    const req = {};
    const status = jest.fn(() => ({ send: jest.fn() }));
    const res = { status };

    await userService.getAllUsers(req, res);

    expect(status).toHaveBeenCalledWith(500);
  });
});

describe("userService.getUserById", () => {
  it("should return a user with a specific id", async () => {
    const expectedUser = {
      id: 2,
      first_name: "Vijay",
      last_name: "P",
      email_id: "p.vijay@litmus7.com",
    };

    dao.getUserById.mockResolvedValue(expectedUser);

    const req = { params: { id: "2" } };
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    const res = { send, status };

    await userService.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith({
      status: 200,
      data: expectedUser,
      message: "User found",
    });
  });

  it("should return an error when an invalid id is provided", async () => {
    const req = { params: { id: "invalid" } };
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    const res = { send, status };

    await userService.getUserById(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith("Invalid user id");
  });

  it("should return an error when no user is found with the provided id", async () => {
    dao.getUserById.mockResolvedValue(null);

    const req = { params: { id: "3" } };
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    const res = { send, status };

    await userService.getUserById(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith({
      status: 400,
      data: [],
      message: "No such user",
    });
  });
});

describe("userService.addUser", () => {
  it("should add a new user and return it", async () => {
    const newUser = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };

    const expectedUser = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };

    dao.addUser.mockResolvedValue(expectedUser);

    const req = {
      body: newUser,
    };

    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    const res = { send, status };

    await userService.addUser(req, res);

    expect(send).toHaveBeenCalledWith({
      status: 201,
      data: expectedUser,
      message: "Created new user",
    });
  });

  it("should return an error message if dao.addUser throws an error", async () => {
    const newUser = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email_id: "johndoe@example.com",
    };

    const expectedError = new Error(
      "An error occurred while adding a new user"
    );

    dao.addUser.mockRejectedValue(expectedError);

    const req = {
      body: newUser,
    };
    const status = jest.fn(() => ({ send: jest.fn() }));
    const res = { status };

    await userService.addUser(req, res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
