// Once add a new item on DB, find duplicate and remove

const { hanabomObj } = require("./hanabomObj");
const { uploadHanabom, getHanabom, putHanabom } = require("./hanabomAPI");
const helpers = require("./helpers");
const { dbAction, dbEnd } = require("./db");

const handler = async (event) => {
  console.log("event:", event);
  // Get Wix Created Item and Upload on Hanabom
  const { eventData, dbData } = JSON.parse(event.body);

  const product = await hanabomObj(eventData, dbData);
  const updateData = await uploadHanabom(product[0], "");

  const newProduct = await putHanabom(updateData.id, product[1]);
  const newDesc = helpers.imgToHtml(newProduct);
  putHanabom(updateData.id, newDesc);

  // Store on db
  const hanaID = updateData.id;
  const WixID = eventData._id;
  const prodName = product[0].name;
  const sql = helpers.sql(hanaID, WixID, prodName);

  dbAction(sql, (sqlData) => sqlData);
  dbEnd();

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("New Product updated"),
  };
  return response;
};

exports.handler = handler;
