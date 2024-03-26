const axios = require('axios');

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const ORIGINAL_COLLECTION_ID = '65fba4783c8718717052ebd5';
const DUPLICATE_COLLECTION_ID = '65fd0c7982c9e08915edff34';

exports.handler = async (event, context) => {
  const webflow = axios.create({
    baseURL: 'https://api.webflow.com',
    headers: {
      'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
      'accept-version': '1.0.0'
    }
  });

  try {
    const { data: { items } } = await webflow.get(`/collections/${ORIGINAL_COLLECTION_ID}/items`);
    items.forEach(async (item) => {
      // Simplified: directly create items without checking for duplicates
      await webflow.post(`/collections/${DUPLICATE_COLLECTION_ID}/items`, {
        fields: {
          'Name': item.Name,
          'Slug': item.Slug,
          'Category': item.Category,
          'Date': item.Date,
          'Author': item.Author,
          'Author Image': item['Author Image'],
          'Heading': item.Heading,
          'Thumbnail Image': item['Thumbnail Image'],
          'Brief Thumbnail Introduction text': item['Brief Thumbnail Introduction text'],
          'Brief thumbnail news': item['Brief thumbnail news'],
          'Full news': item['Full news'],
          'Other images': item['Other images'],
          'Seo-description': item['Seo-description']
          // Add other fields as needed
        }
      });
    });

    return {
      statusCode: 200,
      body: "Synchronization process initiated"
    };
  } catch (error) {
    console.error("Error in synchronization:", error);
    return {
      statusCode: 500,
      body: "Failed to synchronize CMS collections"
    };
  }
};
