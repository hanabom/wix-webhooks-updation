// Once add a new item on DB, find duplicate and remove

const { hanabomObj } = require("./hanabomObj");
// const { uploadHanabom, getHanabom, putHanabom } = require("./hanabomAPI");
// const helpers = require("./helpers");
// const { dbAction, dbEnd } = require("./db");

const handler = async (event) => {
  // Get Wix Created Item and Upload on Hanabom
  const { eventData, dbData } = JSON.parse(event.body);
  console.log("dbData:", dbData);
  console.log("eventData:", eventData);
  const visibleCheck = eventData.updatedFields.filter(
    (field) => field === "visible"
  );
  console.log("visibleCheck:", visibleCheck);

  // const updatedData = visibleCheck.length > 0 ? await hanabomObj(eventData, dbData) :

  // const product = await hanabomObj(eventData, dbData);
  // const updateData = await uploadHanabom(product[0], "");

  // const newProduct = await putHanabom(updateData.id, product[1]);
  // const newDesc = helpers.imgToHtml(newProduct);
  // putHanabom(updateData.id, newDesc);

  // Store on db
  // const hanaID = updateData.id;
  // const WixID = eventData._id;
  // const prodName = product[0].name;
  // const sql = helpers.sql(hanaID, WixID, prodName);

  // dbAction(sql, (sqlData) => sqlData);
  // dbEnd();

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Updated Product data has been updated!"),
  };
  return response;
};

exports.handler = handler;
