
import "../../src/utils/stringExtensions"
import { format, decryptText } from "../../src/services/decrypt-text"

describe("Decrypt text - format", () => {
    test("format 1", () => {
        const actual = format("1");
        expect(actual).toEqual(["1"]);
    });
    test("format 12", () => {
        expect(format("12")).toEqual(["12"]);
    });
    test("format 8 chars", () => {
        expect(format("12345678")).toEqual(["12345678"]);
    });
    test("format 512 chars", () => {
        const input = "1".repeat(512)
        expect(format(input)).toEqual([
            '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
        ]);
    });
    test("format 1025 chars", () => {
        const input = "1".repeat(1025)
        expect(format(input)).toEqual([
            '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            '1'
        ]);
    });

    test("TrezorConnect.cipherKeyValue called once", () => {
        const cipherKeyValueMock = jest.fn(() => ({
            success: false,
            payload: null
        }))
        
        jest.mock('trezor-connect', () => {
            return {
                'default': {
                    cipherKeyValue: cipherKeyValueMock
                }
            }
        });
        // async/await throws runtime timeout exception
        decryptText("123456789", "test").then(() => {
            expect(cipherKeyValueMock.mock.calls.length).toEqual(1);
        });
    });
});