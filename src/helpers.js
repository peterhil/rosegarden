// Copyright (c) 2018-2022 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global chrome */

import { includes, init, last, test } from 'rambda'

const exceptions = [
    'chrome.search', // opera: opens the default search engine
]

export function callbackToPromise (fn) {
    const promised = (...args) => {
        return new Promise((resolve, reject) => {
            try {
                fn(...args, resolve)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    return promised
}

export function isCallback (thing, prefix, property, verbose=false) {
    const fnPath = [prefix, property].join('.')
    let result = false

    try {
        if (includes(fnPath, exceptions)) {
            result = false
        } else {
            thing(console.error, 777)  // invalid call
        }
        verbose && console.log('non-callback function:', thing.length, prefix, property)
    } catch (err) {
        if (err instanceof TypeError) {
            if (test(/callback/, err.message)) {
                verbose && console.debug('callback:', thing.length, prefix, property)
                return true
            } else {
                verbose && console.log('non-callback signature:', thing.length, prefix, property, err.message.split(':')[0].slice(23))
            }
        } else {
            throw err
        }
    }

    return false
}

export function withErrorChecking (chromeAsyncFn) {
    return function wrappedAsyncChromeFn (...args) {
        const originalCallback = last(args)
        const fnArgs = init(args)

        function callbackWithErrorCheck (...resultArgs) {
            const error = chrome.runtime.lastError
            const isTabMessage = test(/^Tabs cannot be \w+ right now \(user may be dragging a tab\)\.$/)

            if (error) {
                // Workaround for bug in Chrome v91:
                // https://bugs.chromium.org/p/chromium/issues/detail?id=1213925
                if (isTabMessage(error.message)) {
                    // console.warn('[withErrorChecking] avoiding:', error.message)
                    setTimeout(() => {
                        originalCallback(...resultArgs)
                    }, 500)
                    return
                }
                else {
                    throw new Error(error.message)
                }
            }

            originalCallback(...resultArgs)
        }

        chromeAsyncFn(...fnArgs, callbackWithErrorCheck)
    }
}
