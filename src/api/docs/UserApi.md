# ACollectionOfNomisApIs.UserApi

All URIs are relative to *https://nomi-menu-service.herokuapp.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUserLoginPost**](UserApi.md#apiUserLoginPost) | **POST** /api/user/login | Log in.
[**apiUserRegisterPost**](UserApi.md#apiUserRegisterPost) | **POST** /api/user/register | Registers a new user.


<a name="apiUserLoginPost"></a>
# **apiUserLoginPost**
> apiUserLoginPost(opts)

Log in.

### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.UserApi();

var opts = { 
  'email': "email_example", // String | 
  'password': "password_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiUserLoginPost(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | **String**|  | [optional] 
 **password** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined

<a name="apiUserRegisterPost"></a>
# **apiUserRegisterPost**
> apiUserRegisterPost(opts)

Registers a new user.

### Example
```javascript
var ACollectionOfNomisApIs = require('a_collection_of_nomis_ap_is');
var defaultClient = ACollectionOfNomisApIs.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new ACollectionOfNomisApIs.UserApi();

var opts = { 
  'user': new ACollectionOfNomisApIs.User() // User | User information. Id is ignored if provided.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.apiUserRegisterPost(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | [**User**](User.md)| User information. Id is ignored if provided. | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined

