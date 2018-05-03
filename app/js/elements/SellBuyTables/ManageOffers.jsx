import React, {Component} from 'react';
import Stellarify from '../../helpers/DataServer/SetDataStandart';
import ManageOfferRow from './ManageOfferRow.jsx';
import _ from 'lodash';

export default class ManageOffers extends Component {
  constructor(props) {
    super(props);
    // this.unsub = this.props.d.session.event.sub(() => {this.forceUpdate()});
  }
  componentWillUnmount() {
    // this.unsub();
  }
  render() {
    // if (this.props.d.orderbook === null) {
    //   return <div className="island__paddedContent"><a href="#account">Log in</a> to see your open offers</div>;
    // }
    let orderbook = this.props.d.orderbook;
    let offersArray = this.props.d.offers;

      // console.log("orderbook", orderbook);
      console.log("offersArray", offersArray);

    let rectifiedBuyOffers = [];
    let rectifiedSellOffers = [];
    // _.each(fakeOffers, offer => {
    // _.each(this.props.d.session.account.offers, offer => {
    _.each(offersArray, offer => {
      if (Stellarify.isOfferRelevant(orderbook.base.asset_code, orderbook.counter.asset_type, offer)) {
        let rectifiedOffer = Stellarify.rectifyOffer(orderbook.base.asset_code, orderbook.counter.asset_type, offer);
        if (rectifiedOffer.side === 'buy') {
          rectifiedBuyOffers.push(rectifiedOffer);
        } else {
          rectifiedSellOffers.push(rectifiedOffer);
        }
      }
    });

    let sortedBuyOffers = _.orderBy(rectifiedBuyOffers, o => {
      return Number(o.price);
    }, 'desc');

    let sortedSellOffers = _.orderBy(rectifiedSellOffers, o => {
      return Number(o.price);
    }, 'asc');

    let buyItems = _.map(sortedBuyOffers, rectifiedOffer => {
      return <ManageOfferRow invert d={this.props.d} rectifiedOffer={rectifiedOffer} key={rectifiedOffer.id}></ManageOfferRow>;
    });
    let sellItems = _.map(sortedSellOffers, rectifiedOffer => {
      return <ManageOfferRow d={this.props.d} rectifiedOffer={rectifiedOffer} key={rectifiedOffer.id}></ManageOfferRow>;
    });

    if (buyItems.length === 0) {
      buyItems = <tr><td className="ManageOffers__table__row__none" colSpan="4">You have no buy offers for this orderbook.</td></tr>;
    }
    if (sellItems.length === 0) {
      sellItems = <tr><td className="ManageOffers__table__row__none" colSpan="4">You have no sell offers for this orderbook.</td></tr>;
    }

    return <div className="island--pb">
      <div className="ManageOffers">
        <div className=" island__sub">
          <div className=" island__sub__division">
            <h3 className="island__sub__division__title">Your buy offers</h3>
            <table className="ManageOffers__table">
              <tbody>
                <tr className="ManageOffers__table__header">
                  <td></td>
                  <td className="ManageOffers__table__header__item">{orderbook.counter.asset_type}</td>
                  <td className="ManageOffers__table__header__item">{orderbook.base.asset_code}</td>
                  <td className="ManageOffers__table__header__item">Price</td>
                </tr>
                {buyItems}
              </tbody>
            </table>
          </div>
          <div className="island__sub__division">
            <h3 className="island__sub__division__title">Your sell offers</h3>
            <table className="ManageOffers__table">
              <tbody>
                <tr className="ManageOffers__table__header">
                  <td className="ManageOffers__table__header__item">Price</td>
                  <td className="ManageOffers__table__header__item">{orderbook.base.asset_code}</td>
                  <td className="ManageOffers__table__header__item">{orderbook.counter.asset_type}</td>
                  <td></td>
                </tr>
                {sellItems}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  }
};
