let api_url = '';
let app_url = '';
let gaode_maps_js_api_key = '33c20882595f1fecc2d31c8c73a38da7';

switch (process.env.NODE_ENV) {
    case 'development':
        api_url = 'http://127.0.0.1/api/v1';
        app_url = 'http://127.0.0.1';
        break;
    case 'production':
        api_url = 'http://127.0.0.1/api/v1';
        app_url = 'http://127.0.0.1';
        break;
}

export const HUANG_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
};
