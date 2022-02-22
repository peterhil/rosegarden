// Copyright (c) 2018-2022 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global globalThis */

import { compose, curry } from 'rambda'

import { callbackToPromise, isCallback, withErrorChecking } from './helpers'

if (globalThis.chrome && !globalThis.browser) {
    const chrome = globalThis.chrome
    const promises = promised(chrome)

    const browser = Object.assign({}, chrome, promises)
    globalThis.browser = browser
}

/**
 * A global browser object with promisified API
 */
export const browser = globalThis.browser

/**
 * Promisify a callback based chrome API
 */
export function promised (object, prefix='chrome', verbose=false) {
    const promises = {}

    for (const property in object) {
        const thing = object[property]
        const kind = typeof thing

        switch (kind) {
        case 'function':
            if (!isCallback(thing, prefix, property, verbose)) {
                promises[property] = thing
            } else {
                promises[property] = toPromise(thing)
            }
            break
        case 'object':
            if (property.slice(0, 2) === 'on') {
                promises[property] = thing
            } else {
                promises[property] = promised(thing, [prefix, property].join('.'))
            }
            break
        }
    }

    return promises
}

/**
 * Promisify a callback based chrome API method.
 * Rejects if `chrome.runtime.lastError` is defined.
 */
export function toPromise (fn) {
    return compose(callbackToPromise, withErrorChecking, curry)(fn)
}
