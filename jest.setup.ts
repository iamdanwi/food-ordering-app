import '@testing-library/jest-dom';

interface TextConstructor {
    new(): TextEncoder | TextDecoder;
}

// Extend the global scope without redeclaring
declare global {
    interface Global {
        TextEncoder: TextConstructor;
        TextDecoder: TextConstructor;
    }
}

Object.defineProperty(global, 'TextEncoder', {
    value: TextEncoder,
    writable: false
});

Object.defineProperty(global, 'TextDecoder', {
    value: TextDecoder,
    writable: false
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

export { }; 