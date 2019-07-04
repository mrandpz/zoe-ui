module.exports = {
  roots: ['./components'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./components/_test_/setupEnzyme.ts'],
};
