import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductCategoryRow = function (_React$Component) {
  _inherits(ProductCategoryRow, _React$Component);

  function ProductCategoryRow() {
    _classCallCheck(this, ProductCategoryRow);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ProductCategoryRow.prototype.render = function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        { colSpan: "2" },
        this.props.category
      )
    );
  };

  return ProductCategoryRow;
}(React.Component);

var ProductRow = function (_React$Component2) {
  _inherits(ProductRow, _React$Component2);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  ProductRow.prototype.render = function render() {
    var name = this.props.product.stocked ? this.props.product.name : React.createElement(
      "span",
      { style: { color: 'red' } },
      this.props.product.name
    );
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        name
      ),
      React.createElement(
        "td",
        null,
        this.props.product.price
      )
    );
  };

  return ProductRow;
}(React.Component);

var ProductTable = function (_React$Component3) {
  _inherits(ProductTable, _React$Component3);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  ProductTable.prototype.render = function render() {
    var _this4 = this;

    var rows = [];
    var lastCategory = null;
    console.log(this.props.inStockOnly);
    this.props.products.forEach(function (product) {
      if (product.name.indexOf(_this4.props.filterText) === -1 || !product.stocked && _this4.props.inStockOnly) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(React.createElement(ProductCategoryRow, { category: product.category, key: product.category }));
      }
      rows.push(React.createElement(ProductRow, { product: product, key: product.name }));
      lastCategory = product.category;
    });
    return React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Name"
          ),
          React.createElement(
            "th",
            null,
            "Price"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        rows
      )
    );
  };

  return ProductTable;
}(React.Component);

var SearchBar = function (_React$Component4) {
  _inherits(SearchBar, _React$Component4);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this5.handleFilterTextInputChange = _this5.handleFilterTextInputChange.bind(_this5);
    _this5.handleInStockInputChange = _this5.handleInStockInputChange.bind(_this5);
    return _this5;
  }

  SearchBar.prototype.handleFilterTextInputChange = function handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  };

  SearchBar.prototype.handleInStockInputChange = function handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  };

  SearchBar.prototype.render = function render() {
    return React.createElement(
      "form",
      null,
      React.createElement("input", {
        type: "text",
        placeholder: "Search...",
        value: this.props.filterText,
        onChange: this.handleFilterTextInputChange
      }),
      React.createElement(
        "p",
        null,
        React.createElement("input", {
          type: "checkbox",
          checked: this.props.inStockOnly,
          onChange: this.handleInStockInputChange
        }),
        ' ',
        "Only show products in stock"
      )
    );
  };

  return SearchBar;
}(React.Component);

var FilterableProductTable = function (_React$Component5) {
  _inherits(FilterableProductTable, _React$Component5);

  function FilterableProductTable(props) {
    _classCallCheck(this, FilterableProductTable);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this6.state = {
      filterText: '',
      inStockOnly: false
    };

    _this6.handleFilterTextInput = _this6.handleFilterTextInput.bind(_this6);
    _this6.handleInStockInput = _this6.handleInStockInput.bind(_this6);
    return _this6;
  }

  FilterableProductTable.prototype.handleFilterTextInput = function handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  };

  FilterableProductTable.prototype.handleInStockInput = function handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  };

  FilterableProductTable.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(SearchBar, {
        filterText: this.state.filterText,
        inStockOnly: this.state.inStockOnly,
        onFilterTextInput: this.handleFilterTextInput,
        onInStockInput: this.handleInStockInput
      }),
      React.createElement(ProductTable, {
        products: this.props.products,
        filterText: this.state.filterText,
        inStockOnly: this.state.inStockOnly
      })
    );
  };

  return FilterableProductTable;
}(React.Component);

var PRODUCTS = [{ category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' }, { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' }, { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' }, { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' }, { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' }, { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];

ReactDOM.render(React.createElement(FilterableProductTable, { products: PRODUCTS }), document.getElementById('container'));
