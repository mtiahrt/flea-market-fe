
//TODO Looking to scaling images down to lower resulation before uploading to S3...
export const postImage = (async (image) => {
  const { url } = await getSecureURL();
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: image
  });
});

export const getSecureURL = async () => {
  return await fetch('https://localhost:8080/secureImageURL').then(res => res.json());
};

const getSecureDeleteURL = async publicId => {
  return await fetch(`https://localhost:8080/secureImageDeleteURL/?publicId=${publicId}`)
    .then(res => res.json())
      .then(data => data)
};

export const deleteImageFromS3 = async (publicId) => {
  const {url} = await getSecureDeleteURL(publicId)
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const saveItemImage = (saleId, values, saveFunction) => {
  const imageURLs = values.filter(x => x.url).map(item => ({
    imageURL: item.url.split('?')[0],
    publicId: item.url.split('?')[0].split('aws.com/')[1]
  }));
  return imageURLs.map(item => {
    return saveFunction({
      variables: getSaleIdParameter(saleId, item)
    }).then(data => data)
      .catch(reason => console.error(reason));
  });
};

export const saveInventory = (saleId, {
  name, manufacturerName, subcategoryId, description, price, quantity
}, saveFunction) => {
  return saveFunction({
    variables: getSaleIdParameter(saleId, {
      name: name,
      manufacturerName: manufacturerName,
      subcategoryId: Number(subcategoryId),
      description: description,
      price: price,
      quantity: +quantity
    })
  }).then(data => data)
    .catch(reason => console.error(reason));
};

const getSaleIdParameter = (id, data) => {
  if (id) {
    return { ...data, id };
  }
  return data;
};