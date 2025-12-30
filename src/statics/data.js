// statics/data.js
"use strict";

const data = [
  {
    name: "0001-app",
    id: "9eb2fd3c-809b-4e04-9ad4-56574cfdb545",
    isSynced: false,
  },
  {
    name: "0002-app",
    id: "4e9ef95e-a1bb-4049-90e0-32d5e48b24c9",
    isSynced: false,
  },
  {
    name: "0003-app",
    id: "c5599c42-57fe-4045-87ca-4696de9900c9",
    isSynced: false,
  },
  {
    name: "0004-app",
    id: "f7d2e1a1-3b4c-4d5e-8f9a-0b1c2d3e4f5g",
    isSynced: false,
  },
  {
    name: "0005-app",
    id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    isSynced: false,
  },
  {
    name: "0006-app",
    id: "b2c3d4e5-f6a7-4b6c-9d8e-1f2a3b4c5d6e",
    isSynced: false,
  },
  {
    name: "0007-app",
    id: "c3d4e5f6-a7b8-4c7d-8e9f-2a3b4c5d6e7f",
    isSynced: false,
  },
  {
    name: "0008-app",
    id: "d4e5f6a7-b8c9-4d8e-9f0a-3b4c5d6e7f8a",
    isSynced: false,
  },
  {
    name: "0009-app",
    id: "e5f6a7b8-c9d0-4e9f-0a1b-4c5d6e7f8a9b",
    isSynced: false,
  },
  {
    name: "0010-app",
    id: "f6a7b8c9-d0e1-4f0a-1b2c-5d6e7f8a9b0c",
    isSynced: false,
  },
  // ... Generating 11 through 100
];

// Helper to quickly fill the remaining 90 items for your 2025 test
for (let i = 11; i <= 100; i++) {
  const paddedIndex = i.toString().padStart(4, "0");
  data.push({
    name: `${paddedIndex}-app`,
    // Simulating unique UUIDs for the test set
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `${paddedIndex}fd3c-809b-4e04-9ad4-56574cfdb545`,
    isSynced: false,
  });
}

export default data;
