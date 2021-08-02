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

module.exports = { imgToHtml, sql };
