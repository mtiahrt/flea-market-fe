//TODO Looking to scaling images down to lower resolution before uploading to S3...
import axios from 'axios';

let accessToken;

export const postImage = async (image, accessToken) => {
  const { url } = await getSecureURL(accessToken);
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Token': accessToken,
    },
    body: image,
  });
};

const getSecureURL = async (accessToken) => {
  return axios
    .get('https://localhost:8080/secureImageURL', {
      headers: { 'Access-Token': accessToken },
    })
    .then((response) => response.data);
};

const getSecureDeleteURL = async (publicId, accessToken) => {
  return axios
    .get(`https://localhost:8080/secureImageDeleteURL/?publicId=${publicId}`, {
      headers: { 'Access-Token': accessToken },
    })
    .then((x) => x.data);
};

export const deleteImageFromS3 = async (publicId, accessToken) => {
  const { url } = await getSecureDeleteURL(publicId, accessToken);
  return axios
    .delete(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Token': accessToken,
      },
    })
    .then((x) => x.data);
};

export const saveItemImage = (saleId, values, saveFunction) => {
  const imageURLs = values
    .filter((x) => x.url)
    .map((item) => ({
      imageURL: item.url.split('?')[0],
      publicId: item.url.split('?')[0].split('aws.com/')[1],
    }));
  return imageURLs.map((item) => {
    return saveFunction({
      variables: getSaleIdParameter(saleId, item),
    })
      .then((data) => data)
      .catch((reason) => console.error(reason));
  });
};

export const saveInventory = (
  saleId,
  { name, manufacturerName, subcategoryId, description, price, quantity },
  fn
) => {
  return fn({
    variables: getSaleIdParameter(saleId, {
      name: name,
      manufacturerName: manufacturerName,
      subcategoryId: Number(subcategoryId),
      description: description,
      price: price,
      quantity: +quantity,
    }),
  })
    .then((data) => data)
    .catch((reason) => console.error(reason));
};

const getSaleIdParameter = (id, data) => {
  if (id) {
    return { ...data, id };
  }
  return data;
};
