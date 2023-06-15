export class Validator {

    private value; // input value


    // parameters
    private range = [];
    private minNum = 0;
    private maxNum = Number.MAX_SAFE_INTEGER;
    private includedString = '';
    private regexStr = '';
    private types: ('string' | 'number' | 'array' | 'boolean')[] = [];
    private equalValue = null;
    private exactLen = 0;
    private maxLen = 0;
    private minLen = 0;

    // check flags
    private isCheckingTypes = false;


    private isCheckingNotNull = false;
    private isCheckingNotEmpty = false;
    private isCheckingRegex = false;
    private isCheckingInRange = false;
    private isCheckingMax = false;
    private isCheckingMin = false;

    private isCheckingIncludeString = false;
    private isCheckingIncludeStringCaseSensitive = false;

    private isCheckingEqual = false;
    private isCheckingMaxLength = false;
    private isCheckingMinLength = false;
    private isCheckingExactLength = false;


    constructor(value: any) {
        this.value = value;
    }

    isNotNull(): void {
        this.isCheckingNotNull = true;
    }

    isNotEmpty(): void {
        this.isCheckingNotEmpty = true;
    }

    isBoolean(): void {
        this.isCheckingTypes = true;
        this.types.push('boolean');
    }
    isNumber(): void {
        this.isCheckingTypes = true;
        this.types.push('number');
    }
    isArray(): void {
        this.isCheckingTypes = true;
        this.types.push('array');
    }
    isString(): void {
        this.isCheckingTypes = true;
        this.types.push('string');
    }

    isInRange(range: any[]): void {
        this.isCheckingInRange = true;
    }

    regex(regexStr: string) {
        this.isCheckingRegex = true;
        this.regexStr = regexStr;
    }

    length(value: number) {
        this.isCheckingExactLength = true;
        this.exactLen = value;
    }

    maxLength(value: number) {
        this.isCheckingMaxLength = true;
        this.maxLen = value;
    }

    minLength(value: number) {
        this.isCheckingMinLength = true;
        this.minLen = value;
    }

    // TODO less and equal
    // TODO greated and equal

    lessThan(value: number): void {
        this.isCheckingMax = true;
        this.maxNum = value;
    }

    greaterThan(value: number): Validator {
        this.isCheckingMin = true;
        this.minNum = value;
        return this;
    }

    includeString(value: string, isCaseSensitive = true): void {
        this.isCheckingIncludeString = true;
        this.isCheckingIncludeStringCaseSensitive = isCaseSensitive;
        this.includedString = value;
    }

    // compare string with from | to
    // Japanese caseSensitive

    //

    equal(value: any): void {
        this.isCheckingEqual = true;
        this.equalValue = value;
    }



    validate(): boolean {

        if (this.isCheckingNotNull) {
            if (this.value === null || Number.isNaN(this.value) || this.value === undefined) return false;
        }
        if (this.isCheckingNotEmpty) {
            if (this.value === null || Number.isNaN(this.value) || this.value === undefined) return false;
            if ((this.value + '').length <= 0) return false;
        }
        // for bellow checks, the value should not be null.
        if (this.isCheckingTypes) {
            let flag = true;
            if (this.types.includes('array') && Array.isArray(this.value)) {
                flag = false;
            }
            if (this.types.includes('number') && typeof this.value === 'number') {
                flag = false;
            }
            if (this.types.includes('boolean') && typeof this.value === 'boolean') {
                flag = false;
            }
            if (this.types.includes('string') && typeof this.value === 'string') {
                flag = false;
            }

            if (!flag) return false;
        }

        if (this.isCheckingMin) {
            if (this.value < this.minNum) return false;
        }

        if (this.isCheckingMax) {
            if (this.value > this.maxNum) return false;
        }

        return true;
    }

}