import * as React from "react";
import { mount, shallow } from "enzyme";
import { getBalance, getPositionId, searchMarkets } from "../utils";
import { mockMarket } from "./mockData";
import { Market } from "../utils/constants";

describe("getPositionId", () => {
    it("should get the position id for a certain outcome", async function () {
        const market = mockMarket;
        const outcome = "Ravens";
        const setPositionId = () => {};
        const setErrorMessage = () => {};

        const positionId = await getPositionId({
            market,
            outcome,
            setPositionId,
            setErrorMessage,
        });
        expect(parseInt(positionId)).toEqual(
            0xb15e6ec660d989fa3df2f76cfd3167c3fe7434313d616d65c79b4a5c1924d5fa,
        );
    });
});

describe("getBalance", () => {
    it("should return 0 of customer has no balance", async function () {
        const setBalance = () => {};
        const setErrorMessage = () => {};
        const address = "0x822276EB1df687f4faB5D29adA0d30590C510311";
        const positionId =
            "0xf270803dfab4f5aa7f9e9a4996ce3425f219102f35ac062275fe19842bfd46fe";

        const balance = await getBalance({
            setBalance,
            setErrorMessage,
            address,
            positionId,
        });
        expect(parseInt(balance)).toEqual(0);
    });

    it("should return customer balance", async function () {
        const setBalance = jest.fn();
        const setErrorMessage = jest.fn();
        const address = "0x822276EB1df687f4faB5D29adA0d30590C510311";
        const positionId =
            "0xdbdd4f634c78197fbdda3294c1e556e2b1ff4823258de56cbaf063a608232b88";

        const balance = await getBalance({
            setBalance,
            setErrorMessage,
            address,
            positionId,
        });

        expect(parseInt(balance, 10) > 0).toBe(true);
    });
});

describe("searchMarkets", () => {
    it("should return true if query exists in market question or description", function () {
        const market = mockMarket;
        const query = "Ravens";

        expect(
            searchMarkets<Market>(market, ["question", "description"], query),
        ).toBe(true);
    });

    it("should return false if query does not exists in market question or description", function () {
        const market = mockMarket;
        const query = "Quetzalcoatl";

        expect(
            searchMarkets<Market>(market, ["question", "description"], query),
        ).toBe(false);
    });
});
