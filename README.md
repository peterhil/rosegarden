# Rosegarden

Rosegarden gives you the promises for writing cross platform
webextensions on Chrome and other browsers missing the promise based
API.

## Rationale

I know Mozilla provides [webextension-polyfill], but I find even that
too complicated.

With my [Spellbook] bookmark browser extension I promisified the
required callback based methods from Chrome API and checked the
`chrome.runtime.lastError`. Eventually I promisified the whole API,
while planning on writing another cross platform browser extension.

I have used only bookmarks and tabs APIs, so beware when
using other APIs, in case they differ between Firefox and Chrome.

## Usage

    import { browser } from 'rosegarden'

Then just use that browser object as you would use the Mozilla's
promise based WebExtension API!

It just gives the global object on Firefox, but on Chrome it gives a
promisified version of the chrome global object. The browser object
has chrome as prototype, so everything should work as expected as long
as the APIs work in a similar way.

# Library development

## Install dependencies

    pnpm install

## Build unpackaged development version

    pnpm run dev

Builds the library into the `dev` directory.

## Build a minified production version

    pnpm run build

Builds the library into the `dist` directory.

## Licensing

Copyright © 2018–2022 Peter Hillerström and contributors

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a [copy of the MPL](https://github.com/peterhil/rosegarden/blob/main/LICENSE.txt) was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).

[Spellbook]: https://github.com/peterhil/spellbook
[webextension-polyfill]: https://github.com/mozilla/webextension-polyfill
