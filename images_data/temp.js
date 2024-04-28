const fs = require('fs');

// Read the JSON file
fs.readFile('./StimuliData.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Iterate over each object in the JSON array
    jsonData.forEach(obj => {
      // Delete the 'old_pic_num' property from each object
      delete obj.old_pic_num;
    });

    // Convert the modified JSON back to a string
    const modifiedJsonData = JSON.stringify(jsonData, null, 2);

    // Write the modified JSON back to the file
    fs.writeFile('StimuliDataProcessed.json', modifiedJsonData, 'utf8', err => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON file updated successfully!');
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});