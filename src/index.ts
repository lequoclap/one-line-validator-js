export const Greeter = (name: string) => `Hello ${name}`;


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

    // check flags
    private isCheckTypes = false;


    private isCheckNotNull = false;
    private isCheckRegex = false;
    private isCheckInRange = false;
    private isCheckMax = false;
    private isCheckMin = false;

    private isCheckIncludeString = false;
    private isCheckIncludeStringCaseSensitive = false;

    private isCheckEqual = false;


    constructor(value: any) {
        this.value = value;
    }

    isNotNull(): void {
        this.isCheckNotNull = true;
    }
    isBoolean(): void {
        this.isCheckTypes = true;
        this.types.push('boolean');
    }
    isNumber(): void {
        this.isCheckTypes = true;
        this.types.push('number');
    }
    isArray(): void {
        this.isCheckTypes = true;
        this.types.push('array');
    }
    isString(): void {
        this.isCheckTypes = true;
        this.types.push('string');
    }

    isInRange(range: any[]): void {
        this.isCheckInRange = true;
    }

    regex(regexStr: string) {
        this.isCheckRegex = true;
        this.regexStr = regexStr;
    }


    // TODO less and equal
    // TODO greated and equal

    lessThan(value: number): void {
        this.isCheckMax = true;
        this.maxNum = value;
    }

    greaterThan(value: number): void {
        this.isCheckMin = true;
        this.minNum = value;
    }

    includeString(value: string, isCaseSensitive = true): void {
        this.isCheckIncludeString = true;
        this.isCheckIncludeStringCaseSensitive = isCaseSensitive;
        this.includedString = value;
    }

    // compare string with from | to
    // Japanese caseSensitive

    //

    equal(value: any): void {
        this.isCheckEqual = true;
        this.equalValue = value;
    }



    validate(): boolean {

        if (this.isCheckNotNull) {
            if (this.value === null || Number.isNaN(this.value) || this.value === undefined) return false;
        }

        if (this.isCheckTypes) {
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

        if (this.isCheckMin) {
            if (this.value < this.minNum) return false;
        }

        if (this.isCheckMax) {
            if (this.value > this.maxNum) return false;
        }

        return true;
    }

}