const WooCommerceAPI = require("woocommerce-api");
const credConfig = require("./config");

const WooCommerce = new WooCommerceAPI({
  url: "https://hanabom.ca",
  consumerKey: credConfig.hanabomKey,
  consumerSecret: credConfig.hanabomSecret,
  wpAPI: true,
  version: "wc/v2",
});

const uploadHanabom = (newProduct, param1) => {
  return WooCommerce.postAsync("products" + param1, newProduct).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

const updateHanabom = (param1, updateData) => {
  return WooCommerce.putAsync("products" + param1, updateData).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

const getHanabom = (param1 = "attributes") => {
  const qtyInPage = 100;
  let APILink = param1 == null ? "products" : "products/" + param1;

  return WooCommerce.getAsync(APILink + "?per_page=" + qtyInPage)
    .then((response) => JSON.parse(response.toJSON().body))
    .catch((error) => console.log(error.response.data));
};

const putHanabom = (param1, data) => {
  return WooCommerce.putAsync("products/" + param1, data).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

module.exports = { uploadHanabom, getHanabom, putHanabom, updateHanabom };
