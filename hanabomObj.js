import { getHanabom } from "./hanabomAPI.js";
const { categoryIdFinder } = require("./category");
// import { uploadHanabom, putHanabom } from './hanabomAPI.js';

let newProduct = {
  name: "TestingName",
  slug: "TestingName-20210711",
  type: "simple",
  status: "private",
  featured: false,
  catalog_visibility: "visible",
  description: "",
  short_description: "",
  sku: "sdadw20210711",
  price: "",
  regular_price: "",
  sale_price: "",
  date_created: "", //"2021-07-11T23:30:31", //Need
  date_created_gmt: "", // "2021-07-12T06:30:31", //Need
  date_modified: "", //Need
  date_modified_gmt: "", //Need
  date_on_sale_from: "", //Need
  date_on_sale_from_gmt: "", //Need
  date_on_sale_to: "", //Need
  date_on_sale_to_gmt: "", //Need
  on_sale: false,
  purchasable: false,
  total_sales: "0",
  virtual: false,
  downloadable: false,
  download_limit: "-1",
  download_expiry: "-1",
  external_url: "",
  button_text: "",
  tax_status: "taxable",
  tax_class: "",
  manage_stock: false,
  stock_quantity: 0, //Need
  in_stock: true,
  backorders: "no",
  backorders_allowed: false,
  backordered: false,
  sold_individually: false, // Please investigate
  weight: "",
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: "",
  shipping_class_id: "0",
  reviews_allowed: true,
  average_rating: "0.00",
  rating_count: "0",
  parent_id: "0",
  purchase_note: "",
  categories: [], //Need
  images: [],
  attributes: [], // Do it with me
  variations: "{}", // Do it with me
  menu_order: "0",
  stock_status: "",
};

const findId = (name, targetArray) => {
  const result = targetArray.filter((item) => item.name === name);
  return result[0].id;
};

const convertImageURL = async (uriList) => {
  let output = [];

  for (var i = 0; i < uriList.length; i++) {
    let fileName = uriList[i].src.match("^.*v1/(.*)/file.*");
    let imageObj = { src: "https://static.wixstatic.com/media/" + fileName[1] };
    output.push(imageObj);
  }
  return output;
};

const hanabomObj = async (ProductObj) => {
  //optimize obj for formatting
  const hanabomAttributes = await getHanabom("attributes");

  const {
    name,
    price,
    sku,
    discountedPrice,
    mediaItems,
    slug,
    productOptions,
    trackInventory,
    additionalInfoSections,
    collections,
    quantityInStock,
  } = ProductObj[0];
  const productOptionKeys = Object.keys(productOptions);
  let images = { images: [] };

  newProduct.name = name + "_YJMood";
  newProduct.slug = slug;
  newProduct.type =
    Object.keys(productOptions).length === 0 ? "simple" : "variable";
  newProduct.status = "private";
  convertImageURL(mediaItems).then((productImages) => {
    let htmlString = "";
    productImages.forEach(
      (image) =>
        (htmlString += `<img class="size-medium aligncenter" src="${image.src}" alt="${ProductObj.name}" width="300" height="300" /><br />\n`)
    );
    newProduct.description = `<p>${htmlString}</p>`;
  });

  additionalInfoSections.forEach(
    (info) =>
      (newProduct.short_description += info.title + "<br />" + info.description)
  );
  newProduct.short_description = newProduct.short_description
    .split("&nbsp;")
    .join(" ");
  newProduct.sku = sku;
  newProduct.price = price.toString();
  newProduct.regular_price = price.toString();
  newProduct.sale_price = discountedPrice.toString();
  newProduct.on_sale = price == discountedPrice ? false : true;
  newProduct.manage_stock = trackInventory;
  newProduct.stock_quantity = quantityInStock || null;

  collections.forEach((element) => {
    const categoryData = categoryIdFinder(element.name);

    const dataForEnter = categoryData
      ? categoryData
      : [{ id: 0, name: "undefined" }];
    dataForEnter.forEach((category) =>
      newProduct.categories.push({ id: category.id })
    );
  });

  convertImageURL(mediaItems).then((img) => {
    images.images.push(...img);
  });

  productOptionKeys.forEach((key) => {
    //.replace(/\s/g, '')
    const attributeId = findId(key, hanabomAttributes);
    const choices = productOptions[key].choices.map(
      (option) => option.description
    );
    let template = {
      id: attributeId,
      name: key,
      position: 0,
      visible: true,
      variation: true,
      options: [...choices],
    };
    newProduct.attributes.push(template);
  });

  return [newProduct, images];
};

// export function regroupVariants(item){
//     let att = item.attributes;
//     let wix_variants = [];
//     let totalLength = 1;
//     let k = 0;

//     att.map( obj => {
//         totalLength = totalLength * obj.options.length
//     })

//     att.map( obj2 => {
//         let l = 0;

//         for(let i =0; i < totalLength; i++){
//             if(k == 0) {
//                 wix_variants.push([{
//                         id: obj2.id,
//                         option : obj2.options[l].replace(/\s/g, '')
//                     }]);

//                 l++;

//                 if(l >= obj2.options.length){
//                     l = 0
//                 }
//             }else{
//                 wix_variants[i].push({
//                         id: obj2.id,
//                         option:obj2.options[l].replace(/\s/g, '')
//                     });

//                 if(i >= (totalLength / obj2.options.length) -1 && (i +1) % (totalLength / obj2.options.length) == 0){
//                     l ++;

//                     if(l >= obj2.options.length){
//                         l = 0
//                     }
//                 }
//             }
//         }
//         k ++;
//     })

//     return generateVariants(wix_variants, item);
// }

// function generateVariants(wix_variants, item){

//     return wix_variants.map( a =>{
//         return {
//             regular_price: item.regular_price,
//             attributes: a
//         }
//     });
// }

// [
//   {
//     "id": 3,
//     "name": "Colour",
//     "position": 0,
//     "visible": true,
//     "variation": true,
//     "options": [
//       "Blue",
//       "Ivory"
//     ]
//   },
//   {
//     "id": 2,
//     "name": "Size",
//     "position": 0,
//     "visible": true,
//     "variation": true,
//     "options": [
//       "Large",
//       "XLarge"
//     ]
//   }
// ]
// WooCommerce Official Object Format

module.exports = { hanabomObj, newProduct };
