

// Test: GET /user/:id/trip/:id
test("GET /user/:id/trip/:id should return trip details", async (t) => {
  const userId = 101;
  const tripId = 101;

  const response = await t.context.got(ROUTES.getTrip(userId, tripId));
  assertResponse(t, response, 200, "Trip details API should return 200 status");

  const body = response.body;
  t.is(body.id, tripId, "Expected trip ID to match");
  t.is(body.name, "Beach Vacation", "Expected trip name to match");
  t.deepEqual(body.transportation, {
    name: "Flight",
    date: "2024-12-20",
    time: 930,
  }, "Expected transportation details to match");
});

// Test: POST /user/:id/trip/:id/accommodation
test("POST /user/:id/trip/:id/accommodation should add accommodation", async (t) => {
  const userId = 101;
  const tripId = 101;
  const newAccommodation = {
    name: "Paradise Inn",
    address: "123 Beach Road, Maldives",
    price: 1500,
  };

  const response = await t.context.got.post(ROUTES.addAccommodation(userId, tripId), {
    json: newAccommodation,
  });

  assertResponse(t, response, 200, "Add accommodation API should return 200 status");

  const body = response.body;
  t.is(body.accommodation.name, newAccommodation.name, "Expected accommodation name to match");
  t.is(body.accommodation.address, newAccommodation.address, "Expected accommodation address to match");
  t.is(body.accommodation.price, newAccommodation.price, "Expected accommodation price to match");
});

// Test: POST /user/:id/trip/:id/transportation
test("POST /user/:id/trip/:id/transportation should add transportation", async (t) => {
  const userId = 101;
  const tripId = 101;
  const newTransportation = {
    name: "Flight",
    date: "2024-12-20",
    time: 930,
  };

  const response = await t.context.got.post(ROUTES.addTransportation(userId, tripId), {
    json: newTransportation,
  });

  assertResponse(t, response, 200, "Add transportation API should return 200 status");

  const body = response.body;
  t.is(body.transportation.name, newTransportation.name, "Expected transportation name to match");
  t.is(body.transportation.date, newTransportation.date, "Expected transportation date to match");
  t.is(body.transportation.time, newTransportation.time, "Expected transportation time to match");
});
