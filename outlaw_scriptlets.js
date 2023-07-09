'use strict';

/// set-attr-any.js
/// alias saa.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(saa, attr, value, [selector])
// This scriptlet is NOT the same as the set-attr.js added in the native/default uBlock
// Origin scriptlets.js file.
// NOTES: This will NOT set a value if the attribute does not exist.
function setAttrAny(token = '', attrValue = '', selector = '', run = '') {
	if ( token === '' ) { return; }
	const tokens = token.split(/\s*\|\s*/);
	if ( selector === '' ) { selector = `[${tokens.join('],[')}]`; }
	const url = document.querySelector(selector).attributes.onclick.value.slice(13, -3);
	if ( url != null) {
		attrValue = url;
	}
	let timer;
	const setattr = () => {
		timer = undefined;	
		const nodes = document.querySelectorAll(selector);
		try {
			for (const node of nodes) {
				for ( const attr of tokens ) {
					if ( attr !== attrValue ) { 
						node.setAttribute(attr, attrValue);
					}
				}
			}
		} catch { }
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
			const { type, addedNodes, removedNodes } = mutations[i];
			if ( type === 'attributes' ) { skip = false; }
			for ( let j = 0; j < addedNodes.length && skip; j++ ) {
				if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
			}
		}
		for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(setattr);
	};
	const start = ( ) => {
		setattr();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
			attributeFilter: tokens,
			childList: true,
			subtree: true,
		});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
/* replaced by runAt() line above
	if ( document.readyState !== 'complete' && /\bcomplete\b/.test(runAt) ) {
		self.addEventListener('load', start, true);
		} else if ( document.readyState !== 'loading' || /\basap\b/.test(runAt) ) {
			start();
		} else {
			self.addEventListener('DOMContentLoaded', start, true);
		}
*/
}
