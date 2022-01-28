import { hoc } from "@";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Heading, Pane } from "evergreen-ui";
import groupBy from "lodash.groupby";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentReservationProduct } from "@store/slices/reservation";
import { getShowCaseProductList, rateProduct } from "@api";

const filterNames = ["model", "location", "isAvailable", "color", "rating"];

const container = hoc((props) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState({});

  const fetchProductListByFilter = useCallback(async () => {
    setLoading(true);
    const response = await getShowCaseProductList();
    setLoading(false);
    if (response.success) setProducts(response.data);
  }, []);

  const fetchRateProduct = useCallback(async (product, rating) => {
    await rateProduct(
      {
        productId: product.id,
        rating,
      },
      product.id
    );
  }, []);

  const onRateAction = useCallback(
    (product, e) => {
      const rate = { ...ratings, [product.id]: +e.target.value };
      setRatings(rate);
      fetchRateProduct(product, e.target.value);
    },
    [fetchRateProduct, ratings]
  );

  const onReservationAction = useCallback(
    (product) => {
      dispatch(setCurrentReservationProduct(product));
    },
    [dispatch]
  );

  const groupByProperties = useCallback(() => {
    if (!products.length) return;

    const names = filterNames.reduce((acc, curr) => {
      const groups = groupBy(products, curr);
      acc[curr] = Object.keys(groups);
      return acc;
    }, {});
    setFilters(names);
  }, [products]);

  const mappedFilters = useMemo(() => {
    return Object.keys(filters).reduce((acc, curr) => {
      const section = {
        label: curr.toLocaleUpperCase(),
        value: curr,
        disabled: true,
        category: "section",
      };
      const items = filters[curr].map((item) => ({
        label: item,
        value: item,
        category: curr,
      }));
      acc.push(section);
      return [...acc, ...items];
    }, []);
  }, [filters]);

  const onFilterSelected = useCallback(
    (item) => {
      const selected = [...selectedFilters, item.value];
      const selectedItems = selected;
      setSelectedFilters(selectedItems);
    },
    [selectedFilters, setSelectedFilters]
  );

  const onFilterDeselected = useCallback(
    (item) => {
      const deselectedItemIndex = selectedFilters.indexOf(item.value);
      const selectedItems = selectedFilters.filter(
        (_item, i) => i !== deselectedItemIndex
      );
      setSelectedFilters(selectedItems);
    },
    [selectedFilters]
  );

  const renderCustomItem = useCallback((item) => {
    return item.category === "section" ? (
      <Heading size={400}>{item.label}</Heading>
    ) : item.category === "color" ? (
      <Pane background={item.value} display="flex" flex={1} padding="0.5rem" />
    ) : item.category === "rating" ? (
      <Rating value={+item.value} disabled />
    ) : item.category === "isAvailable" ? (
      item.value === "true" ? (
        "Available"
      ) : (
        "Not Avaialable"
      )
    ) : (
      item.value
    );
  }, []);

  const filterProducts = useCallback(
    (item) =>
      filterNames
        .map((name) =>
          selectedFilters.some((selected) =>
            new RegExp("^" + selected + "$").test(item[name])
          )
        )
        .some((i) => i === true),
    [selectedFilters]
  );

  const filteredProducts = useMemo(
    () => (selectedFilters.length ? products.filter(filterProducts) : products),
    [products, filterProducts, selectedFilters]
  );

  const getRating = useCallback((proudctId) => ratings[proudctId], [ratings]);

  useEffect(() => {
    groupByProperties();
  }, [products, groupByProperties]);

  useEffect(() => {
    fetchProductListByFilter();
  }, [fetchProductListByFilter]);

  return {
    ...props,
    products: filteredProducts,
    mappedFilters,
    selectedFilters,
    ratings,
    loading,
    onFilterSelected,
    renderCustomItem,
    onFilterDeselected,
    filterProducts,
    onReservationAction,
    onRateAction,
    getRating,
  };
});

export default container;
