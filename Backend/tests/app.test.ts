import request from "supertest";
import app from "../src/app";

describe("Express App", () => {
  it("should return 200 OK for the root path", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Welcome to the API Of Easy Assets");
  });

  it("should return 404 for non-existent routes", async () => {
    const response = await request(app).get("/non-existent-route");
    expect(response.status).toBe(404);
  });

  it("should return 200 for assets creation", async () => {
    const testCase = {
      assetId: "AST-1001",
      name: "Dell Latitude 7420 Laptop",
      category: "Electronics",
      description: "Used for software development by the engineering team.",
      location: "Head Office - 3rd Floor",
      status: "in_use",
      assignedTo: "employee_12345",
      purchaseDate: new Date("2023-01-15"),
      warrantyDate: new Date("2025-01-15"),
      lastMaintained: new Date("2024-12-01"),
      nextMaintenance: new Date("2025-06-01"),
      qrCodeUrl: "https://example.com/qrcode/AST-1001.png",
      createdBy: "admin_user_001",
    };

    const response = await request(app).post("/api/assets").send(testCase);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Data is valid");
  });
});
