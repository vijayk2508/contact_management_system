declare const ImageAnonymizationCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly api4ai: {
                    readonly required: readonly ["image", "image_resource_url", "status"];
                    readonly title: "imageanonymizationAnonymizationDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image: {
                            readonly title: "Image";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["kind", "confidence", "bounding_boxes"];
                                readonly title: "AnonymizationItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly kind: {
                                        readonly title: "Kind";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly bounding_boxes: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "AnonymizationBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageanonymizationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationCreateProjectCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly name: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Name of your project";
                readonly maxLength: 250;
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["name", "project_id", "status"];
                    readonly title: "imageautoml_classificationAutomlClassificationCreateProjectDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly title: "Name";
                            readonly type: "string";
                        };
                        readonly project_id: {
                            readonly title: "Project Id";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageautoml_classificationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationDeleteProjectCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly project_id: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The id of project";
                readonly maxLength: 250;
                readonly examples: readonly ["5d1c7023-c2eb-40ba-a100-e1fdd17cb876"];
            };
        };
        readonly required: readonly ["project_id", "providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["name", "project_id", "status"];
                    readonly title: "imageautoml_classificationAutomlClassificationCreateProjectDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly title: "Name";
                            readonly type: "string";
                        };
                        readonly project_id: {
                            readonly title: "Project Id";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageautoml_classificationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationListProjectsRetrieve: {
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly projects: {
                    readonly items: {
                        readonly properties: {
                            readonly project_id: {
                                readonly format: "uuid";
                                readonly title: "Project Id";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly title: "Name";
                                readonly type: "string";
                            };
                            readonly provider: {
                                readonly title: "Provider";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["project_id", "name", "provider"];
                        readonly title: "AutomlClassificationProject";
                        readonly type: "object";
                    };
                    readonly title: "Projects";
                    readonly type: "array";
                };
            };
            readonly required: readonly ["projects"];
            readonly title: "AutomlClassificationListProjectsResponse";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationPredictAsyncCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly webhook_receiver: {
                readonly type: "string";
                readonly format: "uri";
                readonly minLength: 1;
                readonly description: "Webhook receiver should be a valid https URL (ex : https://your.listner.com/endpoint).             After the processing is done, the webhook endpoint will receive a POST request with the result.";
            };
            readonly users_webhook_parameters: {
                readonly description: "Json data that contains of additional parameters that will be sent back to the webhook receiver             (ex: api key for security or client's data ID to link the result internally).             Will only be used when webhook_receiver is set.";
            };
            readonly project_id: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The id of project";
                readonly maxLength: 250;
                readonly examples: readonly ["5d1c7023-c2eb-40ba-a100-e1fdd17cb876"];
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["project_id", "providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly public_id: {
                    readonly type: "string";
                    readonly format: "uuid";
                };
            };
            readonly required: readonly ["public_id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationPredictAsyncRetrieve: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly jobs: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly providers: {
                                readonly type: "string";
                            };
                            readonly nb: {
                                readonly type: "integer";
                            };
                            readonly nb_ok: {
                                readonly type: "integer";
                            };
                            readonly public_id: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly state: {
                                readonly enum: readonly ["finished", "failed", "Timeout error", "processing"];
                                readonly type: "string";
                                readonly description: "* `finished` - finished\n* `failed` - failed\n* `Timeout error` - Timeout error\n* `processing` - processing\n\n`finished` `failed` `Timeout error` `processing`";
                            };
                            readonly created_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly required: readonly ["created_at", "nb", "nb_ok", "providers", "public_id", "state"];
                    };
                };
            };
            readonly required: readonly ["jobs"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationPredictAsyncRetrieve2: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly public_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["public_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly response_as_dict: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly show_original_response: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["name", "project_id", "status"];
                    readonly title: "imageautoml_classificationAutomlClassificationCreateProjectDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly title: "Name";
                            readonly type: "string";
                        };
                        readonly project_id: {
                            readonly title: "Project Id";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageautoml_classificationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationTrainAsyncCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly webhook_receiver: {
                readonly type: "string";
                readonly format: "uri";
                readonly minLength: 1;
                readonly description: "Webhook receiver should be a valid https URL (ex : https://your.listner.com/endpoint).             After the processing is done, the webhook endpoint will receive a POST request with the result.";
            };
            readonly users_webhook_parameters: {
                readonly description: "Json data that contains of additional parameters that will be sent back to the webhook receiver             (ex: api key for security or client's data ID to link the result internally).             Will only be used when webhook_receiver is set.";
            };
            readonly project_id: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The id of project";
                readonly maxLength: 250;
                readonly examples: readonly ["5d1c7023-c2eb-40ba-a100-e1fdd17cb876"];
            };
        };
        readonly required: readonly ["project_id", "providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly public_id: {
                    readonly type: "string";
                    readonly format: "uuid";
                };
            };
            readonly required: readonly ["public_id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationTrainAsyncRetrieve: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly jobs: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly providers: {
                                readonly type: "string";
                            };
                            readonly nb: {
                                readonly type: "integer";
                            };
                            readonly nb_ok: {
                                readonly type: "integer";
                            };
                            readonly public_id: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly state: {
                                readonly enum: readonly ["finished", "failed", "Timeout error", "processing"];
                                readonly type: "string";
                                readonly description: "* `finished` - finished\n* `failed` - failed\n* `Timeout error` - Timeout error\n* `processing` - processing\n\n`finished` `failed` `Timeout error` `processing`";
                            };
                            readonly created_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly required: readonly ["created_at", "nb", "nb_ok", "providers", "public_id", "state"];
                    };
                };
            };
            readonly required: readonly ["jobs"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationTrainAsyncRetrieve2: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly public_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["public_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly response_as_dict: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly show_original_response: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["name", "project_id", "status"];
                    readonly title: "imageautoml_classificationAutomlClassificationCreateProjectDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly title: "Name";
                            readonly type: "string";
                        };
                        readonly project_id: {
                            readonly title: "Project Id";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageautoml_classificationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationUploadDataAsyncCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly webhook_receiver: {
                readonly type: "string";
                readonly format: "uri";
                readonly minLength: 1;
                readonly description: "Webhook receiver should be a valid https URL (ex : https://your.listner.com/endpoint).             After the processing is done, the webhook endpoint will receive a POST request with the result.";
            };
            readonly users_webhook_parameters: {
                readonly description: "Json data that contains of additional parameters that will be sent back to the webhook receiver             (ex: api key for security or client's data ID to link the result internally).             Will only be used when webhook_receiver is set.";
            };
            readonly project_id: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The id of project";
                readonly maxLength: 250;
                readonly examples: readonly ["5d1c7023-c2eb-40ba-a100-e1fdd17cb876"];
            };
            readonly label: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Label of the image";
                readonly maxLength: 200;
                readonly examples: readonly ["Logo"];
            };
            readonly type_of_data: {
                readonly description: "* `TRAINING` - TRAINING\n* `TEST` - TEST";
                readonly enum: readonly ["TRAINING", "TEST"];
                readonly type: "string";
                readonly examples: readonly ["TRAINING"];
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["label", "project_id", "providers", "type_of_data"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly public_id: {
                    readonly type: "string";
                    readonly format: "uuid";
                };
            };
            readonly required: readonly ["public_id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationUploadDataAsyncRetrieve: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly jobs: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly providers: {
                                readonly type: "string";
                            };
                            readonly nb: {
                                readonly type: "integer";
                            };
                            readonly nb_ok: {
                                readonly type: "integer";
                            };
                            readonly public_id: {
                                readonly type: "string";
                                readonly format: "uuid";
                            };
                            readonly state: {
                                readonly enum: readonly ["finished", "failed", "Timeout error", "processing"];
                                readonly type: "string";
                                readonly description: "* `finished` - finished\n* `failed` - failed\n* `Timeout error` - Timeout error\n* `processing` - processing\n\n`finished` `failed` `Timeout error` `processing`";
                            };
                            readonly created_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                        };
                        readonly required: readonly ["created_at", "nb", "nb_ok", "providers", "public_id", "state"];
                    };
                };
            };
            readonly required: readonly ["jobs"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageAutomlClassificationUploadDataAsyncRetrieve2: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly public_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["public_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly response_as_dict: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly show_original_response: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["name", "project_id", "status"];
                    readonly title: "imageautoml_classificationAutomlClassificationCreateProjectDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly title: "Name";
                            readonly type: "string";
                        };
                        readonly project_id: {
                            readonly title: "Project Id";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageautoml_classificationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageBackgroundRemovalCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
            readonly provider_params: {
                readonly type: "string";
                readonly default: {};
                readonly description: "Provider specific parameters";
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly api4ai: {
                    readonly required: readonly ["image_b64", "image_resource_url", "status"];
                    readonly title: "imagebackground_removalBackgroundRemovalDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image_b64: {
                            readonly description: "The image in base64 format.";
                            readonly title: "Image B64";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly description: "The image url.";
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly stabilityai: {
                    readonly required: readonly ["image_b64", "image_resource_url", "status"];
                    readonly title: "imagebackground_removalBackgroundRemovalDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image_b64: {
                            readonly description: "The image in base64 format.";
                            readonly title: "Image B64";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly description: "The image url.";
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["image_b64", "image_resource_url", "status"];
                    readonly title: "imagebackground_removalBackgroundRemovalDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image_b64: {
                            readonly description: "The image in base64 format.";
                            readonly title: "Image B64";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly description: "The image url.";
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly clipdrop: {
                    readonly required: readonly ["image_b64", "image_resource_url", "status"];
                    readonly title: "imagebackground_removalBackgroundRemovalDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image_b64: {
                            readonly description: "The image in base64 format.";
                            readonly title: "Image B64";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly description: "The image url.";
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly photoroom: {
                    readonly required: readonly ["image_b64", "image_resource_url", "status"];
                    readonly title: "imagebackground_removalBackgroundRemovalDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image_b64: {
                            readonly description: "The image in base64 format.";
                            readonly title: "Image B64";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly description: "The image url.";
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["image_b64", "image_resource_url", "status"];
                    readonly title: "imagebackground_removalBackgroundRemovalDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly image_b64: {
                            readonly description: "The image in base64 format.";
                            readonly title: "Image B64";
                            readonly type: "string";
                        };
                        readonly image_resource_url: {
                            readonly description: "The image url.";
                            readonly title: "Image Resource Url";
                            readonly type: "string";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imagebackground_removalResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageEmbeddingsCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
            readonly representation: {
                readonly description: "* `document` - document\n* `query` - query\n* `symetric` - symetric";
                readonly enum: readonly ["document", "query", "symetric"];
                readonly type: "string";
                readonly examples: readonly ["document"];
            };
        };
        readonly required: readonly ["providers", "representation"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly alephalpha: {
                    readonly required: readonly ["status"];
                    readonly title: "imageembeddingsEmbeddingsDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["embedding"];
                                readonly title: "EmbeddingDataClass";
                                readonly type: "object";
                                readonly properties: {
                                    readonly embedding: {
                                        readonly title: "Embedding";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "integer";
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageembeddingsResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageExplicitContentCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly api4ai: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly google: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly amazon: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly picpurify: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly clarifai: {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly "eden-ai": {
                    readonly required: readonly ["nsfw_likelihood", "nsfw_likelihood_score", "status"];
                    readonly title: "imageexplicit_contentExplicitContentDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly nsfw_likelihood: {
                            readonly title: "Nsfw Likelihood";
                            readonly type: "integer";
                        };
                        readonly nsfw_likelihood_score: {
                            readonly title: "Nsfw Likelihood Score";
                            readonly type: "integer";
                        };
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "likelihood", "likelihood_score", "category", "subcategory"];
                                readonly title: "ExplicitItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly likelihood: {
                                        readonly title: "Likelihood";
                                        readonly type: "integer";
                                    };
                                    readonly likelihood_score: {
                                        readonly title: "Likelihood Score";
                                        readonly type: "integer";
                                    };
                                    readonly category: {
                                        readonly description: "This enum are used to categorize the explicit content extracted from the text\n\n`Toxic` `Content` `Sexual` `Violence` `DrugAndAlcohol` `Finance` `HateAndExtremism` `Safe` `Other`";
                                        readonly enum: readonly ["Toxic", "Content", "Sexual", "Violence", "DrugAndAlcohol", "Finance", "HateAndExtremism", "Safe", "Other"];
                                        readonly title: "CategoryType";
                                        readonly type: "string";
                                    };
                                    readonly subcategory: {
                                        readonly anyOf: readonly [{
                                            readonly enum: readonly ["Insult", "Obscene", "Derogatory", "Profanity", "Threat", "Toxic"];
                                            readonly title: "ToxicSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Insult` `Obscene` `Derogatory` `Profanity` `Threat` `Toxic`";
                                        }, {
                                            readonly enum: readonly ["MiddleFinger", "PublicSafety", "Health", "Explicit", "QRCode", "Medical", "Politics", "Legal"];
                                            readonly title: "ContentSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`MiddleFinger` `PublicSafety` `Health` `Explicit` `QRCode` `Medical` `Politics` `Legal`";
                                        }, {
                                            readonly enum: readonly ["SexualActivity", "SexualSituations", "Nudity", "PartialNudity", "Suggestive", "AdultToys", "RevealingClothes", "Sexual"];
                                            readonly title: "SexualSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`SexualActivity` `SexualSituations` `Nudity` `PartialNudity` `Suggestive` `AdultToys` `RevealingClothes` `Sexual`";
                                        }, {
                                            readonly enum: readonly ["GraphicViolenceOrGore", "PhysicalViolence", "WeaponViolence", "Violence"];
                                            readonly title: "ViolenceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`GraphicViolenceOrGore` `PhysicalViolence` `WeaponViolence` `Violence`";
                                        }, {
                                            readonly enum: readonly ["DrugProducts", "DrugUse", "Tobacco", "Smoking", "Alcohol", "Drinking"];
                                            readonly title: "DrugAndAlcoholSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`DrugProducts` `DrugUse` `Tobacco` `Smoking` `Alcohol` `Drinking`";
                                        }, {
                                            readonly enum: readonly ["Gambling", "Finance", "MoneyContent"];
                                            readonly title: "FinanceSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Gambling` `Finance` `MoneyContent`";
                                        }, {
                                            readonly enum: readonly ["Hate", "Harassment", "Threatening", "Extremist", "Racy"];
                                            readonly title: "HateAndExtremismSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Hate` `Harassment` `Threatening` `Extremist` `Racy`";
                                        }, {
                                            readonly enum: readonly ["Safe", "NotSafe"];
                                            readonly title: "SafeSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Safe` `NotSafe`";
                                        }, {
                                            readonly enum: readonly ["Spoof", "Religion", "Offensive", "Other"];
                                            readonly title: "OtherSubCategoryType";
                                            readonly type: "string";
                                            readonly description: "`Spoof` `Religion` `Offensive` `Other`";
                                        }];
                                        readonly title: "Subcategory";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageexplicit_contentResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageFaceCompareCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file1: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file1_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
            readonly file2: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file2_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly amazon: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_compareFaceCompareDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "bounding_box"];
                                readonly title: "FaceMatch";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["top", "left", "height", "width"];
                                        readonly title: "FaceCompareBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly top: {
                                                readonly title: "Top";
                                                readonly type: "integer";
                                            };
                                            readonly left: {
                                                readonly title: "Left";
                                                readonly type: "integer";
                                            };
                                            readonly height: {
                                                readonly title: "Height";
                                                readonly type: "integer";
                                            };
                                            readonly width: {
                                                readonly title: "Width";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly facepp: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_compareFaceCompareDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "bounding_box"];
                                readonly title: "FaceMatch";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["top", "left", "height", "width"];
                                        readonly title: "FaceCompareBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly top: {
                                                readonly title: "Top";
                                                readonly type: "integer";
                                            };
                                            readonly left: {
                                                readonly title: "Left";
                                                readonly type: "integer";
                                            };
                                            readonly height: {
                                                readonly title: "Height";
                                                readonly type: "integer";
                                            };
                                            readonly width: {
                                                readonly title: "Width";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly base64: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_compareFaceCompareDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "bounding_box"];
                                readonly title: "FaceMatch";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["top", "left", "height", "width"];
                                        readonly title: "FaceCompareBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly top: {
                                                readonly title: "Top";
                                                readonly type: "integer";
                                            };
                                            readonly left: {
                                                readonly title: "Left";
                                                readonly type: "integer";
                                            };
                                            readonly height: {
                                                readonly title: "Height";
                                                readonly type: "integer";
                                            };
                                            readonly width: {
                                                readonly title: "Width";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageface_compareResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageFaceDetectionCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly api4ai: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly google: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly amazon: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly skybiometry: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly picpurify: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly clarifai: {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly "eden-ai": {
                    readonly required: readonly ["status"];
                    readonly title: "imageface_detectionFaceDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["confidence", "landmarks", "emotions", "poses", "age", "gender", "bounding_box", "hair", "facial_hair", "quality", "makeup", "accessories", "occlusions", "features"];
                                readonly title: "FaceItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly landmarks: {
                                        readonly title: "FaceLandmarks";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly left_eye: {
                                                readonly title: "Left Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_top: {
                                                readonly title: "Left Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_right: {
                                                readonly title: "Left Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_bottom: {
                                                readonly title: "Left Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eye_left: {
                                                readonly title: "Left Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye: {
                                                readonly title: "Right Eye";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_top: {
                                                readonly title: "Right Eye Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_right: {
                                                readonly title: "Right Eye Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_bottom: {
                                                readonly title: "Right Eye Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eye_left: {
                                                readonly title: "Right Eye Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_left: {
                                                readonly title: "Left Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_right: {
                                                readonly title: "Left Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_eyebrow_top: {
                                                readonly title: "Left Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_left: {
                                                readonly title: "Right Eyebrow Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_right: {
                                                readonly title: "Right Eyebrow Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_pupil: {
                                                readonly title: "Left Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_pupil: {
                                                readonly title: "Right Pupil";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_tip: {
                                                readonly title: "Nose Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_right: {
                                                readonly title: "Nose Bottom Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_left: {
                                                readonly title: "Nose Bottom Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_left: {
                                                readonly title: "Mouth Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_right: {
                                                readonly title: "Mouth Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_eyebrow_top: {
                                                readonly title: "Right Eyebrow Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly midpoint_between_eyes: {
                                                readonly title: "Midpoint Between Eyes";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_bottom_center: {
                                                readonly title: "Nose Bottom Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_out_tip: {
                                                readonly title: "Nose Left Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_left_alar_top: {
                                                readonly title: "Nose Left Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_out_tip: {
                                                readonly title: "Nose Right Alar Out Tip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_right_alar_top: {
                                                readonly title: "Nose Right Alar Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_left: {
                                                readonly title: "Nose Root Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly nose_root_right: {
                                                readonly title: "Nose Root Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip: {
                                                readonly title: "Upper Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip: {
                                                readonly title: "Under Lip";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_bottom: {
                                                readonly title: "Under Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly under_lip_top: {
                                                readonly title: "Under Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_bottom: {
                                                readonly title: "Upper Lip Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_lip_top: {
                                                readonly title: "Upper Lip Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_center: {
                                                readonly title: "Mouth Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_top: {
                                                readonly title: "Mouth Top";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mouth_bottom: {
                                                readonly title: "Mouth Bottom";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_ear_tragion: {
                                                readonly title: "Left Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_ear_tragion: {
                                                readonly title: "Right Ear Tragion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly forehead_glabella: {
                                                readonly title: "Forehead Glabella";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_gnathion: {
                                                readonly title: "Chin Gnathion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_left_gonion: {
                                                readonly title: "Chin Left Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly chin_right_gonion: {
                                                readonly title: "Chin Right Gonion";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_left: {
                                                readonly title: "Upper Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_left: {
                                                readonly title: "Mid Jawline Left";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly mid_jawline_right: {
                                                readonly title: "Mid Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly upper_jawline_right: {
                                                readonly title: "Upper Jawline Right";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly left_cheek_center: {
                                                readonly title: "Left Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly right_cheek_center: {
                                                readonly title: "Right Cheek Center";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly emotions: {
                                        readonly required: readonly ["joy", "sorrow", "anger", "surprise", "disgust", "fear", "confusion", "calm", "unknown", "neutral", "contempt"];
                                        readonly title: "FaceEmotions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly joy: {
                                                readonly title: "Joy";
                                                readonly type: "integer";
                                            };
                                            readonly sorrow: {
                                                readonly title: "Sorrow";
                                                readonly type: "integer";
                                            };
                                            readonly anger: {
                                                readonly title: "Anger";
                                                readonly type: "integer";
                                            };
                                            readonly surprise: {
                                                readonly title: "Surprise";
                                                readonly type: "integer";
                                            };
                                            readonly disgust: {
                                                readonly title: "Disgust";
                                                readonly type: "integer";
                                            };
                                            readonly fear: {
                                                readonly title: "Fear";
                                                readonly type: "integer";
                                            };
                                            readonly confusion: {
                                                readonly title: "Confusion";
                                                readonly type: "integer";
                                            };
                                            readonly calm: {
                                                readonly title: "Calm";
                                                readonly type: "integer";
                                            };
                                            readonly unknown: {
                                                readonly title: "Unknown";
                                                readonly type: "integer";
                                            };
                                            readonly neutral: {
                                                readonly title: "Neutral";
                                                readonly type: "integer";
                                            };
                                            readonly contempt: {
                                                readonly title: "Contempt";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly poses: {
                                        readonly required: readonly ["pitch", "roll", "yaw"];
                                        readonly title: "FacePoses";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly pitch: {
                                                readonly title: "Pitch";
                                                readonly type: "integer";
                                            };
                                            readonly roll: {
                                                readonly title: "Roll";
                                                readonly type: "integer";
                                            };
                                            readonly yaw: {
                                                readonly title: "Yaw";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly age: {
                                        readonly title: "Age";
                                        readonly type: "integer";
                                    };
                                    readonly gender: {
                                        readonly title: "Gender";
                                        readonly type: "string";
                                    };
                                    readonly bounding_box: {
                                        readonly required: readonly ["x_min", "x_max", "y_min", "y_max"];
                                        readonly title: "FaceBoundingBox";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly x_min: {
                                                readonly title: "X Min";
                                                readonly type: "integer";
                                            };
                                            readonly x_max: {
                                                readonly title: "X Max";
                                                readonly type: "integer";
                                            };
                                            readonly y_min: {
                                                readonly title: "Y Min";
                                                readonly type: "integer";
                                            };
                                            readonly y_max: {
                                                readonly title: "Y Max";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly hair: {
                                        readonly required: readonly ["bald", "invisible"];
                                        readonly title: "FaceHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly hair_color: {
                                                readonly title: "Hair Color";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["color", "confidence"];
                                                    readonly title: "FaceHairColor";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly color: {
                                                            readonly title: "Color";
                                                            readonly type: "string";
                                                        };
                                                        readonly confidence: {
                                                            readonly title: "Confidence";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly bald: {
                                                readonly title: "Bald";
                                                readonly type: "integer";
                                            };
                                            readonly invisible: {
                                                readonly title: "Invisible";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly facial_hair: {
                                        readonly required: readonly ["moustache", "beard", "sideburns"];
                                        readonly title: "FaceFacialHair";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly moustache: {
                                                readonly title: "Moustache";
                                                readonly type: "integer";
                                            };
                                            readonly beard: {
                                                readonly title: "Beard";
                                                readonly type: "integer";
                                            };
                                            readonly sideburns: {
                                                readonly title: "Sideburns";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly quality: {
                                        readonly required: readonly ["noise", "exposure", "blur", "brightness", "sharpness"];
                                        readonly title: "FaceQuality";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly noise: {
                                                readonly title: "Noise";
                                                readonly type: "integer";
                                            };
                                            readonly exposure: {
                                                readonly title: "Exposure";
                                                readonly type: "integer";
                                            };
                                            readonly blur: {
                                                readonly title: "Blur";
                                                readonly type: "integer";
                                            };
                                            readonly brightness: {
                                                readonly title: "Brightness";
                                                readonly type: "integer";
                                            };
                                            readonly sharpness: {
                                                readonly title: "Sharpness";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly makeup: {
                                        readonly required: readonly ["eye_make", "lip_make"];
                                        readonly title: "FaceMakeup";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_make: {
                                                readonly title: "Eye Make";
                                                readonly type: "boolean";
                                            };
                                            readonly lip_make: {
                                                readonly title: "Lip Make";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly accessories: {
                                        readonly required: readonly ["sunglasses", "reading_glasses", "swimming_goggles", "face_mask", "eyeglasses", "headwear"];
                                        readonly title: "FaceAccessories";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sunglasses: {
                                                readonly title: "Sunglasses";
                                                readonly type: "integer";
                                            };
                                            readonly reading_glasses: {
                                                readonly title: "Reading Glasses";
                                                readonly type: "integer";
                                            };
                                            readonly swimming_goggles: {
                                                readonly title: "Swimming Goggles";
                                                readonly type: "integer";
                                            };
                                            readonly face_mask: {
                                                readonly title: "Face Mask";
                                                readonly type: "integer";
                                            };
                                            readonly eyeglasses: {
                                                readonly title: "Eyeglasses";
                                                readonly type: "integer";
                                            };
                                            readonly headwear: {
                                                readonly title: "Headwear";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                    readonly occlusions: {
                                        readonly required: readonly ["eye_occluded", "forehead_occluded", "mouth_occluded"];
                                        readonly title: "FaceOcclusions";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eye_occluded: {
                                                readonly title: "Eye Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly forehead_occluded: {
                                                readonly title: "Forehead Occluded";
                                                readonly type: "boolean";
                                            };
                                            readonly mouth_occluded: {
                                                readonly title: "Mouth Occluded";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly features: {
                                        readonly required: readonly ["eyes_open", "smile", "mouth_open"];
                                        readonly title: "FaceFeatures";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly eyes_open: {
                                                readonly title: "Eyes Open";
                                                readonly type: "integer";
                                            };
                                            readonly smile: {
                                                readonly title: "Smile";
                                                readonly type: "integer";
                                            };
                                            readonly mouth_open: {
                                                readonly title: "Mouth Open";
                                                readonly type: "integer";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageface_detectionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageFaceRecognitionAddFaceCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|bmp)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly amazon: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly facepp: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageface_recognitionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageFaceRecognitionDeleteFaceCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly face_id: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "ID of face to delete";
                readonly examples: readonly ["4d4b7fc1-e7d0-430f-9c04-a6483d4866b1"];
            };
        };
        readonly required: readonly ["face_id", "providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly amazon: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly facepp: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageface_recognitionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageFaceRecognitionListFacesRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly attributes_as_list: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
                };
                readonly fallback_providers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly default: readonly [];
                    readonly maxItems: 5;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                };
                readonly providers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
                };
                readonly response_as_dict: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
                };
                readonly settings: {
                    readonly type: "string";
                    readonly default: {};
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
                };
                readonly show_original_response: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
                };
            };
            readonly required: readonly ["providers"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly amazon: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly facepp: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageface_recognitionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageFaceRecognitionRecognizeCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|bmp)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly amazon: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly facepp: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["face_ids", "status"];
                    readonly title: "imageface_recognitionFaceRecognitionAddFaceDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly face_ids: {
                            readonly title: "Face Ids";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageface_recognitionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageGenerationCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly text: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Description of the desired image(s). The maximum length is 1000 characters";
                readonly maxLength: 1000;
                readonly examples: readonly ["A huge red ballon flying outside the city."];
            };
            readonly resolution: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The image resolution (ex: 512x512, 1024x1024)";
                readonly maxLength: 50;
                readonly examples: readonly ["512x512"];
            };
            readonly num_images: {
                readonly type: "integer";
                readonly maximum: 10;
                readonly minimum: 1;
                readonly default: 1;
                readonly description: "The number of images to generate. Must be between 1 and 10.";
                readonly examples: readonly [2];
            };
        };
        readonly required: readonly ["providers", "resolution", "text"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly openai: {
                    readonly required: readonly ["status"];
                    readonly title: "imagegenerationGenerationDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["image", "image_resource_url"];
                                readonly title: "GeneratedImageDataClass";
                                readonly type: "object";
                                readonly properties: {
                                    readonly image: {
                                        readonly title: "Image";
                                        readonly type: "string";
                                    };
                                    readonly image_resource_url: {
                                        readonly title: "Image Resource Url";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly stabilityai: {
                    readonly required: readonly ["status"];
                    readonly title: "imagegenerationGenerationDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["image", "image_resource_url"];
                                readonly title: "GeneratedImageDataClass";
                                readonly type: "object";
                                readonly properties: {
                                    readonly image: {
                                        readonly title: "Image";
                                        readonly type: "string";
                                    };
                                    readonly image_resource_url: {
                                        readonly title: "Image Resource Url";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly amazon: {
                    readonly required: readonly ["status"];
                    readonly title: "imagegenerationGenerationDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["image", "image_resource_url"];
                                readonly title: "GeneratedImageDataClass";
                                readonly type: "object";
                                readonly properties: {
                                    readonly image: {
                                        readonly title: "Image";
                                        readonly type: "string";
                                    };
                                    readonly image_resource_url: {
                                        readonly title: "Image Resource Url";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly replicate: {
                    readonly required: readonly ["status"];
                    readonly title: "imagegenerationGenerationDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["image", "image_resource_url"];
                                readonly title: "GeneratedImageDataClass";
                                readonly type: "object";
                                readonly properties: {
                                    readonly image: {
                                        readonly title: "Image";
                                        readonly type: "string";
                                    };
                                    readonly image_resource_url: {
                                        readonly title: "Image Resource Url";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly deepai: {
                    readonly required: readonly ["status"];
                    readonly title: "imagegenerationGenerationDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["image", "image_resource_url"];
                                readonly title: "GeneratedImageDataClass";
                                readonly type: "object";
                                readonly properties: {
                                    readonly image: {
                                        readonly title: "Image";
                                        readonly type: "string";
                                    };
                                    readonly image_resource_url: {
                                        readonly title: "Image Resource Url";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imagegenerationResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageLandmarkDetectionCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly google: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelandmark_detectionLandmarkDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["description", "confidence"];
                                readonly title: "LandmarkItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly bounding_box: {
                                        readonly title: "Bounding Box";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly required: readonly ["x", "y"];
                                            readonly title: "LandmarkVertice";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly x: {
                                                    readonly title: "X";
                                                    readonly type: "integer";
                                                };
                                                readonly y: {
                                                    readonly title: "Y";
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly locations: {
                                        readonly title: "Locations";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly required: readonly ["lat_lng"];
                                            readonly title: "LandmarkLocation";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly lat_lng: {
                                                    readonly required: readonly ["latitude", "longitude"];
                                                    readonly title: "LandmarkLatLng";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly latitude: {
                                                            readonly title: "Latitude";
                                                            readonly type: "integer";
                                                        };
                                                        readonly longitude: {
                                                            readonly title: "Longitude";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelandmark_detectionLandmarkDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["description", "confidence"];
                                readonly title: "LandmarkItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly bounding_box: {
                                        readonly title: "Bounding Box";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly required: readonly ["x", "y"];
                                            readonly title: "LandmarkVertice";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly x: {
                                                    readonly title: "X";
                                                    readonly type: "integer";
                                                };
                                                readonly y: {
                                                    readonly title: "Y";
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly locations: {
                                        readonly title: "Locations";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly required: readonly ["lat_lng"];
                                            readonly title: "LandmarkLocation";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly lat_lng: {
                                                    readonly required: readonly ["latitude", "longitude"];
                                                    readonly title: "LandmarkLatLng";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly latitude: {
                                                            readonly title: "Latitude";
                                                            readonly type: "integer";
                                                        };
                                                        readonly longitude: {
                                                            readonly title: "Longitude";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imagelandmark_detectionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageLogoDetectionCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly api4ai: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelogo_detectionLogoDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["bounding_poly", "description", "score"];
                                readonly title: "LogoItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly bounding_poly: {
                                        readonly required: readonly ["vertices"];
                                        readonly title: "LogoBoundingPoly";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly vertices: {
                                                readonly title: "Vertices";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["x", "y"];
                                                    readonly title: "LogoVertice";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly x: {
                                                            readonly title: "X";
                                                            readonly type: "integer";
                                                        };
                                                        readonly y: {
                                                            readonly title: "Y";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly score: {
                                        readonly title: "Score";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly google: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelogo_detectionLogoDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["bounding_poly", "description", "score"];
                                readonly title: "LogoItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly bounding_poly: {
                                        readonly required: readonly ["vertices"];
                                        readonly title: "LogoBoundingPoly";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly vertices: {
                                                readonly title: "Vertices";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["x", "y"];
                                                    readonly title: "LogoVertice";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly x: {
                                                            readonly title: "X";
                                                            readonly type: "integer";
                                                        };
                                                        readonly y: {
                                                            readonly title: "Y";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly score: {
                                        readonly title: "Score";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly smartclick: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelogo_detectionLogoDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["bounding_poly", "description", "score"];
                                readonly title: "LogoItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly bounding_poly: {
                                        readonly required: readonly ["vertices"];
                                        readonly title: "LogoBoundingPoly";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly vertices: {
                                                readonly title: "Vertices";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["x", "y"];
                                                    readonly title: "LogoVertice";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly x: {
                                                            readonly title: "X";
                                                            readonly type: "integer";
                                                        };
                                                        readonly y: {
                                                            readonly title: "Y";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly score: {
                                        readonly title: "Score";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelogo_detectionLogoDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["bounding_poly", "description", "score"];
                                readonly title: "LogoItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly bounding_poly: {
                                        readonly required: readonly ["vertices"];
                                        readonly title: "LogoBoundingPoly";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly vertices: {
                                                readonly title: "Vertices";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["x", "y"];
                                                    readonly title: "LogoVertice";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly x: {
                                                            readonly title: "X";
                                                            readonly type: "integer";
                                                        };
                                                        readonly y: {
                                                            readonly title: "Y";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly score: {
                                        readonly title: "Score";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly clarifai: {
                    readonly required: readonly ["status"];
                    readonly title: "imagelogo_detectionLogoDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["bounding_poly", "description", "score"];
                                readonly title: "LogoItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly bounding_poly: {
                                        readonly required: readonly ["vertices"];
                                        readonly title: "LogoBoundingPoly";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly vertices: {
                                                readonly title: "Vertices";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly required: readonly ["x", "y"];
                                                    readonly title: "LogoVertice";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly x: {
                                                            readonly title: "X";
                                                            readonly type: "integer";
                                                        };
                                                        readonly y: {
                                                            readonly title: "Y";
                                                            readonly type: "integer";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly title: "Description";
                                        readonly type: "string";
                                    };
                                    readonly score: {
                                        readonly title: "Score";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imagelogo_detectionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageObjectDetectionCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.png"];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly api4ai: {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly google: {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly amazon: {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly microsoft: {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly clarifai: {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly "eden-ai": {
                    readonly required: readonly ["status"];
                    readonly title: "imageobject_detectionObjectDetectionDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly items: {
                            readonly title: "Items";
                            readonly type: "array";
                            readonly items: {
                                readonly required: readonly ["label", "confidence", "x_min", "x_max", "y_min", "y_max"];
                                readonly title: "ObjectItem";
                                readonly type: "object";
                                readonly properties: {
                                    readonly label: {
                                        readonly title: "Label";
                                        readonly type: "string";
                                    };
                                    readonly confidence: {
                                        readonly title: "Confidence";
                                        readonly type: "integer";
                                    };
                                    readonly x_min: {
                                        readonly title: "X Min";
                                        readonly type: "integer";
                                    };
                                    readonly x_max: {
                                        readonly title: "X Max";
                                        readonly type: "integer";
                                    };
                                    readonly y_min: {
                                        readonly title: "Y Min";
                                        readonly type: "integer";
                                    };
                                    readonly y_max: {
                                        readonly title: "Y Max";
                                        readonly type: "integer";
                                    };
                                };
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imageobject_detectionResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageQuestionAnswerCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
            readonly temperature: {
                readonly type: "number";
                readonly format: "double";
                readonly maximum: 1;
                readonly minimum: 0;
                readonly default: 0;
                readonly description: "Higher values mean the model will take more risks and value 0 (argmax sampling) works better for scenarios with a well-defined answer.";
            };
            readonly question: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Question about the image";
                readonly examples: readonly ["What are the logos on the image ?"];
            };
            readonly max_tokens: {
                readonly type: "integer";
                readonly maximum: 2048;
                readonly minimum: 1;
                readonly default: 1000;
                readonly description: "The maximum number of tokens to generate in the completion. The token count of your prompt plus max_tokens cannot exceed the model's context length.";
                readonly examples: readonly [64];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly openai: {
                    readonly required: readonly ["status"];
                    readonly title: "imagequestion_answerQuestionAnswerDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly answers: {
                            readonly title: "Answers";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly google: {
                    readonly required: readonly ["status"];
                    readonly title: "imagequestion_answerQuestionAnswerDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly answers: {
                            readonly title: "Answers";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
                readonly alephalpha: {
                    readonly required: readonly ["status"];
                    readonly title: "imagequestion_answerQuestionAnswerDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly answers: {
                            readonly title: "Answers";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                    };
                };
            };
            readonly title: "imagequestion_answerResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageSearchDeleteImageCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly image_name: {
                readonly type: "string";
                readonly minLength: 1;
                readonly examples: readonly ["test.jpg"];
            };
        };
        readonly required: readonly ["image_name", "providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
            };
            readonly title: "imagesearchResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageSearchGetImageRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly attributes_as_list: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
                };
                readonly fallback_providers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly default: readonly [];
                    readonly maxItems: 5;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                };
                readonly image_name: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly providers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
                };
                readonly response_as_dict: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
                };
                readonly settings: {
                    readonly type: "string";
                    readonly default: {};
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
                };
                readonly show_original_response: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
                };
            };
            readonly required: readonly ["image_name", "providers"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
            };
            readonly title: "imagesearchResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageSearchGetImagesRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly attributes_as_list: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
                };
                readonly fallback_providers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly default: readonly [];
                    readonly maxItems: 5;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                };
                readonly providers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
                };
                readonly response_as_dict: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
                };
                readonly settings: {
                    readonly type: "string";
                    readonly default: {};
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
                };
                readonly show_original_response: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
                };
            };
            readonly required: readonly ["providers"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
            };
            readonly title: "imagesearchResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageSearchLaunchSimilarityCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
            readonly n: {
                readonly type: "integer";
                readonly minimum: 1;
                readonly default: 10;
                readonly description: "The `n` parameter specifies the number of images you want to be returned in the response.             It determines the count of the most similar images to the input image that will be included in the response.             By default, it is set to 10.";
                readonly examples: readonly [5];
            };
        };
        readonly required: readonly ["providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
            };
            readonly title: "imagesearchResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ImageSearchUploadImageCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly settings: {
                readonly type: "string";
                readonly default: {};
                readonly description: "A dictionnary or a json object to specify specific models to use for some providers. <br>                     It can be in the following format: {\"google\" : \"google_model\", \"ibm\": \"ibm_model\"...}.\n                     ";
            };
            readonly providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly description: "It can be one (ex: **'amazon'** or **'google'**) or multiple provider(s) (ex: **'amazon,microsoft,google'**)             that the data will be redirected to in order to get the processed results.<br>             Providers can also be invoked with specific models (ex: providers: **'amazon/model1, amazon/model2, google/model3'**)";
            };
            readonly fallback_providers: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly default: readonly [];
                readonly description: "Providers in this list will be used as fallback if the call to provider in `providers` parameter fails.\n    To use this feature, you must input **only one** provider in the `providers` parameter. but you can put up to 5 fallbacks.\n\nThey will be tried in the same order they are input, and it will stop to the first provider who doesn't fail.\n\n\n*Doesn't work with async subfeatures.*\n    ";
                readonly maxItems: 5;
            };
            readonly response_as_dict: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Optional : When set to **true** (default), the response is an object of responses with providers names as keys : <br> \n                  ``` {\"google\" : { \"status\": \"success\", ... }, } ``` <br>\n                When set to **false** the response structure is a list of response objects : <br> \n                   ``` [{\"status\": \"success\", \"provider\": \"google\" ... }, ] ```. <br>\n                  ";
            };
            readonly attributes_as_list: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : When set to **false** (default) the structure of the extracted items is list of objects having different attributes : <br>\n     ```{'items': [{\"attribute_1\": \"x1\",\"attribute_2\": \"y2\"}, ... ]}``` <br>\n     When it is set to **true**, the response contains an object with each attribute as a list : <br>\n     ```{ \"attribute_1\": [\"x1\",\"x2\", ...], \"attribute_2\": [y1, y2, ...]}``` ";
            };
            readonly show_original_response: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Optional : Shows the original response of the provider.<br>\n        When set to **true**, a new attribute *original_response* will appear in the response object.";
            };
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "File to analyse in binary format to be used with *content-type*: **multipart/form-data** <br> **Does not work with application/json !**";
                readonly pattern: "(?:jpg|jpeg|png|tiff)$";
            };
            readonly file_url: {
                readonly type: readonly ["string", "null"];
                readonly format: "uri";
                readonly description: "File **URL** to analyse to be used with with *content-type*: **application/json**.";
                readonly examples: readonly ["http://edenai-resource-example.jpg"];
            };
            readonly image_name: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The image name need to have the extension of the file.";
                readonly examples: readonly ["test.jpg"];
            };
        };
        readonly required: readonly ["image_name", "providers"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly properties: {
                readonly nyckel: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
                readonly sentisight: {
                    readonly required: readonly ["status"];
                    readonly title: "imagesearchSearchDeleteImageDataClass";
                    readonly type: "object";
                    readonly properties: {
                        readonly status: {
                            readonly title: "Status";
                            readonly enum: readonly ["sucess", "fail"];
                            readonly type: "string";
                            readonly description: "`sucess` `fail`";
                        };
                        readonly original_response: {
                            readonly default: any;
                            readonly description: "original response sent by the provider, hidden by default, show it by passing the `show_original_response` field to `true` in your request";
                            readonly title: "Original Response";
                        };
                    };
                };
            };
            readonly title: "imagesearchResponseModel";
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "object";
                            readonly properties: {
                                readonly "<parameter_name>": {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly required: readonly ["<parameter_name>"];
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly details: {
                    readonly type: "string";
                    readonly default: "Not Found";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["message", "type"];
                };
            };
            readonly required: readonly ["error"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { ImageAnonymizationCreate, ImageAutomlClassificationCreateProjectCreate, ImageAutomlClassificationDeleteProjectCreate, ImageAutomlClassificationListProjectsRetrieve, ImageAutomlClassificationPredictAsyncCreate, ImageAutomlClassificationPredictAsyncRetrieve, ImageAutomlClassificationPredictAsyncRetrieve2, ImageAutomlClassificationTrainAsyncCreate, ImageAutomlClassificationTrainAsyncRetrieve, ImageAutomlClassificationTrainAsyncRetrieve2, ImageAutomlClassificationUploadDataAsyncCreate, ImageAutomlClassificationUploadDataAsyncRetrieve, ImageAutomlClassificationUploadDataAsyncRetrieve2, ImageBackgroundRemovalCreate, ImageEmbeddingsCreate, ImageExplicitContentCreate, ImageFaceCompareCreate, ImageFaceDetectionCreate, ImageFaceRecognitionAddFaceCreate, ImageFaceRecognitionDeleteFaceCreate, ImageFaceRecognitionListFacesRetrieve, ImageFaceRecognitionRecognizeCreate, ImageGenerationCreate, ImageLandmarkDetectionCreate, ImageLogoDetectionCreate, ImageObjectDetectionCreate, ImageQuestionAnswerCreate, ImageSearchDeleteImageCreate, ImageSearchGetImageRetrieve, ImageSearchGetImagesRetrieve, ImageSearchLaunchSimilarityCreate, ImageSearchUploadImageCreate };
