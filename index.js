//https://www.youtube.com/watch?v=MGrM-pK0vTg
//https://www.youtube.com/watch?v=8wb1ihF1vaQ&feature=youtu.be
const express = require('express');
const fs = require('fs');
const https = require('https');
const request = require('request');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const crypto = require('crypto');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const username = '6X7S0KQH9L1OO57QX3Q821zNNV60AKmNUQm5owteM6FeQ_g_o';
const password = 'BIHeJOF7tOrB';
const key = 'privateKey.pem';
const cert = 'cert.pem';
const postData= 
{
    "amount": "500.39",
    "senderAddress": "901 Metro Center Blvd",
    "localTransactionDateTime": "2020-10-29T14:42:41",
    "pointOfServiceData": {
      "panEntryMode": "90",
      "posConditionCode": "00",
      "motoECIIndicator": "0"
    },
    "recipientPrimaryAccountNumber": "4957030420210496",
    "colombiaNationalServiceData": {
      "addValueTaxReturn": "25.00",
      "taxAmountConsumption": "25.00",
      "nationalNetReimbursementFeeBaseAmount": "20.00",
      "addValueTaxAmount": "10.00",
      "nationalNetMiscAmount": "10.00",
      "countryCodeNationalService": "170",
      "nationalChargebackReason": "11",
      "emvTransactionIndicator": "1",
      "nationalNetMiscAmountType": "A",
      "costTransactionIndicator": "0",
      "nationalReimbursementFee": "20.00"
    },
    "cardAcceptor": {
      "address": {
        "country": "USA",
        "zipCode": "94404",
        "county": "San Mateo",
        "state": "CA"
      },
      "idCode": "CA-IDCode-77765",
      "name": "Visa Inc. USA-Foster City",
      "terminalId": "TID-9999"
    },
    "senderReference": "",
    "transactionIdentifier": "381228649430015",
    "acquirerCountryCode": "840",
    "acquiringBin": "408999",
    "retrievalReferenceNumber": "412770451018",
    "senderCity": "Foster City",
    "senderStateCode": "CA",
    "systemsTraceAuditNumber": "451018",
    "senderName": "Mohammed Qasim",
    "businessApplicationId": "AA",
    "settlementServiceIndicator": "9",
    "merchantCategoryCode": "6012",
    "transactionCurrencyCode": "USD",
    "recipientName": "rohan",
    "senderCountryCode": "124",
    "sourceOfFundsCode": "05",
    "senderAccountNumber": "54092010613037"
  }; 

app.get('/api/push', (req, res) => {

    var options = {
        hostname: 'sandbox.api.visa.com',
        port: 443,
        uri: 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions',
        method: 'POST',
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        },
        body:postData,
        json: true
    };

    options.agent = new https.Agent(options);

    request.post(options, (err, respo, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Status: ${respo.statusCode}`);
        res.send(body);
        console.log(body);
    });
});
const apppullData=  
{
"surcharge": "3",
"amount": "23.6",
"localTransactionDateTime": "2020-10-29T20:56:56",
"cpsAuthorizationCharacteristicsIndicator": "Y",
"riskAssessmentData": {
"traExemptionIndicator": true,
"trustedMerchantExemptionIndicator": true,
"scpExemptionIndicator": true,
"delegatedAuthenticationIndicator": true,
"lowValueExemptionIndicator": true
},
"colombiaNationalServiceData": {
"addValueTaxReturn": "10.00",
"taxAmountConsumption": "10.00",
"nationalNetReimbursementFeeBaseAmount": "20.00",
"addValueTaxAmount": "10.00",
"nationalNetMiscAmount": "10.00",
"countryCodeNationalService": "170",
"nationalChargebackReason": "11",
"emvTransactionIndicator": "1",
"nationalNetMiscAmountType": "A",
"costTransactionIndicator": "0",
"nationalReimbursementFee": "20.00"
},
"cardAcceptor": {
"address": {
"country": "USA",
"zipCode": "94404",
"county": "081",
"state": "CA"
},
"idCode": "ABCD1234ABCD123",
"name": "Visa Inc. USA-Foster City",
"terminalId": "ABCD1234"
},
"acquirerCountryCode": "840",
"acquiringBin": "408999",
"senderCurrencyCode": "USD",
"retrievalReferenceNumber": "330000550000",
"addressVerificationData": {
"street": "XYZ St",
"postalCode": "12345"
},
"cavv": "0700100038238906000013405823891061668252",
"systemsTraceAuditNumber": "451001",
"businessApplicationId": "AA",
"senderPrimaryAccountNumber": "4895142232120006",
"settlementServiceIndicator": "9",
"visaMerchantIdentifier": "73625198",
"foreignExchangeFeeTransaction": "11.99",
"senderCardExpiryDate": "2015-10",
"nationalReimbursementFee": "11.22"
};
app.get('/api/pull', (req, res) => {

  var options = {
      hostname: 'sandbox.api.visa.com',
      port: 443,
      uri: 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions',
      method: 'POST',
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
      },
      body:apppullData,
      json: true
  };

  options.agent = new https.Agent(options);

  request.post(options, (err, respo, body) => {
      if (err) {
          return console.log(err);
      }
      console.log(`Status: ${respo.statusCode}`);
      res.send(body);
      console.log(body);
  });
  //console.log();
});
app.listen(3050, function () {
    console.log('port 3050.');
})
