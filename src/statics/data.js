// statics/data.js
"use strict";

const data = [];

// Generate 100 apps with STABLE IDs
for (let i = 1; i <= 100; i++) {
  const paddedIndex = i.toString().padStart(4, "0");
  const name = `${paddedIndex}-app`;

  data.push({
    name: name,
    id: `app-${paddedIndex}`, // Simple, stable ID
    isSynced: false,
  });
}

export default data;
