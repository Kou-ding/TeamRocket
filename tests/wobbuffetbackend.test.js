const test = require("ava");
const test_init = require("../test_init");

// Initialize the test environment
test_init();

test("GET /user/:id/trip/:id/day/:id/activity/:id should return an activity", async (t) => {
    const id = 101; // Single ID for user, trip, day, and activity
  
    const response = await t.context.got(`user/${id}/trip/${id}/day/${id}/activity/${id}`, {
      responseType: "json",
    });
  
    t.is(response.statusCode, 200, "Expected a 200 status code");
  
    const body = response.body;
  
    // Assert activity details
    t.is(body.name, "Snorkeling", "Expected activity name to be 'Snorkeling'");
    t.is(body.description, "Explore the coral reefs.", "Expected activity description to match");
    t.is(body.lockedStatus, false, "Expected lockedStatus to be false");
  });
  
test("PUT /user/:id/trip/:id/day/:id/activity/:id should update an activity", async (t) => {
    const id = 101; // Single ID for user, trip, day, and activity
    const updatedActivity = {
      name: "Dinner by the beach",
      description: "Enjoy a candlelight dinner.",
      lockedStatus: true,
    };
  
    const response = await t.context.got.put(`user/${id}/trip/${id}/day/${id}/activity/${id}`, {
      json: updatedActivity,
      responseType: "json",
    });
  
    t.is(response.statusCode, 200, "Expected a 200 status code");
  
    const body = response.body;
  
    // Assert the overall structure of the response
    t.is(body.id, 1, "Expected day ID to be 1");
    t.is(body.dayNumber, 1, "Expected dayNumber to be 1");
    t.true(Array.isArray(body.activityList), "Expected activityList to be an array");
  
    // Find the updated activity in the activityList
    const updated = body.activityList.find((activity) => activity.name === "Dinner by the beach");
    t.truthy(updated, "Expected the updated activity to be present in activityList");
  
    // Assert updated activity details
    t.is(updated.name, "Dinner by the beach", "Expected activity name to be updated to 'Dinner by the beach'");
    t.is(updated.description, "Enjoy a candlelight dinner.", "Expected activity description to be updated");
    t.is(updated.lockedStatus, true, "Expected lockedStatus to be updated to true");
  });
  
test("GET /user/:id/trip/:id/day/:id/generateRandomActivities should generate random activities", async (t) => {
    const id = 101; // Single ID for user, trip, and day
  
    const response = await t.context.got(`user/${id}/trip/${id}/day/${id}/generateRandomActivities`, {
      responseType: "json",
    });
  
    t.is(response.statusCode, 200, "Expected a 200 status code");
  
    const body = response.body;
  
    // Assert the overall structure of the response
    t.is(body.id, 1, "Expected day ID to be 1");
    t.is(body.dayNumber, 1, "Expected dayNumber to be 1");
    t.true(Array.isArray(body.activityList), "Expected activityList to be an array");
  
    // Assert the first activity
    const snorkeling = body.activityList.find((activity) => activity.name === "Snorkeling");
    t.truthy(snorkeling, "Expected Snorkeling activity to be present in activityList");
    t.is(snorkeling.name, "Snorkeling", "Expected activity name to be 'Snorkeling'");
    t.is(snorkeling.description, "Explore the coral reefs.", "Expected activity description to match");
    t.is(snorkeling.lockedStatus, false, "Expected lockedStatus for Snorkeling to be false");
  
    // Assert the second activity
    const dinner = body.activityList.find((activity) => activity.name === "Dinner by the beach");
    t.truthy(dinner, "Expected Dinner by the beach activity to be present in activityList");
    t.is(dinner.name, "Dinner by the beach", "Expected activity name to be 'Dinner by the beach'");
    t.is(dinner.description, "Enjoy a candlelight dinner.", "Expected activity description to match");
    t.is(dinner.lockedStatus, true, "Expected lockedStatus for Dinner by the beach to be true");
  });
  
  
