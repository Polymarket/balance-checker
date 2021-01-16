 import * as React from 'react';
 import { mount, shallow} from 'enzyme';
import{ Market } from "../utils/constants";
const fetch = require('node-fetch');
import { Form, Button, Alert, Modal, Card } from "react-bootstrap";
import { getBalance } from "../utils";
import nock from 'nock';
import SearchInput from "../components/searchInput";
import BalanceChecker from "../pages/index";
import ActiveMarkets from '../components/activeMarkets';
import BalanceModal from '../components/modal';

describe('<SearchInput/>', () => {
  it('should render correctly', async function () {
    const onChangeSearchQuery = jest.fn()
    const props = {
      onChangeSearchQuery
  }
    const wrap = shallow(<SearchInput {...props}/>);
    expect(wrap.find("label").text()).toBe("Search Markets");
  });

});
describe('getBalance', () => {


  it('should get customer balance', async function () {

    const setBalance = jest.fn();
    const setErrorMessage = jest.fn();
    const address = "0x822276EB1df687f4faB5D29adA0d30590C510311";
    const positionId = "0xf270803dfab4f5aa7f9e9a4996ce3425f219102f35ac062275fe19842bfd46fe";

    const props = {
      address,
      positionId,
      setBalance,
      setErrorMessage,
     
  }
    
    let balance = getBalance(props)
    expect(balance).toBe("0");
  });

});

let data:Market[];
beforeAll(async (done) => {
  const res = await fetch(
    `https://strapi-matic.poly.market/markets?active=true&_sort=volume:desc`,
);
  data = await res.json();
 done();
});


  describe('<BalanceChecker/>', () => {
    it('should render correctly', async function () {
      const wrap = mount(<BalanceChecker data={data}/>);
      expect(wrap.find('h1').text()).toBe('Customer Balances');

     
    });
    
    
    
    it('should open the balance modal', async function () {
      const wrap = mount(<BalanceChecker data={data}/>);
      wrap.findWhere(node => node.key() === 'Elon Musk').simulate("click");
      expect(wrap.find(Modal.Title).text()).toBe('Customer Balance');
    
    
     
    })
});

describe('<ActiveMarkets/>', () => {
  it('should render correctly', async function () {
    const handleClick = jest.fn();
    const query = "";
    const props = {
      data,
      query,
      handleClick
  }
    const wrap = shallow(<ActiveMarkets {...props}/>);
    expect(wrap.exists(Card)).toEqual(true);;

   
  });

})
    


