import React from 'react';

export function useEffectOnce(effect: () => void | (() => void)) {
    const effectFn = React.useRef<() => void | (() => void)>(effect);
    const destroyFn = React.useRef<void | (() => void)>();
    const effectCalled = React.useRef(false);
    const rendered = React.useRef(false);
    const [, setVal] = React.useState<number>(0);

    if (effectCalled.current) {
        rendered.current = true;
    }

    React.useEffect(() => {
        // only execute the effect first time around
        if (!effectCalled.current) {
            destroyFn.current = effectFn.current();
            effectCalled.current = true;
        }

        // this forces one render after the effect is run
        setVal((val) => val + 1);

        return () => {
            // if the comp didn't render since the useEffect was called,
            // we know it's the dummy React cycle
            if (!rendered.current) {
                return;
            }

            // otherwise this is not a dummy destroy, so call the destroy func
            if (destroyFn.current) {
                destroyFn.current();
            }
        };
    }, []);
}
