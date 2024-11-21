export default async function sendRequest(req) {
  const request = await fetch(
    "https://erzu0u5rye.execute-api.ap-south-1.amazonaws.com/default/fr",
    {
      method: req.method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  const response = await request.json();
  return response;
}
