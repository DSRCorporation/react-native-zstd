"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compress = compress;
exports.decompress = decompress;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-zstd' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const ZstdModule = isTurboModuleEnabled ? require('./NativeZstd').default : _reactNative.NativeModules.Zstd;
const Zstd = ZstdModule ? ZstdModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function compress(data, compressLevel = 3) {
  const out = Zstd.compress(data, compressLevel);
  return out;
}
function decompress(data) {
  const out = Zstd.decompress(data);
  return out;
}
//# sourceMappingURL=index.js.map