// import {NativeModules} from 'react-native';
// module.exports = NativeModules.NeonAndroid;


'use strict';

import { NativeModules, NativeEventEmitter} from 'react-native';

const NeonModule = NativeModules.NeonAndroid;

const eventBroadcastNames = [
    'Live-Photo-Clicked'
];

var NeonAndroidEventEmitter;

var _eventNames = [ "livePhoto"];

var _eventsHandler = new Map();
var _eventsCache = new Map();
var _listeners = [];

if (NeonModule != null) {
    NeonAndroidEventEmitter = new NativeEventEmitter(NeonModule);

    for(var i = 0; i < eventBroadcastNames.length; i++) {
        var eventBroadcastName = eventBroadcastNames[i];
        var eventName = _eventNames[i];

        _listeners[eventName] = handleEventBroadcast(eventName, eventBroadcastName)
    }
}

function handleEventBroadcast(type, broadcast) {
    return NeonAndroidEventEmitter.addListener(
        broadcast, (notification) => {
            // Check if we have added listener for this type yet
            // Cache the result first if we have not.
            var handler = _eventsHandler.get(type);

            if (handler) {
                handler(notification);
            } else {
                _eventsCache.set(type, notification);
            }
        }
    );
}

function checkIfInitialized() {
    return NeonModule != null;
}

export default class NeonAndroid {
    static addEventListener(type: any, handler: Function) {
        if (!checkIfInitialized()) return;

        // Listen to events

        _eventsHandler.set(type, handler);

        // Check if there is a cache for this type of event
        var cache = _eventsCache.get(type);
        if (handler && cache) {
            handler(cache);
            _eventsCache.delete(type);
        }
    }

    static removeEventListener(type, handler) {
        if (!checkIfInitialized()) return;

        _eventsHandler.delete(type);
    }

    static clearListeners() {
        if (!checkIfInitialized()) return;

        for(var i = 0; i < _eventNames.length; i++) {
            _listeners[_eventNames].remove();
        }
    }

    static openNeutral(params, callback: Function){
        if (!checkIfInitialized()) return;
        NeonModule.collectPhotos(0, params, callback)
    }

    static openCamera(params, callback: Function){
        if (!checkIfInitialized()) return;
        NeonModule.collectPhotos(1, params, callback)
    }

    static openGallery(params, callback: Function){
        if (!checkIfInitialized()) return;
        NeonModule.collectPhotos(2, params, callback)
    }

    static openLivePhotos(params, callback: Function){
        if (!checkIfInitialized()) return;
        NeonModule.livePhotos(params, callback)
    }

    static openOneStep(category, subCategory, camScannerApiKey, callback: Function){
        if (!checkIfInitialized()) return;
        NeonModule.oneStepPhotos(category, subCategory, camScannerApiKey, callback)
    }

}