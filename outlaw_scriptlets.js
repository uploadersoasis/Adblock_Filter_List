'use strict';

/// set-attr-any-val.js
/// alias stav.js
/// world ISOLATED
// This scriptlet is NOT the same as the set-attr.js added in the native/default uBlock
// Origin scriptlets.js file.
// example.com##+js(stav, selector, attribute, value)
// was example.com##+js(sa, attr, value, [selector])
// changed to conform to format of native set-attr.js, but not conflict with its alias.
builtinScriptlets.push({
	name: 'set-attr-any-val.js',
	fn: setAttrAnyVal,
	world: 'ISOLATED',
	dependencies: [
	'run-at.fn',
	],
	aliases: [
	'stav.js',
	],
});

function setAttrAnyVal(
selector = '',
token = '',
attrValue = '',
runAt = ''
) {
	if ( token === '' ) {
		return;
	}
	const tokens = token.split(/\s*\|\s*/);
	if ( selector === '' ) {
		selector = `[${tokens.join('],[')}]`;
	}
	let timer;
	const setattrany = () => {
		timer = undefined;
		const nodes = document.querySelectorAll(selector);
		try {
			for (const node of nodes) {
				for ( const attr of tokens ) {
					if ( attr !== attrValue) {
						node.setAttribute(attr, attrValue);
					}
				}
			}
		}
		catch {
		}
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) {
			return;
		}
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
			const {
				type, addedNodes, removedNodes
			}
			= mutations[i];
			if ( type === 'attributes' ) {
				skip = false;
			}
			for ( let j = 0; j < addedNodes.length && skip; j++ ) {
				if ( addedNodes[j].nodeType === 1 ) {
					skip = false;
					break;
				}
			}
			for ( let j = 0; j < removedNodes.length && skip; j++ ) {
				if ( removedNodes[j].nodeType === 1 ) {
					skip = false;
					break;
				}
			}
		}
		if ( skip ) {
			return;
		}
		timer = self.requestAnimationFrame(setattrany);
	};

	const start = ( ) => {
		setattrany();
		if ( /\bloop\b/.test(runAt) === false ) {
			return;
		}
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: tokens,
			childList: true,
			subtree: true,
		}
		);
	};

	if ( document.readyState !== 'complete' && /\bcomplete\b/.test(runAt) ) {
		self.addEventListener('load', start, {
			once: true
		}
		);
	}
	else if ( document.readyState !== 'loading' || /\basap\b/.test(runAt) ) {
		start();
	}
	else {
		self.addEventListener('DOMContentLoaded', start, {
			once: true
		}
		);
	}
}
