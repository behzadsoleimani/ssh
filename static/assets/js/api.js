// @ts-check
const BASE_URL = "/api/v1";

/**
 * Fetches data from the specified endpoint.
 * @param {string} endPoint - The endpoint to fetch data from.
 * @param {object} [options={}] - Additional options for the fetch request.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 * @throws {Error} If an error occurs during the fetch request.
 */
export async function fetchData(endPoint, options = {}) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined, // Check if body exists, then stringify it
  };

  return fetch(`${BASE_URL}/${endPoint}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
