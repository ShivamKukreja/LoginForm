/* eslint-disable no-param-reassign */
/* eslint-disable no-tabs */

import axios from 'axios';
import consoleLog from './logger';
import { GLOBAL_ERROR_MESSAGE } from './constants';

const AjaxFactoryUtil = {
  /**
   * [triggerServerRequest Initiate the ajax call and return the data object]
   * @param  {[type]} options [All the data to be sent to server. The formate of options is below]
   * {
   *   method: 'GET',
   *   url: URL,
   *   params: {
   *     param1: 'x'
   *   }
   * };
   * @return {[type]} [It return the data object]
   */
  triggerServerRequest(options) {
    const startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
      const configuration = {
        method: options.method,
        url: options.url,
        json: true,
        headers: options.headers,
        data: options.data,
      };
      consoleLog.info(
        'Initiating Request for for API call:\n',
        configuration.url,
      );
      if (!options.headers) {
        delete configuration.headers;
      }
      axios(configuration).then(
        (response) => {
          const { data: dataFromResponse, status, error } = response;
          if (dataFromResponse) {
            consoleLog.info(
              'Request for API call:\n',
              configuration.url,
              'Completed with Status Code:',
              response.status,
            );
            consoleLog.info(
              'Request Headers for API call:',
              configuration.url,
              '\n',
              configuration.headers,
              '\n Response Headers for same are:\n',
              response.headers,
              '\n',
            );
            const endTime = new Date().getTime();
            const delta = endTime - startTime;
            if (delta > 500) {
              consoleLog.warn(
                `Warning: ALERT: API Took more than 0.5 seconds !!! API call for: ${
                  configuration.url
                } took : ${delta} milliseconds`,
              );
            }
            // eslint-disable-next-line no-prototype-builtins
            const apiStatus = dataFromResponse.hasOwnProperty('status') && dataFromResponse.status;
            const { success: isSuccessful } = apiStatus;
            const { data, content, vzwDL } = dataFromResponse;
            const responseObject = {
              data,
              status: apiStatus,
              content,
              vzwDL,
              ajaxRequestStatus: isSuccessful ? 'SUCCESS' : 'FAILURE',
            };
            return resolve({
              body: responseObject,
            });
          }
          if (status === 204) {
            consoleLog.info(
              'API for',
              configuration.url,
              'with Status Code:',
              status || '',
            );
            return resolve({
              body: status,
            });
          }
          consoleLog.info(
            'Promise is about to be rejected with the error data',
          );
          consoleLog.error(
            'API for',
            configuration.url,
            'failed with Status Code:',
            status || '',
            'error object is:',
            error || "API Response didn't come with 'data' attribute",
          );
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject({
            // eslint-disable-next-line no-undef
            body: {
              status,
              error,
              ajaxRequestStatus: 'FAILURE',
            },
          });
        },
        (error) => {
          const responseObject = {
            ajaxRequestStatus: 'FAILURE',
          };
          const { config, response, message } = error;
          if (config) {
            consoleLog.error('Error Happened for API Req:', config.url);
            consoleLog.error('Request Headers for API were:', config.headers);
          }
          if (config && response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { status, headers } = response;
            consoleLog.error('Response status code is ', status);
            consoleLog.error('Response Headers are: \n', headers || '');
          } else {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and http client request in node
            consoleLog.error(
              'The request was made but no response was received and the error is',
              message,
            );
          }
          // const errorResponse = error && error.response;
          // Return the error object to display call failure message
          consoleLog.info(
            'Promise is about to be rejected with the error data',
          );
          // TODO: assess if this is needed for any use cases
          // responseObject.response = response;
          responseObject.status = response && response.status;
          responseObject.message = message;
          responseObject.niceMessage = GLOBAL_ERROR_MESSAGE;

          // eslint-disable-next-line prefer-promise-reject-errors
          return reject({
            body: responseObject,
          });
        },
      );
    });
  },
};

export default AjaxFactoryUtil;
