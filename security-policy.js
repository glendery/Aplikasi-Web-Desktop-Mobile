if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('default', {
        createHTML: (string, sink) => string,
        createScript: (string, sink) => string,
        createScriptURL: (string, sink) => string,
    });
}
