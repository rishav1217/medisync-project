const BASE_URL = "http://localhost/medisync-php/api";

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include", // IMPORTANT for PHP session
  });

  return response.json();
}
