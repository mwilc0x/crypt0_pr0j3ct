const CreateImage = `
  mutation ($data: String!, $name: String!) {
    addImage (data: $data, name: $name) {
      id
    }
  }
`;

export {
    CreateImage,
};
