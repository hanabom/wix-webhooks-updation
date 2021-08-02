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

const getHanabom = () => {
  return WooCommerce.getAsync("products/").then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

const putHanabom = (param1, data) => {
  return WooCommerce.putAsync("products/" + param1, data).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

module.exports = { uploadHanabom, getHanabom, putHanabom };
