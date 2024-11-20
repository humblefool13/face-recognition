export default async function sendRequest(req) {
  console.log(req.headers);
  const request = await fetch(
    "https://3t2mxdqyx1.execute-api.ap-south-1.amazonaws.com/default/fr",
    {
      method: req.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  const response = await request.json();
  return response;
}
