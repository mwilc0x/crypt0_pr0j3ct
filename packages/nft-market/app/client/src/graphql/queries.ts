const UsersQuery = `
  query ($id: String!) {
    user (id: $id) {
      username
    }
  }
`;

const ImageQuery = `
  query ($id: String!) {
    image (id: $id) {
      data
    }
  }
`;

const ImagesQuery = `
  query ($containsId: [String]) {
    images (containsId: $containsId) {
      data
    }
  }
`;

export {
    UsersQuery,
    ImageQuery,
    ImagesQuery
};
