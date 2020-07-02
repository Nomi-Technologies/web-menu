# ACollectionOfNomisApIs.RestaurantApi

All URIs are relative to *https://nomi-menu-service.herokuapp.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiRestaurantsRegisterPost**](RestaurantApi.md#apiRestaurantsRegisterPost) | **POST** /api/restaurants/register | Creates a restaurant.
[**webApiRestaurantsGet**](RestaurantApi.md#webApiRestaurantsGet) | **GET** /webApi/restaurants | 


<a name="apiRestaurantsRegisterPost"></a>
# **apiRestaurantsRegisterPost**
> apiRestaurantsRegisterPost(opts)

Creates a restaurant.

### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.RestaurantApi();

var opts = { 
  'name': new ACollectionOfNomisApIs.Restaurant() // Restaurant | Restaurant information. Id is ignored if provided.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiRestaurantsRegisterPost(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**Restaurant**](Restaurant.md)| Restaurant information. Id is ignored if provided. | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined

<a name="webApiRestaurantsGet"></a>
# **webApiRestaurantsGet**
> webApiRestaurantsGet()



### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.RestaurantApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.webApiRestaurantsGet(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

