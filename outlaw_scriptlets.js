/* 
 * @scriptlet set-attr-any-val
 * 
 * @description
 * Sets the specified attribute on the specified elements. This scriptlet runs
 * once when the page loads then afterward on DOM mutations.

 * Reference: https://github.com/AdguardTeam/Scriptlets/blob/master/src/scriptlets/set-attr.js
 * 
 * ### Syntax
 * 
 * ```text
 * example.org##+js(set-attr, selector, attr, value)
 * ```
 * 
 * - `selector`: CSS selector of DOM elements for which the attribute `attr`
 *   must be modified.
 * - `attr`: the name of the attribute to modify
 * - `value`: the value to assign to the target attribute.
 */
builtinScriptlets.push({
    name: 'set-attr-any.js',
    requiresTrust: false,
    aliases: [
        'sta.js',
    ],
    fn: setAttrAny,
    world: 'ISOLATED',
    dependencies: [
        'run-at.fn',
    ],
});
function setAttrAny(
    selector = '',
    attr = '',
    value = ''
) {
    if ( typeof selector !== 'string' ) { return; }
    if ( selector === '' ) { return; }
    if ( value === '' ) { return; }

    const applySetAttr = ( ) => {
        const elems = [];
        try {
            elems.push(...document.querySelectorAll(selector));
        }
        catch(ex) {
            return false;
        }
        for ( const elem of elems ) {
            const before = elem.getAttribute(attr);
            const after = extractValue(elem);
            if ( after === before ) { continue; }
            elem.setAttribute(attr, after);
        }
        return true;
    };
    let observer, timer;
    const onDomChanged = mutations => {
        if ( timer !== undefined ) { return; }
        let shouldWork = false;
        for ( const mutation of mutations ) {
            if ( mutation.addedNodes.length === 0 ) { continue; }
            for ( const node of mutation.addedNodes ) {
                if ( node.nodeType !== 1 ) { continue; }
                shouldWork = true;
                break;
            }
            if ( shouldWork ) { break; }
        }
        if ( shouldWork === false ) { return; }
        timer = self.requestAnimationFrame(( ) => {
            timer = undefined;
            applySetAttr();
        });
    };
    const start = ( ) => {
        if ( applySetAttr() === false ) { return; }
        observer = new MutationObserver(onDomChanged);
        observer.observe(document.body, {
            subtree: true,
            childList: true,
        });
    };
    runAt(( ) => { start(); }, 'idle');
}
