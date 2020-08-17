/**
 * Validation endpoint.
 *
 * @author Chris Spiliotopoulos
 */

const _ = require('lodash');
const Boom = require('boom');
const Joi = require('joi');
const fs = require('fs');
const extract = require('extract-zip');
const path = require('path');

const {
  ValidationResult
} = require('../schemas/validation');

const DataPackage = require('../lib/datapackage');

module.exports = function(server, datapackage) {

  /**
   * Validates a CSV resource data file.
   */
  server.route({
    path: '/validate/csv',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Validate a CSV data file using a specific Open Referral resource schema',
      notes: [
        'The operation validates an uploaded CSV data stream using the ',
        'definition of a specified resource as found in the standard Open Referral data package',
        'specification.  Clients should send a form payload containg a "type" field with the name ',
        'of the Open Referral logical resource and a "file" that contains the CSV data stream.'
      ].join(''),
      plugins: {
        'hapi-swaggered': {
          operationId: 'validateCsvResource'
        }
      },
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },
      response: {
        schema: ValidationResult
      },
      async handler(request, h) {

        // get the uploaded resource type
        const {
          payload
        } = request;

        const {
          type,
          file: stream
        } = payload;

        try {

          if (typeof type === 'undefined') {
            throw new Error('Form should contain the field "type" with a valid resource name');
          }

          if (typeof stream === 'undefined') {
            throw new Error('Form should contain the field "file" with a valid resource data stream');
          }

          // validate the input stream using
          // the provided resource type definition
          const result = await datapackage.validateResource(stream, type);

          if (!result.valid) {
            return h.response(result).code(422);
          }

          return h.response(result).code(200);
        } catch (e) {
          return Boom.badRequest(e.message);
        }

      }
    }
  });

  server.route({
    path: '/validate/zip',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Validate a CSV data file using a specific Open Referral resource schema',
      notes: [
        'The operation validates an uploaded CSV data stream using the ',
        'definition of a specified resource as found in the standard Open Referral data package',
        'specification.  Clients should send a form payload containg a "type" field with the name ',
        'of the Open Referral logical resource and a "file" that contains the CSV data stream.'
      ].join(''),
      plugins: {
        'hapi-swaggered': {
          operationId: 'validateCsvResource'
        }
      },
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },
      // response: {
      //   schema: ValidationResult
      // },
      async handler(request, h) {

        // get the uploaded resource type
        const {
          payload
        } = request;

        const {
          type,
          file: stream
        } = payload;

        try {

          if (typeof type === 'undefined') {
            throw new Error('Form should contain the field "type" with a valid resource name');
          }

          if (typeof stream === 'undefined') {
            throw new Error('Form should contain the field "file" with a valid resource data stream');
          }

          console.log("stream", stream);
          // validate the input stream using
          // the provided resource type definition
          await fs.writeFileSync('filename1.zip', stream._data);
                    
          let dirPath = path.join(process.cwd(), "public/"+( (new Date()).getTime()) );
          if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
          }

          let resultArr = {};
          await extract('filename1.zip', { dir: dirPath });

          try {
            let cName = "accessibility_for_disabilities";
            let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "contact";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "eligibilty";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "funding";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "holiday_schedule";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "language";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "location";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "meta_table_description";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "metadata";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "organization_id";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "payments_accepted";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "phone";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "physical_address";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "postal_address";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "program";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "regular_schedule";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "required_document";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "service_area";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "service";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "service_at_location";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "service_taxonomy";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          try {
            let cName = "taxonomy";
                      let csvPath = path.join(dirPath, cName+".csv");
            if (fs.existsSync(csvPath)) {
              resultArr[cName] = await datapackage.validateResource(path.join(dirPath, cName+".csv"), cName);
            } else {
              resultArr[cName] = { valid: false };
            }
          } catch(err) {
            console.error(err)
          }
          return h.response(resultArr).code(200);
        } catch (e) { 
          return Boom.badRequest(e.message);
        }

      }
    }
  });


  /**
   * Validates a data package.
   */
  server.route({
    path: '/validate/datapackage',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Validate a data package using the Open Referral specification.',
      notes: [
        'The operation expects the URI of a valid "datapackage.json" file that conforms to the Open Referral schema. ',
        'The validator will check all enlisted resources in turn and will return a collection of validation results ',
        'that correspond to each one of the resources.  The file can be either local or remote.'
      ].join(''),
      plugins: {
        'hapi-swaggered': {
          operationId: 'validateDatapackage'
        }
      },
      validate: {
        query: {
          uri: Joi.string().required()
            .description('Data package descriptor file URL'),
          relations: Joi.boolean().default(false)
            .description('Flag indicating whether to check data relations through foreign keys')
        }
      },
      response: {
        schema: Joi.array().items(ValidationResult).description('A collection of validation results')
      },
      async handler(request, h) {

        // get the uploaded resource type
        const {
          query
        } = request;

        const {
          uri,
          relations
        } = query;

        try {

          // load the data package
          const dp = await DataPackage.load(uri);

          // validate the full package
          const results = await dp.validatePackage({
            relations
          });

          // check if there is at least 1 failed validation
          const matches = _.find(results, {
            valid: false
          });

          // add the results to the response
          const res = h.response(results);

          // if there is a failed validation, return 400
          if (matches) {
            res.code(422);
          }

          return res;
        } catch (e) {
          return Boom.badRequest(e.message);
        }

      }
    }
  });

};
