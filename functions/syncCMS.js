const express = require('express');
const axios = require('axios');
const app = express();

const WEBFLOW_API_TOKEN = '2ec7ec5917f93dc765cff3cb56bd0da6f4cb61ad2a9aed8cde4aaa7686f036c5';
const ORIGINAL_COLLECTION_ID = '65fba4783c8718717052ebd5';
const DUPLICATE_COLLECTION_ID = '65fd0c7982c9e08915edff34';

app.post('/sync', async (req, res) => {
  try {
    // Fetch data from original CMS collection
    const { data } = await axios.get(`https://api.webflow.com/collections/${ORIGINAL_COLLECTION_ID}/items`, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
      },
    });

    // Sync data to duplicate CMS collection
    await axios.post(`https://api.webflow.com/collections/${DUPLICATE_COLLECTION_ID}/items`, data, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
      },
    });

    res.send('Data synchronized successfully');
  } catch (error) {
    console.error('Error syncing data:', error);
    res.status(500).send('Failed to synchronize data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
