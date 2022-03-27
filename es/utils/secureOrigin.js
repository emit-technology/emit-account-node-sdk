export function validateSecureOrigin() {
    var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    var isSecureOrigin = location.protocol === 'https:';
    var isSecure = isLocalhost || isSecureOrigin;
    if (!isSecure) {
        throw "[EMIT] Access to the WebCrypto API is restricted to secure origins.\nIf this is a development environment please use http://localhost:".concat(location.port, " instead.\nOtherwise, please use an SSL certificate.");
    }
}
//# sourceMappingURL=secureOrigin.js.map