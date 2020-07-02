# ACollectionOfNomisApIs.DishApi

All URIs are relative to *https://nomi-menu-service.herokuapp.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiDishesDishIdDelete**](DishApi.md#apiDishesDishIdDelete) | **DELETE** /api/dishes/{dishId} | 
[**apiDishesDishIdGet**](DishApi.md#apiDishesDishIdGet) | **GET** /api/dishes/{dishId} | 
[**apiDishesDishIdPut**](DishApi.md#apiDishesDishIdPut) | **PUT** /api/dishes/{dishId} | 
[**apiDishesGet**](DishApi.md#apiDishesGet) | **GET** /api/dishes | Fetches the menu information for the user's restaurant.
[**apiDishesPost**](DishApi.md#apiDishesPost) | **POST** /api/dishes | Creates a dish.
[**webApiDishesRestaurantIdGet**](DishApi.md#webApiDishesRestaurantIdGet) | **GET** /webApi/dishes/{restaurantId} | Fetches the published menu info of a restaurant


<a name="apiDishesDishIdDelete"></a>
# **apiDishesDishIdDelete**
> apiDishesDishIdDelete(dishId)



### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DishApi();

var dishId = 56; // Number | ID of dish


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiDishesDishIdDelete(dishId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dishId** | **Number**| ID of dish | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="apiDishesDishIdGet"></a>
# **apiDishesDishIdGet**
> apiDishesDishIdGet(dishId)



### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DishApi();

var dishId = 56; // Number | ID of dish


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiDishesDishIdGet(dishId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dishId** | **Number**| ID of dish | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="apiDishesDishIdPut"></a>
# **apiDishesDishIdPut**
> apiDishesDishIdPut(dishId)



### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DishApi();

var dishId = 56; // Number | ID of dish


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiDishesDishIdPut(dishId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dishId** | **Number**| ID of dish | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="apiDishesGet"></a>
# **apiDishesGet**
> [Dish] apiDishesGet()

Fetches the menu information for the user's restaurant.

### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DishApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.apiDishesGet(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[Dish]**](Dish.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="apiDishesPost"></a>
# **apiDishesPost**
> Dish apiDishesPost(opts)

Creates a dish.

Tags and category (not categoryId) are ignored if provided.

### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DishApi();

var opts = { 
  'dish': new ACollectionOfNomisApIs.Dish() // Dish | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.apiDishesPost(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dish** | [**Dish**](Dish.md)|  | [optional] 

### Return type

[**Dish**](Dish.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="webApiDishesRestaurantIdGet"></a>
# **webApiDishesRestaurantIdGet**
> [Dish] webApiDishesRestaurantIdGet(restaurantId)

Fetches the published menu info of a restaurant

### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DishApi();

var restaurantId = "restaurantId_example"; // String | unique name of the restaurant


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.webApiDishesRestaurantIdGet(restaurantId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **restaurantId** | **String**| unique name of the restaurant | 

### Return type

[**[Dish]**](Dish.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

