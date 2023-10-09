// Contains scriptlets I use in https://raw.githubusercontent.com/uploadersoasis/Adblock_Filter_List/master/OutlawAdblockList.txt
// which have been removed from https://github.com/gorhill/uBlock/blob/master/assets/resources/scriptlets.js or
// https://raw.githubusercontent.com/uBlock-user/uBO-Scriptlets/master/scriptlets.js by their developers.

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
	const tokens = token.split(/\s*\|\s*/);  // create an array if multiple attributes entered separated with |
	if ( selector === '' ) { selector = `[${tokens.join('],[')}]`; }
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

/* added to https://github.com/gorhill/uBlock/blob/master/assets/resources/scriptlets.js for multiup file host domains
builtinScriptlets.push({
    name: 'multiup.js',
    fn: multiup,
    world: 'ISOLATED',
});
function multiup() {
    const handler = ev => {
        const target = ev.target;
        if ( target.matches('button[link]') === false ) { return; }
        const ancestor = target.closest('form');
        if ( ancestor === null ) { return; }
        if ( ancestor !== target.parentElement ) { return; }
        const link = (target.getAttribute('link') || '').trim();
        if ( link === '' ) { return; }
        ev.preventDefault();
        ev.stopPropagation();
        document.location.href = link;
    };
    document.addEventListener('click', handler, { capture: true });
}
*/
