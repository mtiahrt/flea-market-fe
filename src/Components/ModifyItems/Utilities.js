export const saveImages = e => {
  const fileInputs = Array.from(e.target.elements).find(({ name }) => name === 'imageFile');
  return [...fileInputs.files].map(file => {
    const formData = new FormData();
    formData.append('upload_preset', 'my-uploads');
    formData.append('file', file);
    return fetch('https://api.cloudinary.com/v1_1/flea-market/image/upload', {
      method: 'POST', body: formData
    }).then(response => response.json());
  });
};

export const saveItemImage = (saleId, values, saveFunction) => {
  const imageURLs = values.filter(x => x.secure_url);
  return imageURLs.map(item => {
    return saveFunction({
      variables: getSaleIdParameter(saleId, { imageURL: item.secure_url })
    }).then(data => data)
      .catch(reason => console.error(reason));
  });
};

export const saveSaleItem = (saleId, {
  name, manufacturerName, subcategoryId, description, price
}, saveFunction) => {
  return saveFunction({
    variables: getSaleIdParameter(saleId, {
        name: name,
        manufacturerName: manufacturerName,
        subcategoryId: Number(subcategoryId),
        description: description,
        price: price
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