import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
        '^@/types/(.*)$': '<rootDir>/types/$1',
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customJestConfig); 