// Once add a new item on DB, find duplicate and remove

const { hanabomObj } = require("./hanabomObj");
const { updateHanabom } = require("./hanabomAPI");
const { objGenerator } = require("./helpers");
const { dbAction, dbEnd } = require("./db");

const handler = async (event) => {
  console.log("event:", event);
  // Get Wix Created Item and Upload on Hanabom
  // const { eventData, dbData } = event.body;
  const { eventData, dbData } = JSON.parse(event.body);
  const visibleCheck = eventData.updatedFields.filter(
    (field) => field === "visible"
  );

  const objectResult = await objGenerator(dbData, visibleCheck);
  console.log("objectResult:", objectResult);

  // Find from db
  const WixID = eventData.productId;
  const sql = `SELECT * FROM products WHERE wixId = "${WixID}";`;

  dbAction(sql, (results) => {
    let sqlData = results;
    console.log("sql data:", sqlData[0].hanaId);
    updateHanabom(sqlData[0].hanaId, objectResult[0]);

    return sqlData;
  });
  dbEnd();

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Updated Product data has been updated!"),
  };
  return response;
};

exports.handler = handler;
