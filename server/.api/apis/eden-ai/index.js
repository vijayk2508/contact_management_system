"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'eden-ai/2.0 (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**api4ai**|`v1.0.0`|25.0 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Anonymization
     * @throws FetchError<400, types.ImageAnonymizationCreateResponse400>
     * @throws FetchError<403, types.ImageAnonymizationCreateResponse403>
     * @throws FetchError<404, types.ImageAnonymizationCreateResponse404>
     * @throws FetchError<500, types.ImageAnonymizationCreateResponse500>
     */
    SDK.prototype.image_anonymization_create = function (body) {
        return this.core.fetch('/image/anonymization', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**nyckel**|`v1.0.0`|free|-
     *
     *
     * </details>
     *
     *
     *
     * @summary Automl Classification - Create Project
     * @throws FetchError<400, types.ImageAutomlClassificationCreateProjectCreateResponse400>
     * @throws FetchError<403, types.ImageAutomlClassificationCreateProjectCreateResponse403>
     * @throws FetchError<404, types.ImageAutomlClassificationCreateProjectCreateResponse404>
     * @throws FetchError<500, types.ImageAutomlClassificationCreateProjectCreateResponse500>
     */
    SDK.prototype.image_automl_classification_create_project_create = function (body) {
        return this.core.fetch('/image/automl_classification/create_project', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**nyckel**|`v1.0.0`|free|-
     *
     *
     * </details>
     *
     *
     *
     * @summary Automl Classification - Delete Project
     * @throws FetchError<400, types.ImageAutomlClassificationDeleteProjectCreateResponse400>
     * @throws FetchError<403, types.ImageAutomlClassificationDeleteProjectCreateResponse403>
     * @throws FetchError<404, types.ImageAutomlClassificationDeleteProjectCreateResponse404>
     * @throws FetchError<500, types.ImageAutomlClassificationDeleteProjectCreateResponse500>
     */
    SDK.prototype.image_automl_classification_delete_project_create = function (body) {
        return this.core.fetch('/image/automl_classification/delete_project', 'post', body);
    };
    /**
     * List Automl Classification Projects
     *
     * @summary Automl Classification - List Projects
     * @throws FetchError<400, types.ImageAutomlClassificationListProjectsRetrieveResponse400>
     * @throws FetchError<403, types.ImageAutomlClassificationListProjectsRetrieveResponse403>
     * @throws FetchError<404, types.ImageAutomlClassificationListProjectsRetrieveResponse404>
     * @throws FetchError<500, types.ImageAutomlClassificationListProjectsRetrieveResponse500>
     */
    SDK.prototype.image_automl_classification_list_projects_retrieve = function () {
        return this.core.fetch('/image/automl_classification/list_projects', 'get');
    };
    /**
     * Get a list of all jobs launched for this feature. You'll then be able to use the ID of
     * each one to get its status and results.<br>
     *                             Please note that a **job status doesn't get updated until a
     * get request** is sent.
     *
     * @summary Automl Classification Predict List Job
     */
    SDK.prototype.image_automl_classification_predict_async_retrieve = function () {
        return this.core.fetch('/image/automl_classification/predict_async', 'get');
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**nyckel**|`v1.0.0`|0.005 (per 1 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Automl Classification Predict Launch Job
     */
    SDK.prototype.image_automl_classification_predict_async_create = function (body) {
        return this.core.fetch('/image/automl_classification/predict_async', 'post', body);
    };
    /**
     * Get the status and results of an async job given its ID.
     *
     * @summary Automl Classification - Predict Get Job Results
     * @throws FetchError<400, types.ImageAutomlClassificationPredictAsyncRetrieve2Response400>
     * @throws FetchError<403, types.ImageAutomlClassificationPredictAsyncRetrieve2Response403>
     * @throws FetchError<404, types.ImageAutomlClassificationPredictAsyncRetrieve2Response404>
     * @throws FetchError<500, types.ImageAutomlClassificationPredictAsyncRetrieve2Response500>
     */
    SDK.prototype.image_automl_classification_predict_async_retrieve_2 = function (metadata) {
        return this.core.fetch('/image/automl_classification/predict_async/{public_id}', 'get', metadata);
    };
    /**
     * Get a list of all jobs launched for this feature. You'll then be able to use the ID of
     * each one to get its status and results.<br>
     *                             Please note that a **job status doesn't get updated until a
     * get request** is sent.
     *
     * @summary Automl Classification Train List Job
     */
    SDK.prototype.image_automl_classification_train_async_retrieve = function () {
        return this.core.fetch('/image/automl_classification/train_async', 'get');
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**nyckel**|`v1.0.0`|free|-
     *
     *
     * </details>
     *
     *
     *
     * @summary Automl Classification Train Launch Job
     */
    SDK.prototype.image_automl_classification_train_async_create = function (body) {
        return this.core.fetch('/image/automl_classification/train_async', 'post', body);
    };
    /**
     * Get the status and results of an async job given its ID.
     *
     * @summary Automl Classification - Train Get Job Results
     * @throws FetchError<400, types.ImageAutomlClassificationTrainAsyncRetrieve2Response400>
     * @throws FetchError<403, types.ImageAutomlClassificationTrainAsyncRetrieve2Response403>
     * @throws FetchError<404, types.ImageAutomlClassificationTrainAsyncRetrieve2Response404>
     * @throws FetchError<500, types.ImageAutomlClassificationTrainAsyncRetrieve2Response500>
     */
    SDK.prototype.image_automl_classification_train_async_retrieve_2 = function (metadata) {
        return this.core.fetch('/image/automl_classification/train_async/{public_id}', 'get', metadata);
    };
    /**
     * Get a list of all jobs launched for this feature. You'll then be able to use the ID of
     * each one to get its status and results.<br>
     *                             Please note that a **job status doesn't get updated until a
     * get request** is sent.
     *
     * @summary Automl Classification Upload Data List Job
     */
    SDK.prototype.image_automl_classification_upload_data_async_retrieve = function () {
        return this.core.fetch('/image/automl_classification/upload_data_async', 'get');
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**nyckel**|`v1.0.0`|0.0005 (per 1 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Automl Classification Upload Data Launch Job
     */
    SDK.prototype.image_automl_classification_upload_data_async_create = function (body) {
        return this.core.fetch('/image/automl_classification/upload_data_async', 'post', body);
    };
    /**
     * Get the status and results of an async job given its ID.
     *
     * @summary Automl Classification - Upload Data Get Job Results
     * @throws FetchError<400, types.ImageAutomlClassificationUploadDataAsyncRetrieve2Response400>
     * @throws FetchError<403, types.ImageAutomlClassificationUploadDataAsyncRetrieve2Response403>
     * @throws FetchError<404, types.ImageAutomlClassificationUploadDataAsyncRetrieve2Response404>
     * @throws FetchError<500, types.ImageAutomlClassificationUploadDataAsyncRetrieve2Response500>
     */
    SDK.prototype.image_automl_classification_upload_data_async_retrieve_2 = function (metadata) {
        return this.core.fetch('/image/automl_classification/upload_data_async/{public_id}', 'get', metadata);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**api4ai**|`v1.0.0`|50.0 (per 1000 file)|1 file
     * |**microsoft**|`v3.2`|1.0 (per 1000 file)|1 file
     * |**photoroom**|`v1`|16.0 (per 1000 file)|1 file
     * |**sentisight**|`v3.3.1`|0.75 (per 1000 file)|1 file
     * |**clipdrop**|`v1Beta`|0.5 (per 1 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Background Removal
     * @throws FetchError<400, types.ImageBackgroundRemovalCreateResponse400>
     * @throws FetchError<403, types.ImageBackgroundRemovalCreateResponse403>
     * @throws FetchError<404, types.ImageBackgroundRemovalCreateResponse404>
     * @throws FetchError<500, types.ImageBackgroundRemovalCreateResponse500>
     */
    SDK.prototype.image_background_removal_create = function (body) {
        return this.core.fetch('/image/background_removal', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Model|Version|Price|Billing unit|
     * |----|----|-------|-----|------------|
     * |**alephalpha**|-|`1.12.0`|0.05 (per 1 file)|1 file
     * |**alephalpha**|**luminous-base**|`1.12.0`|0.05 (per 1 file)|1 file
     *
     *
     * </details>
     *
     * <details><summary>Supported Languages</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**English**|`en`|
     * |**French**|`fr`|
     * |**German**|`de`|
     * |**Italian**|`it`|
     * |**Spanish**|`es`|
     *
     * </details><details><summary>Supported
     * Models</summary><details><summary>alephalpha</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**alephalpha**|`luminous-base`|
     *
     * </details>
     *
     * </details>
     *
     * @summary Embeddings
     * @throws FetchError<400, types.ImageEmbeddingsCreateResponse400>
     * @throws FetchError<403, types.ImageEmbeddingsCreateResponse403>
     * @throws FetchError<404, types.ImageEmbeddingsCreateResponse404>
     * @throws FetchError<500, types.ImageEmbeddingsCreateResponse500>
     */
    SDK.prototype.image_embeddings_create = function (body) {
        return this.core.fetch('/image/embeddings', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000 file)|1 file
     * |**clarifai**|`8.0.0`|2.0 (per 1000 file)|1 file
     * |**google**|`v1`|1.5 (per 1000 file)|1 file
     * |**microsoft**|`v3.2`|1.0 (per 1000 file)|1 file
     * |**sentisight**|`v3.3.1`|0.75 (per 1000 file)|1 file
     * |**picpurify**|`v1.1`|2.0 (per 1000 file)|1 file
     * |**api4ai**|`v1.0.0`|0.75 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Explicit Content Detection
     * @throws FetchError<400, types.ImageExplicitContentCreateResponse400>
     * @throws FetchError<403, types.ImageExplicitContentCreateResponse403>
     * @throws FetchError<404, types.ImageExplicitContentCreateResponse404>
     * @throws FetchError<500, types.ImageExplicitContentCreateResponse500>
     */
    SDK.prototype.image_explicit_content_create = function (body) {
        return this.core.fetch('/image/explicit_content', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**base64**|`latest`|0.25 (per 1 request)|1 request
     * |**facepp**|`v3`|2.0 (per 1000 request)|1 request
     * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Face Comparison
     * @throws FetchError<400, types.ImageFaceCompareCreateResponse400>
     * @throws FetchError<403, types.ImageFaceCompareCreateResponse403>
     * @throws FetchError<404, types.ImageFaceCompareCreateResponse404>
     * @throws FetchError<500, types.ImageFaceCompareCreateResponse500>
     */
    SDK.prototype.image_face_compare_create = function (body) {
        return this.core.fetch('/image/face_compare', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000 file)|1 file
     * |**clarifai**|`8.0.0`|2.0 (per 1000 file)|1 file
     * |**google**|`v1`|1.5 (per 1000 file)|1 file
     * |**microsoft**|`v3.2`|1.0 (per 1000 file)|1 file
     * |**api4ai**|`v1.0.0`|0.75 (per 1000 file)|1 file
     * |**picpurify**|`v1.1`|1.2 (per 1000 file)|1 file
     * |**skybiometry**|`v1`|0.7 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Face Detection
     * @throws FetchError<400, types.ImageFaceDetectionCreateResponse400>
     * @throws FetchError<403, types.ImageFaceDetectionCreateResponse403>
     * @throws FetchError<404, types.ImageFaceDetectionCreateResponse404>
     * @throws FetchError<500, types.ImageFaceDetectionCreateResponse500>
     */
    SDK.prototype.image_face_detection_create = function (body) {
        return this.core.fetch('/image/face_detection', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**amazon**|`boto3 1.26.8`|1.0 (per 1000 image)|1 image
     * |**facepp**|`v3`|0.6 (per 1000 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Face Recognition - Add Face
     * @throws FetchError<400, types.ImageFaceRecognitionAddFaceCreateResponse400>
     * @throws FetchError<403, types.ImageFaceRecognitionAddFaceCreateResponse403>
     * @throws FetchError<404, types.ImageFaceRecognitionAddFaceCreateResponse404>
     * @throws FetchError<500, types.ImageFaceRecognitionAddFaceCreateResponse500>
     */
    SDK.prototype.image_face_recognition_add_face_create = function (body) {
        return this.core.fetch('/image/face_recognition/add_face', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**amazon**|`boto3 1.26.8`|free|-
     * |**facepp**|`v3`|0.1 (per 1000 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Face Recognition - Delete Face
     * @throws FetchError<400, types.ImageFaceRecognitionDeleteFaceCreateResponse400>
     * @throws FetchError<403, types.ImageFaceRecognitionDeleteFaceCreateResponse403>
     * @throws FetchError<404, types.ImageFaceRecognitionDeleteFaceCreateResponse404>
     * @throws FetchError<500, types.ImageFaceRecognitionDeleteFaceCreateResponse500>
     */
    SDK.prototype.image_face_recognition_delete_face_create = function (body) {
        return this.core.fetch('/image/face_recognition/delete_face', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**amazon**|`boto3 1.26.8`|free|-
     * |**facepp**|`v3`|0.1 (per 1000 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Face Recognition - List Faces
     * @throws FetchError<400, types.ImageFaceRecognitionListFacesRetrieveResponse400>
     * @throws FetchError<403, types.ImageFaceRecognitionListFacesRetrieveResponse403>
     * @throws FetchError<404, types.ImageFaceRecognitionListFacesRetrieveResponse404>
     * @throws FetchError<500, types.ImageFaceRecognitionListFacesRetrieveResponse500>
     */
    SDK.prototype.image_face_recognition_list_faces_retrieve = function (metadata) {
        return this.core.fetch('/image/face_recognition/list_faces', 'get', metadata);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**amazon**|`boto3 1.26.8`|1.0 (per 1000 file)|1 file
     * |**facepp**|`v3`|2.0 (per 1000 request)|1 request
     *
     *
     * </details>
     *
     *
     *
     * @summary Face Recognition - Recognize Face
     * @throws FetchError<400, types.ImageFaceRecognitionRecognizeCreateResponse400>
     * @throws FetchError<403, types.ImageFaceRecognitionRecognizeCreateResponse403>
     * @throws FetchError<404, types.ImageFaceRecognitionRecognizeCreateResponse404>
     * @throws FetchError<500, types.ImageFaceRecognitionRecognizeCreateResponse500>
     */
    SDK.prototype.image_face_recognition_recognize_create = function (body) {
        return this.core.fetch('/image/face_recognition/recognize', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Model|Version|Resolution|Price|Billing unit|
     * |----|----|-------|------|-----|------------|
     * |**deepai**|-|`v1Beta`|`512x512`|0.05 (per 1 request)|1 request
     * |**deepai**|-|`v1Beta`|`256x256`|0.05 (per 1 request)|1 request
     * |**openai**|**dall-e-3**|`v1Beta`|`1024x1024`|0.04 (per 1 image)|1 image
     * |**openai**|**dall-e-3**|`v1Beta`|`512x512`|0.04 (per 1 image)|1 image
     * |**openai**|**dall-e-2**|`v1Beta`|`256x256`|0.016 (per 1 image)|1 image
     * |**openai**|**dall-e-2**|`v1Beta`|`512x512`|0.018 (per 1 image)|1 image
     * |**openai**|**dall-e-2**|`v1Beta`|`1024x1024`|0.02 (per 1 image)|1 image
     * |**openai**|**dall-e-3**|`v1Beta`|`1024x1792`|0.08 (per 1 image)|1 image
     * |**openai**|**dall-e-3**|`v1Beta`|`1792x1024`|0.08 (per 1 image)|1 image
     * |**openai**|-|`v1Beta`|`1024x1024`|0.04 (per 1 image)|1 image
     * |**openai**|-|`v1Beta`|`512x512`|0.018 (per 1 image)|1 image
     * |**openai**|-|`v1Beta`|`1024x1792`|0.08 (per 1 image)|1 image
     * |**openai**|-|`v1Beta`|`1792x1024`|0.08 (per 1 image)|1 image
     * |**stabilityai**|-|`v1Beta`|`512x512`|0.25 (per 1 image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-1024-v0-9**|`v1Beta`|`1024x1024`|2.0 (per 1
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-beta-v2-2-2**|`v1Beta`|`512x512`|0.83 (per 1
     * image)|1 image
     * |**stabilityai**|-|`v1Beta`|`1024x1024`|0.25 (per 1 image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-1024-v1-0**|`v1Beta`|`512x512`|6.0 (per 1000
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-v1-6**|`v1Beta`|`512x512`|10.0 (per 1000 image)|1
     * image
     * |**stabilityai**|**stable-diffusion-v1-6**|`v1Beta`|`256x256`|10.0 (per 1000 image)|1
     * image
     * |**stabilityai**|**stable-diffusion-xl-1024-v1-0**|`v1Beta`|`256x256`|6.0 (per 1000
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-beta-v2-2-2**|`v1Beta`|`1024x1024`|0.83 (per 1
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-beta-v2-2-2**|`v1Beta`|`256x256`|0.83 (per 1
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-1024-v0-9**|`v1Beta`|`512x512`|2.0 (per 1
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-1024-v0-9**|`v1Beta`|`256x256`|2.0 (per 1
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-xl-1024-v1-0**|`v1Beta`|`1024x1024`|6.0 (per 1000
     * image)|1 image
     * |**stabilityai**|**stable-diffusion-v1-6**|`v1Beta`|`1024x1024`|10.0 (per 1000 image)|1
     * image
     * |**replicate**|**anime-style**|`v1`|`1024x1024`|0.000225 (per 1 exec_time)|1 exec_time
     * |**replicate**|**anime-style**|`v1`|`256x256`|0.000225 (per 1 exec_time)|1 exec_time
     * |**replicate**|-|`v1`|-|0.000225 (per 1 exec_time)|1 exec_time
     * |**replicate**|**classic**|`v1`|`512x512`|0.00115 (per 1 exec_time)|1 exec_time
     * |**replicate**|**anime-style**|`v1`|`512x512`|0.000225 (per 1 exec_time)|1 exec_time
     * |**replicate**|**vintedois-diffusion**|`v1`|`512x512`|0.000225 (per 1 exec_time)|1
     * exec_time
     * |**replicate**|**vintedois-diffusion**|`v1`|`1024x1024`|0.000225 (per 1 exec_time)|1
     * exec_time
     * |**replicate**|**vintedois-diffusion**|`v1`|`256x256`|0.000225 (per 1 exec_time)|1
     * exec_time
     * |**replicate**|**classic**|`v1`|`1024x1024`|0.00115 (per 1 exec_time)|1 exec_time
     * |**replicate**|**classic**|`v1`|`256x256`|0.00115 (per 1 exec_time)|1 exec_time
     * |**amazon**|-|`boto3 (v1.29.6)`|`512x512`|0.01 (per 1 image)|1 image
     * |**amazon**|-|`boto3 (v1.29.6)`|`1024x1024`|0.012 (per 1 image)|1 image
     * |**amazon**|**titan-image-generator-v1_premium**|`boto3 (v1.29.6)`|`512x512`|0.01 (per 1
     * image)|1 image
     * |**amazon**|**titan-image-generator-v1_premium**|`boto3 (v1.29.6)`|`1024x1024`|0.012
     * (per 1 image)|1 image
     * |**amazon**|**titan-image-generator-v1_standard**|`boto3 (v1.29.6)`|`512x512`|0.008 (per
     * 1 image)|1 image
     * |**amazon**|**titan-image-generator-v1_standard**|`boto3 (v1.29.6)`|`1024x1024`|0.01
     * (per 1 image)|1 image
     *
     *
     * </details>
     *
     * <details><summary>Supported Models</summary><details><summary>openai</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**openai**|`dall-e-2`|
     * ||`dall-e-3`|
     *
     * </details><details><summary>stabilityai</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**stabilityai**|`stable-diffusion-v1-6`|
     * ||`stable-diffusion-xl-1024-v0-9`|
     * ||`stable-diffusion-xl-1024-v1-0`|
     * ||`stable-diffusion-xl-beta-v2-2-2`|
     *
     * </details><details><summary>replicate</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**replicate**|`anime-style`|
     * ||`classic`|
     * ||`vintedois-diffusion`|
     *
     * </details><details><summary>amazon</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**amazon**|`titan-image-generator-v1_premium`|
     * ||`titan-image-generator-v1_standard`|
     *
     * </details>
     *
     * </details>
     *
     * @summary Image generation
     * @throws FetchError<400, types.ImageGenerationCreateResponse400>
     * @throws FetchError<403, types.ImageGenerationCreateResponse403>
     * @throws FetchError<404, types.ImageGenerationCreateResponse404>
     * @throws FetchError<500, types.ImageGenerationCreateResponse500>
     */
    SDK.prototype.image_generation_create = function (body) {
        return this.core.fetch('/image/generation', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**google**|`v1`|1.5 (per 1000 file)|1 file
     * |**microsoft**|`v3.2`|1.0 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Landmark Detection
     * @throws FetchError<400, types.ImageLandmarkDetectionCreateResponse400>
     * @throws FetchError<403, types.ImageLandmarkDetectionCreateResponse403>
     * @throws FetchError<404, types.ImageLandmarkDetectionCreateResponse404>
     * @throws FetchError<500, types.ImageLandmarkDetectionCreateResponse500>
     */
    SDK.prototype.image_landmark_detection_create = function (body) {
        return this.core.fetch('/image/landmark_detection', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Model|Version|Price|Billing unit|
     * |----|----|-------|-----|------------|
     * |**google**|-|`v1`|1.5 (per 1000 file)|1 file
     * |**microsoft**|-|`v3.2`|1.0 (per 1000 file)|1 file
     * |**smartclick**|-|`v3.2`|0.5 (per 1000 file)|1 file
     * |**api4ai**|-|`v1.0.0`|0.25 (per 1000 file)|1 file
     * |**api4ai**|**v1**|`v1.0.0`|0.25 (per 1000 file)|1 file
     * |**api4ai**|**v2**|`v1.0.0`|2.5 (per 1000 file)|1 file
     * |**clarifai**|-|`8.0.0`|2.0 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     * <details><summary>Supported Models</summary><details><summary>api4ai</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**api4ai**|`v1`|
     * ||`v2`|
     *
     * </details>
     *
     * </details>
     *
     * @summary Logo Detection
     * @throws FetchError<400, types.ImageLogoDetectionCreateResponse400>
     * @throws FetchError<403, types.ImageLogoDetectionCreateResponse403>
     * @throws FetchError<404, types.ImageLogoDetectionCreateResponse404>
     * @throws FetchError<500, types.ImageLogoDetectionCreateResponse500>
     */
    SDK.prototype.image_logo_detection_create = function (body) {
        return this.core.fetch('/image/logo_detection', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Model|Version|Price|Billing unit|
     * |----|----|-------|-----|------------|
     * |**amazon**|-|`boto3 (v1.15.18)`|1.0 (per 1000 file)|1 file
     * |**api4ai**|-|`1.9.2`|0.5 (per 1000 file)|1 file
     * |**clarifai**|-|`8.0.0`|2.0 (per 1000 file)|1 file
     * |**clarifai**|**general-image-detection**|`8.0.0`|2.0 (per 1000 file)|1 file
     * |**google**|-|`v1`|2.25 (per 1000 file)|1 file
     * |**microsoft**|-|`v3.2`|1.0 (per 1000 file)|1 file
     * |**sentisight**|-|`v3.3.1`|0.75 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     * <details><summary>Supported Models</summary><details><summary>clarifai</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**clarifai**|`general-image-detection`|
     *
     * </details>
     *
     * </details>
     *
     * @summary Object Detection
     * @throws FetchError<400, types.ImageObjectDetectionCreateResponse400>
     * @throws FetchError<403, types.ImageObjectDetectionCreateResponse403>
     * @throws FetchError<404, types.ImageObjectDetectionCreateResponse404>
     * @throws FetchError<500, types.ImageObjectDetectionCreateResponse500>
     */
    SDK.prototype.image_object_detection_create = function (body) {
        return this.core.fetch('/image/object_detection', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Model|Version|Price|Billing unit|
     * |----|----|-------|-----|------------|
     * |**alephalpha**|**luminous-base**|`1.12.0`|0.02 (per 1 request)|1 request
     * |**alephalpha**|**luminous-extended**|`1.12.0`|0.03 (per 1 request)|1 request
     * |**alephalpha**|-|`1.12.0`|0.03 (per 1 request)|1 request
     * |**openai**|-|`v1`|0.02 (per 1 request)|1 request
     * |**openai**|**gpt-4-vision-preview**|`v1`|0.02 (per 1 request)|1 request
     * |**google**|-|`v1`|0.01 (per 1 request)|1 request
     * |**google**|**gemini-pro-vision**|`v1`|0.01 (per 1 request)|1 request
     *
     *
     * </details>
     *
     * <details><summary>Supported Languages</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**English**|`en`|
     * |**French**|`fr`|
     * |**German**|`de`|
     * |**Italian**|`it`|
     * |**Spanish**|`es`|
     *
     * </details><details><summary>Supported
     * Models</summary><details><summary>alephalpha</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**alephalpha**|`luminous-base`|
     * ||`luminous-extended`|
     *
     * </details><details><summary>openai</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**openai**|`gpt-4-vision-preview`|
     *
     * </details><details><summary>google</summary>
     *
     *
     *
     *
     *
     * |Name|Value|
     * |----|-----|
     * |**google**|`gemini-pro-vision`|
     *
     * </details>
     *
     * </details>
     *
     * @summary Question Answer
     * @throws FetchError<400, types.ImageQuestionAnswerCreateResponse400>
     * @throws FetchError<403, types.ImageQuestionAnswerCreateResponse403>
     * @throws FetchError<404, types.ImageQuestionAnswerCreateResponse404>
     * @throws FetchError<500, types.ImageQuestionAnswerCreateResponse500>
     */
    SDK.prototype.image_question_answer_create = function (body) {
        return this.core.fetch('/image/question_answer', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**sentisight**|`v3.3.1`|free|-
     * |**nyckel**|`v1.0.0`|free|-
     *
     *
     * </details>
     *
     *
     *
     * @summary Search - Delete phase
     * @throws FetchError<400, types.ImageSearchDeleteImageCreateResponse400>
     * @throws FetchError<403, types.ImageSearchDeleteImageCreateResponse403>
     * @throws FetchError<404, types.ImageSearchDeleteImageCreateResponse404>
     * @throws FetchError<500, types.ImageSearchDeleteImageCreateResponse500>
     */
    SDK.prototype.image_search_delete_image_create = function (body) {
        return this.core.fetch('/image/search/delete_image', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**sentisight**|`v3.3.1`|free|-
     * |**nyckel**|`v1.0.0`|free|-
     *
     *
     * </details>
     *
     *
     *
     * @summary Search - get image
     * @throws FetchError<400, types.ImageSearchGetImageRetrieveResponse400>
     * @throws FetchError<403, types.ImageSearchGetImageRetrieveResponse403>
     * @throws FetchError<404, types.ImageSearchGetImageRetrieveResponse404>
     * @throws FetchError<500, types.ImageSearchGetImageRetrieveResponse500>
     */
    SDK.prototype.image_search_get_image_retrieve = function (metadata) {
        return this.core.fetch('/image/search/get_image', 'get', metadata);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**sentisight**|`v3.3.1`|free|-
     * |**nyckel**|`v1.0.0`|free|-
     *
     *
     * </details>
     *
     *
     *
     * @summary Search - list all images
     * @throws FetchError<400, types.ImageSearchGetImagesRetrieveResponse400>
     * @throws FetchError<403, types.ImageSearchGetImagesRetrieveResponse403>
     * @throws FetchError<404, types.ImageSearchGetImagesRetrieveResponse404>
     * @throws FetchError<500, types.ImageSearchGetImagesRetrieveResponse500>
     */
    SDK.prototype.image_search_get_images_retrieve = function (metadata) {
        return this.core.fetch('/image/search/get_images', 'get', metadata);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**sentisight**|`v3.3.1`|0.75 (per 1000 file)|1 file
     * |**nyckel**|`v1.0.0`|1.0 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Search - launch similarity
     * @throws FetchError<400, types.ImageSearchLaunchSimilarityCreateResponse400>
     * @throws FetchError<403, types.ImageSearchLaunchSimilarityCreateResponse403>
     * @throws FetchError<404, types.ImageSearchLaunchSimilarityCreateResponse404>
     * @throws FetchError<500, types.ImageSearchLaunchSimilarityCreateResponse500>
     */
    SDK.prototype.image_search_launch_similarity_create = function (body) {
        return this.core.fetch('/image/search/launch_similarity', 'post', body);
    };
    /**
     * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
     * Providers</strong></summary>
     *
     *
     *
     * |Provider|Version|Price|Billing unit|
     * |----|-------|-----|------------|
     * |**sentisight**|`v3.3.1`|0.75 (per 1000 file)|1 file
     * |**nyckel**|`v1.0.0`|0.5 (per 1000 file)|1 file
     *
     *
     * </details>
     *
     *
     *
     * @summary Search - Upload Phase
     * @throws FetchError<400, types.ImageSearchUploadImageCreateResponse400>
     * @throws FetchError<403, types.ImageSearchUploadImageCreateResponse403>
     * @throws FetchError<404, types.ImageSearchUploadImageCreateResponse404>
     * @throws FetchError<500, types.ImageSearchUploadImageCreateResponse500>
     */
    SDK.prototype.image_search_upload_image_create = function (body) {
        return this.core.fetch('/image/search/upload_image', 'post', body);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
