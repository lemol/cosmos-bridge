exports.search = (query, from) => {
  return fetch(`https://images-api.nasa.gov/search?q=${query}&page=${from}`)
    .then(response => response.json())
    .then(parseNasaResponse)
    .catch(error => {
      console.log(`> Error fetching data from NASA API: ${error}`);
      throw error;
    })
}

const parseNasaResponse = (response) => {
  try {
    console.log(response)
    const total = response.collection.metadata.total_hits;
    const items = response.collection.items.map((item) => {
      const { links, data: [{ title, description }] } = item;
      const href = links?.find(link => link.rel === "preview").href ?? "";

      if (!href) {
        console.log(item)
      }

      return {
        href,
        description,
        title,
      }
    })

    return {
      total,
      items,
    }
  } catch (error) {
    console.log(`> Error parsing response from NASA API: ${error}`);
    throw error;
  }
}
