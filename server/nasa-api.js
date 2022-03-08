/**
 * @typedef {{
 *    href: string,
 *    description: string | null,
 *    title: string,
 *  }} SearchResultItem
 * 
 * @typedef {{
 *   total: number,
 *   items: SearchResultItem[],
 * }} SearchResult
 */

const SEARCH_ENDPOINT = "https://images-api.nasa.gov/search";
/**
 * Search for images
 * 
 * Not in scope: how to deal with api rate limit?
 * 
 * See https://api.nasa.gov/.
 *    > Hourly Limit: 30 requests per IP address per hour
 *    > Daily Limit: 50 requests per IP address per day
 * 
 * Any error will be thrown.
 * 
 * @param {string} query 
 * @param {number} from 
 * @returns {Promise<SearchResult>}
 */
exports.search = (query, from) => {
  return fetch(`${SEARCH_ENDPOINT}?q=${query}&page=${from}`)
    .then(response => response.json())
    .then(parseNasaResponse)
    .catch(error => {
      console.log(`> Error fetching data from NASA API: ${error}`);
      throw error;
    })
}

const parseNasaResponse = (response) => {
  try {
    const total = response.collection.metadata.total_hits;
    const items = response.collection.items
      .map((item) => {
        const { links, data: [{ title, description }] } = item;
        // I have found that the href is not always available.
        // That's why we are filtering out the items that don't have href.
        // See the filter below.
        const href = links?.find(link => link.rel === "preview").href;

        return {
          href,
          description,
          title,
        }
      })
      .filter(item => !!item.href);

    return {
      total,
      items,
    }
  } catch (error) {
    console.log(`> Error parsing response from NASA API: ${error}`);
    throw error;
  }
}
