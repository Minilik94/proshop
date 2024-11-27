import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../app.js"; // Ensure correct path to your app
import User from "../../models/userModel.js";

describe("user", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Cleanup test data
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const userId = "nonexistent-user-id";
        await supertest(app).get(`/api/users/${userId}`).expect(404);
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 with the user", async () => {
        const user = await User.create({
          name: "Test User",
          email: "test@example.com",
          password: "hashed_password"
        });

        const { body, statusCode } = await supertest(app).get(`/api/users/${user._id}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(
          expect.objectContaining({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          })
        );
      });
    });


    describe("given the user is not an admin user", () => {
      it("should return a 401", async () => {
        const user = await User.create({
          name: "Test User",
          email: "test@example.com",
          password: "hashed_password"
        });

        const { body, statusCode } = await supertest(app).get(`/api/users/${user._id}`);

        expect(statusCode).toBe(401);
      });
    })
  });
});
