const UsersQuery = `
  query ($id: String!) {
    user (id: $id) {
      username
    }
  }
`;

const CreateImage = `
  mutation ($data: String!, $name: String!) {
    addImage (data: $data, name: $name) {
      id
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
    CreateImage,
    ImageQuery,
    ImagesQuery
};
