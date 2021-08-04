const { hanabomObj } = require("./hanabomObj");

const imgToHtml = (product) => {
  let descHTML;

  product.images.forEach((i) => {
    descHTML +=
      "<img class='size-medium aligncenter' src='" +
      i.src +
      "' alt='' width='300' height='300' /><br />";
  });

  let newDesc = {
    description: descHTML,
  };

  return newDesc;
};

const sql = (WixID) =>
  `SELECT * FROM products.products WHERE wixId = ${WixID};`;

const objGenerator = async (data, visible) => {
  if (visible.length > 0 && data.length === 0) {
    return { status: "private" };
  } else if (data.length > 0) {
    return await hanabomObj(data);
  }
};

module.exports = { imgToHtml, sql, objGenerator };
