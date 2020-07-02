# ACollectionOfNomisApIs.DefaultApi

All URIs are relative to *https://nomi-menu-service.herokuapp.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAssetsPathGet**](DefaultApi.md#apiAssetsPathGet) | **GET** /api/assets/{path} | 


<a name="apiAssetsPathGet"></a>
# **apiAssetsPathGet**
> apiAssetsPathGet(path)



### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.DefaultApi();

var path = "path_example"; // String | path of assets to be fetched


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiAssetsPathGet(path, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**| path of assets to be fetched | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

