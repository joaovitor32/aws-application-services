/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider:"v8",
	testEnvironment:"node",
	verbose:true,
	collectCoverageFrom:[
		"<rootDir>/src/providers/S3/*.ts",
		"<rootDir>/src/providers/SNS/*.ts",
		"<rootDir>/src/AwsFactory.ts",
	],
	preset: "ts-jest",
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
		"^.+\\.(js|jsx)$": "babel-jest",
	}
};