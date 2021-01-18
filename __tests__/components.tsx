import * as React from "react";
import { mount, shallow } from "enzyme";
import { Modal, Card } from "react-bootstrap";
import { Market } from "../utils/constants";
import SearchInput from "../components/searchInput";
import BalanceChecker from "../pages/index";
import ActiveMarkets from "../components/activeMarkets";
import BalanceModal from "../components/modal";
const fetch = require("node-fetch");

describe("<SearchInput/>", () => {
    it("should render correctly", async function () {
        const onChangeSearchQuery = jest.fn();
        const props = {
            onChangeSearchQuery,
        };
        const wrap = shallow(<SearchInput {...props} />);
        expect(wrap.find("label").text()).toBe("Search Markets");
        expect(SearchInput).toMatchSnapshot();
    });

    it("should render correctly", async function () {
        const onChangeSearchQuery = jest.fn();
        const props = {
            onChangeSearchQuery,
        };
        const wrap = mount(<SearchInput {...props} />);
        wrap.find("input").simulate("change", { target: { value: "foo" } });
        expect(onChangeSearchQuery).toHaveBeenCalledWith("foo");
    });
});

describe("<BalanceModal/>", () => {
    it("should render correctly", async function () {
        const handleClose = jest.fn();
        const setAddress = jest.fn();
        const setErrorMessage = jest.fn();
        const question = "";
        const outcomeText = "";
        const errorMessage = "";
        const address = "";
        const positionId =
            "0xdbdd4f634c78197fbdda3294c1e556e2b1ff4823258de56cbaf063a608232b88";
        const show = true;

        const wrap = mount(
            <BalanceModal
                handleClose={handleClose}
                setAddress={setAddress}
                setErrorMessage={setErrorMessage}
                question={question}
                outcomeText={outcomeText}
                errorMessage={errorMessage}
                address={address}
                positionId={positionId}
                show={show}
            />,
        );

        expect(wrap.find(Modal.Title).text()).toBe("Customer Balance");
        expect(BalanceModal).toMatchSnapshot();
    });

    it("should render passed props", async function () {
        const handleClose = jest.fn();
        const setAddress = jest.fn();
        const setErrorMessage = jest.fn();
        const question = "foo";
        const outcomeText = "bar";
        const errorMessage = "error";
        const address = "";
        const positionId =
            "0xdbdd4f634c78197fbdda3294c1e556e2b1ff4823258de56cbaf063a608232b88";
        const show = true;

        const wrap = mount(
            <BalanceModal
                handleClose={handleClose}
                setAddress={setAddress}
                setErrorMessage={setErrorMessage}
                question={question}
                outcomeText={outcomeText}
                errorMessage={errorMessage}
                address={address}
                positionId={positionId}
                show={show}
            />,
        );

        expect(wrap.find(Modal.Body).text()).toContain("foo");
        expect(wrap.find(Modal.Body).text()).toContain("bar");
        expect(wrap.find(Modal.Body).text()).toContain("error");
    });
});

let data: Market[];
beforeAll(async (done) => {
    const res = await fetch(
        `https://strapi-matic.poly.market/markets?active=true&_sort=volume:desc`,
    );
    data = await res.json();
    done();
});

describe("<BalanceChecker/>", () => {
    it("should render correctly", async function () {
        const wrap = mount(<BalanceChecker data={data} />);
        expect(wrap.find("h1").text()).toBe("Customer Balances");
    });

    it("should open the balance modal", async function () {
        const wrap = mount(<BalanceChecker data={data} />);
        wrap.findWhere((node) => node.key() === "Elon Musk").simulate("click");
        expect(wrap.find(Modal.Title).text()).toBe("Customer Balance");
    });
});

describe("<ActiveMarkets/>", () => {
    it("should render correctly", function () {
        const handleClick = jest.fn();
        const query = "";
        const props = {
            data,
            query,
            handleClick,
        };
        const wrap = shallow(<ActiveMarkets {...props} />);
        expect(wrap.exists(Card)).toEqual(true);
    });
    it("should render searched markets", function () {
        const handleClick = jest.fn();
        const query = "Uniswap";
        const props = {
            data,
            query,
            handleClick,
        };
        const wrap = mount(<ActiveMarkets {...props} />);
        expect(wrap.find(Card.Text).first().text()).toBe(
            "Will Uniswap v3 launch before 2021?",
        );
    });
});
